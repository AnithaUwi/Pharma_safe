// seed.js
const db = require('./database.js');

const medicines = [
    { qr: 'REAL-111-ABC', name: 'Quartem Antimalarial', mfr: 'Kigali Pharma', batch: 'K45B1', exp: '2026-12-31' },
    { qr: 'REAL-222-DEF', name: 'Amoxicillin 500mg', mfr: 'Kigali Pharma', batch: 'A98N2', exp: '2025-10-31' },
    { qr: 'REAL-333-GHI', name: 'Paracetamol Syrup', mfr: 'Global Meds', batch: 'P12C3', exp: '2027-01-31' }
];

const insert = db.prepare("INSERT INTO Medicines (qr_code_id, product_name, manufacturer, batch_number, expiry_date) VALUES (?, ?, ?, ?, ?)");

medicines.forEach(med => {
    insert.run(med.qr, med.name, med.mfr, med.batch, med.exp);
});

insert.finalize((err) => {
    if (err) console.error("Error seeding:", err);
    else console.log("Database seeded with 3 products!");
});