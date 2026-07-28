const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const s3 = new S3Client({ region: process.env.AWS_REGION });
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const BUCKET = process.env.UPLOAD_BUCKET || "";
const PURCHASES_TABLE = process.env.PURCHASES_TABLE || "Purchases";

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    // 1. Extract Authenticated User Identity from Cognito Claims
    const userId = event.requestContext?.authorizer?.claims?.sub;
    const body = JSON.parse(event.body || "{}");
    const { purchaseId, s3Key } = body;

    if (!userId) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: "Unauthorized: Missing Cognito Token" }),
      };
    }

    if (!purchaseId || !s3Key) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Missing purchaseId or s3Key" }),
      };
    }

    // 2. Security Check: Verify purchase ownership in DynamoDB
    const record = await ddb.send(
      new GetCommand({
        TableName: PURCHASES_TABLE,
        Key: { userId, purchaseId },
      })
    );

    if (!record.Item) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ message: "Forbidden: Purchase record not found" }),
      };
    }

    // 3. Generate short-lived presigned URL (valid for 5 minutes)
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: s3Key });
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ downloadUrl: url }),
    };
  } catch (err) {
    console.error("downloadFile error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal Server Error", error: err.message }),
    };
  }
};
