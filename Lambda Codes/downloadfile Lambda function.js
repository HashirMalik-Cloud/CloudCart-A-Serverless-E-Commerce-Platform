// amplify/backend/function/downloadFile/src/index.js
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET = process.env.UPLOAD_BUCKET || "";

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    let s3Key;

    if (event.httpMethod === "GET") {
      // GET request → read from query string
      s3Key = event.queryStringParameters?.s3Key;
    } else if (event.httpMethod === "POST") {
      // POST request → read from JSON body
      const body = JSON.parse(event.body || "{}");
      s3Key = body.s3Key;
    }

    if (!BUCKET) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: "Server not configured: UPLOAD_BUCKET missing" }),
      };
    }

    if (!s3Key) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Missing s3Key" }),
      };
    }

    // Generate presigned URL
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

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
      body: JSON.stringify({
        message: "Server error",
        error: err.message,
      }),
    };
  }
};
