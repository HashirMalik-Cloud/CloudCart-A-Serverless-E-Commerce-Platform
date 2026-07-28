import { buffer } from 'micro';
import Stripe from 'stripe';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION }));

export const config = {
  api: { bodyParser: false }, // Disable Next.js body parser to verify raw webhook signature
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    const userId = session.metadata?.userId || 'guest-user';
    const purchaseId = `ord_${Date.now()}`;

    // Record order in DynamoDB
    const item = {
      userId: userId,
      purchaseId: purchaseId,
      itemName: session.metadata?.itemName || 'Digital Product',
      price: session.amount_total / 100,
      purchaseDate: new Date().toISOString(),
      status: 'delivered',
      s3Key: session.metadata?.s3Key || 'art-template.jpg',
    };

    try {
      await ddb.send(new PutCommand({
        TableName: process.env.PURCHASES_TABLE || 'Purchases',
        Item: item,
      }));
      console.log(`Order ${purchaseId} successfully saved to DynamoDB.`);
    } catch (dbErr) {
      console.error('DynamoDB Error:', dbErr);
      return res.status(500).json({ error: 'Database write failed' });
    }
  }

  res.status(200).json({ received: true });
}
