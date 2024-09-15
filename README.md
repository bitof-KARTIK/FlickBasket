# <span style="color: #FF6347;">FlickBasket 🛍️</span>

Welcome to **FlickBasket**, your online e-commerce platform for browsing products, managing carts, and making purchases. This application supports Google OAuth for authentication and Razorpay for secure payment processing.

## <span style="color: #FFA500;">🌟 Table of Contents</span>

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Environment Variables](#environment-variables)
- [License](#license)

## <span style="color: #FFA500;">🎬 Introduction</span>

FlickBasket is a comprehensive online shopping platform built with Node.js, Express, and MongoDB. It offers users a seamless experience for browsing products, managing carts, and completing purchases securely through Razorpay integration.

## <span style="color: #32CD32;">🚀 Features</span>

- User authentication with Google OAuth
- Product browsing and cart management
- Secure checkout process with Razorpay integration
- Admin panel for product and category management

## <span style="color: #1E90FF;">🛠️ Technologies Used</span>

- Front-end:
  - EJS templating engine
- Back-end:
  - Node.js runtime environment
  - Express web framework
  - MongoDB NoSQL database
  - Mongoose ORM for MongoDB
- Authentication:
  - Passport.js middleware
- Payment Gateway:
  - Razorpay API integration


## <span style="color: #FFD700;">🔧 Installation</span>

1. Clone the repository:
   ```bash
   git clone https://github.com/bitof-KARTIK/FlickBasket.git
   ```

2. Navigate to the project directory:
   ```bash
   cd FlickBasket
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   touch .env
   nano .env
   ```
   Add the required values (see the [Environment Variables](#environment-variables) section).

5. Start the application:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000.

## <span style="color: #00CED1;">🚀 Usage</span>

1. Start the development server:
   ```bash
   npx nodeon app.js
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## <span style="color: #8A2BE2;">📸 Screenshots</span>

<b>User Panel</b> 

![Screenshot 2024-09-15 182040](https://github.com/user-attachments/assets/3187a3f0-a232-484b-9f41-6f583793091d)

![Screenshot 2024-09-15 182111](https://github.com/user-attachments/assets/11d1bebf-9f95-4bc1-b61d-aeb0bef1b8d5)

![Screenshot 2024-09-15 182141](https://github.com/user-attachments/assets/eb8508f8-8951-409f-b26d-575e1261e22a)

![Screenshot 2024-09-15 182157](https://github.com/user-attachments/assets/a7ed9f48-7c91-42eb-b570-052f259f4cc0)

![Screenshot 2024-09-15 182301](https://github.com/user-attachments/assets/c7028c1a-ddf8-4f65-9498-a49b01cb9be8)

<b>Admin Panel</b> 

![Screenshot 2024-09-15 182856](https://github.com/user-attachments/assets/b7bbecf9-22c8-40f7-a1e4-00976920260a)

![Screenshot 2024-09-15 182930](https://github.com/user-attachments/assets/361c163e-f452-4e19-9de7-31f41cf8cb7e)

![Screenshot 2024-09-15 183452](https://github.com/user-attachments/assets/7484bef4-c62e-4e2c-b086-f877c1000a3b)

## <span style="color: #DC143C;">🌿 Environment Variables</span>

Create a `.env` file in the root directory of your project and add the following variables:

```
# MongoDB Connection
MONGOURL=your mongo url

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session and JWT Configuration
SESSION_SECRET=your_session_secret
JWT_KEY=your_jwt_secret_key

# Application Environment
NODE_ENV=DEVELOPMENT

# Razorpay API Keys
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## <span style="color: #00CED1;">📜 License</span>

This project is licensed under the MIT License.

---

For any issues or questions, please open an issue on the GitHub repository.

