// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
app.use(cors());
const PORT = 3000;

// This is our main verification endpoint!
app.get('/verify/:qrCodeId', (req, res) => {
    const { qrCodeId } = req.params;
    const sql = "SELECT * FROM Medicines WHERE qr_code_id = ?";

    db.get(sql, [qrCodeId], (err, row) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Database error' });
        }
        
        // Case 1: Code does not exist (INVALID)
        if (!row) {
            return res.status(404).json({ status: 'invalid', message: 'Product not found. This is a high-risk counterfeit.' });
        }

        // Case 2: Code exists but has already been scanned (WARNING)
        if (row.is_scanned === 1) {
            return res.status(409).json({ status: 'warning', message: `This product was already verified. It may be a counterfeit.` });
        }

        // Case 3: Code is valid and unused (SUCCESS)
        const updateSql = "UPDATE Medicines SET is_scanned = 1 WHERE qr_code_id = ?";
        db.run(updateSql, [qrCodeId], function(updateErr) {
            if (updateErr) {
                return res.status(500).json({ status: 'error', message: 'Database error during update' });
            }
            res.json({ status: 'success', data: row });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Pharma-Safe server running on http://localhost:${PORT}`);
});