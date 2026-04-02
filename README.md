 🚨 Fraud Detection Banking System

📌 Project Overview

This project is a Full Stack Fraud Detection System designed to identify suspicious banking transactions in real time.

It combines:

- 🗄️ Database (MySQL)
- ⚙️ Backend (Node.js + Express)
- 🎨 Frontend Dashboard
- 🤖 Machine Learning (Fraud Prediction)

---

🎯 Features

- ✅ Real-time transaction monitoring
- 🚨 Automatic fraud detection using MySQL triggers
- 📊 Fraud alerts dashboard
- 🔍 Detection based on:
  - High transaction amount
  - Multiple transactions in short time
  - Unusual location activity
- 🤖 ML-based fraud prediction (advanced feature)

---

🧱 Tech Stack

🟢 Database

- MySQL
- Tables:
  - Customers
  - Accounts
  - Transactions
  - Fraud_Alerts
- Triggers for automatic fraud detection

🔵 Backend

- Node.js
- Express.js
- MySQL2
- REST APIs

🟡 Frontend

- HTML
- CSS
- JavaScript

🔴 Machine Learning

- Python
- Pandas, Scikit-learn

---

🗂️ Project Structure

fraud-detection-banking-system/
│
├── database/
│   └── schema.sql
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md

---

⚡ How It Works

1. User performs a transaction
2. Transaction is stored in database
3. MySQL triggers automatically check for fraud conditions
4. If suspicious → Fraud alert is generated
5. Backend API fetches alerts
6. Frontend displays alerts in dashboard

---

🧪 Sample Fraud Conditions

- 💰 Transaction amount > 50,000
- ⏱️ Multiple transactions within short time
- 🌍 Transaction from unusual location

---

▶️ Setup Instructions

1. Clone Repository

git clone https://github.com/your-username/fraud-detection-banking-system.git
cd fraud-detection-banking-system

---

2. Setup Database

- Open MySQL
- Run "schema.sql"

---

3. Setup Backend

cd backend
npm install
node server.js

---

4. Run Frontend

- Open "index.html" in browser

---

🔥 API Endpoints

- "POST /transactions" → Add transaction
- "GET /transactions" → Get all transactions
- "GET /alerts" → Get fraud alerts

---

💡 Future Enhancements

- 🔐 User authentication system
- 📊 Advanced dashboard with charts
- 🤖 AI-based fraud prediction model
- 📱 Mobile-friendly UI

---

🎯 Resume Description

«Developed a full-stack fraud detection system using MySQL, Node.js, and JavaScript, implementing real-time fraud detection through database triggers and integrating machine learning for predictive analysis.»

---

👩‍💻 Author

- Your Name

---

⭐ If you like this project, give it a star!
