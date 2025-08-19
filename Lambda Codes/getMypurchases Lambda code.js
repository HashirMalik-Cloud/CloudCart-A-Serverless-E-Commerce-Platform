// amplify/backend/function/getMyPurchases/src/index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE = process.env.PURCHASES_TABLE || "Purchases";

const respond = (statusCode, data) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

exports.handler = async (event) => {
  try {
    // Try Cognito first (when you later protect the route):
    const sub = event.requestContext?.authorizer?.claims?.sub;

    // Dev fallback: allow ?userId=... query param
    const qs = event.queryStringParameters || {};
    const userId = sub || qs.userId;

    if (!userId) {
      return respond(400, { message: "Missing userId. Provide via Cognito auth or ?userId=..." });
    }

    // Pagination (optional): ?limit=50&nextToken=base64Key
    const limit = qs.limit ? Number(qs.limit) : 50;
    const startKey = qs.nextToken
      ? JSON.parse(Buffer.from(qs.nextToken, "base64").toString("utf8"))
      : undefined;

    const params = {
      TableName: TABLE,
      KeyConditionExpression: "#uid = :u",
      ExpressionAttributeNames: { "#uid": "userId" },
      ExpressionAttributeValues: { ":u": userId },
      ScanIndexForward: false, // newest-first by purchaseDate (sort key)
      Limit: limit,
      ExclusiveStartKey: startKey,
    };

    const { Items, LastEvaluatedKey } = await ddb.send(new QueryCommand(params));

    const items = (Items || []).map((it) => ({
      purchaseId: it.purchaseId,
      productId: it.productId,
      itemName: it.itemName,
      price: it.price,
      purchaseDate: it.purchaseDate,
      status: it.status || "Delivered",
      imageUrl: it.imageUrl,
      downloadKey: it.downloadKey, // later we’ll sign this to a URL
    }));

    return respond(200, {
      items,
      nextToken: LastEvaluatedKey
        ? Buffer.from(JSON.stringify(LastEvaluatedKey)).toString("base64")
        : null,
    });
  } catch (err) {
    console.error("getMyPurchases error:", err);
    return respond(500, { message: "Server error" });
  }
};
