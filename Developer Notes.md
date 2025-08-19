👨‍💻 Developer Notes

This project was built step-by-step, starting from a simple frontend and gradually connecting AWS services.

Each AWS service plays a role:

Amplify orchestrates everything.

Cognito secures user identity.

DynamoDB stores business data.

S3 handles files and media.

Lambda + API Gateway execute logic and integrate external APIs like Stripe.

The application is modular, meaning new features (discount codes, notifications, reviews, etc.) can easily be added.

Since the app is fully serverless, it scales automatically with demand, reducing costs and infrastructure headaches.

📦 What to Upload on GitHub

✅ Upload the following:

pages/ (frontend code)

Lambda Codes/ folder (backend configuration files)

package.json and package-lock.json

.gitignore

README.md 

❌ Do NOT upload:

node_modules/

AWS credential/config files from your local machine

Build outputs (.next/, dist/, etc.)

🏆 Why CloudCart?

CloudCart proves how modern cloud + serverless architectures can power real-world apps. It’s cost-effective, scalable, and secure — perfect for startups, learning projects, or even as a base for your own e-commerce solution.
