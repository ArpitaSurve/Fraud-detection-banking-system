const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gaytri@1216",
    database: "fraud_detection_system"
});

db.connect(err => {
    if (err) {
        console.log("Database error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Backend working 🚀");
});


// ✅ ADD TRANSACTION API
app.post("/add-transaction", (req, res) => {
    const { account_id, amount, type, location } = req.body;

    const query = `
        INSERT INTO Transactions (account_id, amount, transaction_type, location)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [account_id, amount, type, location], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting transaction");
        } else {
            res.send("Transaction added successfully ✅");
        }
    });
});


// ✅ GET ALL TRANSACTIONS
app.get("/transactions", (req, res) => {
    const query = "SELECT * FROM Transactions ORDER BY transaction_id DESC";

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching transactions");
        } else {
            res.json(result);
        }
    });
});


// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
// APP GET API TO FETCH ALERTS
app.get("/alerts", (req, res) => {
    const query = `
        SELECT 
            transaction_id AS alert_id,
            amount,
            location,
            CASE
                WHEN amount > 50000 THEN 'HIGH'
                WHEN amount > 20000 THEN 'MEDIUM'
                ELSE 'LOW'
            END AS risk_level,
            CASE
                WHEN amount > 50000 THEN 'Large transaction'
                WHEN amount > 20000 THEN 'Moderate transaction'
                ELSE 'Normal'
            END AS reason
        FROM Transactions
        ORDER BY transaction_id DESC
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching alerts");
        } else {
            res.json(result);
        }
    });
});