const express = require('express');
const router = express.Router();

// Sign In API: Registers a new user in the database
router.post('/signin', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const dateJoined = new Date().toISOString().split('T')[0];
    const query = 'INSERT INTO user (name, date_joined, balance) VALUES (?, ?, 0)';

    connection.query(query, [name, dateJoined], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        const userId = results.insertId;
        res.json({
            name: name,
            user_id: userId,
            date_joined: dateJoined
        });
    });
});

// Get Balance API: Retrieves the current balance for a user
router.get('/balance', (req, res) => {
    const { userId, name } = req.body;
    if (!userId || !name) {
        return res.status(400).json({ error: 'User ID and name are required' });
    }

    const query = 'SELECT balance FROM user WHERE user_id = ? AND name = ?';

    connection.query(query, [userId, name], (err, results) => {
        if (err) {
            console.error('Error fetching balance:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ balance: results[0].balance });
    });
});

// Add Money API: Adds money to the user's balance
router.put('/deposit', (req, res) => {
    const { userId, name, amount } = req.body;
    if (!userId || !name || amount === undefined || amount < 0) {
        return res.status(400).json({ error: 'User ID, name, and a valid amount are required' });
    }

    const query = 'UPDATE user SET balance = balance + ? WHERE user_id = ? AND name = ?';

    connection.query(query, [amount, userId, name], (err, results) => {
        if (err) {
            console.error('Error adding money:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Money added successfully' });
    });
});

// Withdraw Money API: Subtracts money from the user's balance
router.put('/withdraw', (req, res) => {
    const { userId, name, amount } = req.body;
    if (!userId || !name || amount === undefined || amount < 0) {
        return res.status(400).json({ error: 'User ID, name, and a valid amount are required' });
    }

    const query = 'UPDATE user SET balance = balance - ? WHERE user_id = ? AND name = ?';
    connection.query(query, [amount, userId, name], (err, results) => {
        if (err) {
            console.error('Error withdrawing money:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Money withdrawn successfully' });
    });
});

module.exports = router;