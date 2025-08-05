// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pharma-safe.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the Pharma-Safe database.');
});

const setupScript = `
CREATE TABLE IF NOT EXISTS Medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    qr_code_id TEXT NOT NULL UNIQUE,
    product_name TEXT NOT NULL,
    manufacturer TEXT,
    batch_number TEXT,
    expiry_date TEXT,
    is_scanned INTEGER DEFAULT 0
);
`;

db.exec(setupScript, (err) => {
    if (err) {
        console.error("Error setting up database:", err);
    } else {
        console.log("Table is ready.");
    }
});

module.exports = db;