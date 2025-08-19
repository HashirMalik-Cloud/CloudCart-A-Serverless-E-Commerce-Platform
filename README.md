CloudCart – A Serverless E-Commerce Platform

Welcome to CloudCart, a modern serverless e-commerce application built on AWS Amplify and related cloud services.
This project demonstrates how a fully functional online store can be designed, deployed, and scaled without managing traditional servers.

🌟 Features

User-friendly frontend built with Next.js (React framework)
Secure authentication and user management powered by Amazon Cognito
Product listings and purchases stored in DynamoDB
Image/file uploads to Amazon S3 with presigned URLs
Secure payments integration with Stripe (via API Gateway + Lambda)
Scalable hosting and CI/CD through Amplify Hosting
🛠️ Architecture & Services Used

Here’s a breakdown of what powers CloudCart:

Amplify CLI & Hosting:

Used to bootstrap and manage all cloud resources.
Hosts the frontend app with automatic builds and deployments.
Amazon Cognito (Authentication):

Handles signup, login, and secure session management for users.
Provides authentication tokens to access protected resources.
Amazon DynamoDB (Database):

Stores product information, user orders, and purchase history.
Serverless, highly scalable, and fast NoSQL database.
Amazon S3 (Storage):

Used for storing product images and user-uploaded content.
Access controlled with presigned URLs, ensuring security.
AWS Lambda (Serverless Functions):

Powers backend logic such as payment handling, order verification, and database updates.
Example: Verifies Stripe webhook signatures, updates DynamoDB, and generates S3 URLs.
Amazon API Gateway (API Layer):

Connects frontend with backend Lambda functions.
Provides REST endpoints for payments, file uploads, and order management.
Stripe (Payments):

Integrated securely with Lambda for handling transactions.
Ensures sensitive payment details never touch our servers.
