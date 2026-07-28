
![Architecture Diagram](Architecture%20diagram.png)
[![Wactch the video walkthrough](https://img.youtube.com/vi/xri8zOSyx2c/0.jpg)](https://youtu.be/xri8zOSyx2c)

Wactch the video walkthrough by clicking on the 2nd thumbnail.

<div align="center">

# 🛒 CloudCart
### *A Fast, Secure, & Scalable Digital E-Commerce Engine*

[![AWS Serverless](https://img.shields.io/badge/AWS-Serverless-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Stripe API](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![DynamoDB](https://img.shields.io/badge/Amazon-DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/dynamodb/)

<p align="center">
  <b>CloudCart</b> is a full-stack digital storefront built to make online shopping smooth, secure, and instant. <br />
  It handles user accounts, product browsing, real-time checkout, and automatic delivery of downloadable digital assets without relying on traditional servers.
</p>

---

</div>

## 💡 What Makes CloudCart Special?

Most traditional websites run on servers that require continuous maintenance, patching, and fixed monthly hosting costs—even when no customers are shopping. 

**CloudCart uses a modern "Serverless" architecture.** 

This means the app only runs and costs money when customers actively use it. It scales instantly from zero to thousands of simultaneous shoppers, keeping fast response times during peak demand without manual intervention.

---

## ✨ How It Works (The Shopper Experience)

* **Browse & Select**: Customers explore curated digital items on a clean, responsive web interface.
* **Secure Sign-In**: Powered by Amazon Cognito, user login details are encrypted and session tokens are strictly managed.
* **One-Click Checkout**: Stripe safely processes credit cards so sensitive payment information never touches our infrastructure.
* **Instant File Access**: Upon payment, the system verifies order history and delivers a private, temporary download link directly to the user's dashboard.

---

## 🧩 Core Component Roles

| Service | Real-World Role |
| :--- | :--- |
| **AWS Amplify & Next.js** | Delivers the fast, responsive website user interface. |
| **Amazon Cognito** | Acts as the security gatekeeper, managing user identities safely. |
| **Amazon API Gateway & AWS Lambda** | Handles background operations (order checks, download keys) on demand. |
| **Amazon DynamoDB** | Stores product details and customer transaction histories instantly. |
| **Amazon S3** | Stores private digital files securely, unlocking them only after purchase. |
| **Stripe** | Handles financial calculations and payment transactions. |

---

## 🔒 Built with Security First

> [!IMPORTANT]
> Digital downloads are stored in **private AWS S3 buckets**. Downloads are delivered through **short-lived Presigned URLs** generated on the fly after verifying the user's order in DynamoDB, ensuring unauthenticated users cannot bypass payment screens to access digital files.

* **Webhook Signature Verification**: Orders are confirmed via encrypted backend signals from Stripe, mitigating payment manipulation.
* **Zero Secret Exposure**: All API credentials and cloud resources are managed securely via environment variables (`.env`).
* **Principle of Least Privilege**: Each serverless function operates with explicit, minimal permissions to read or write only necessary resource paths.

---

<div align="center">

**CloudCart represents a production-ready, resilient, and fully automated e-commerce deployment.**

</div>
