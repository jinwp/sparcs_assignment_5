const express = require('express');
const router = express.Router();

// Function to perform the arithmetic operation
function calculateResult(number1, number2, operation) {
    switch (operation) {
        case 'add':
            return number1 + number2;
        case 'sub':
            return number1 - number2;
        case 'mul':
            return number1 * number2;
        case 'div':
            if (number2 === 0) {
                throw new Error('Invalid!');
            }
            return number1 / number2;
        default:
            throw new Error('Invalid!');
    }
}

// Route for performing each arithmetic operation
router.post('/:operation', (req, res) => {
    const { number1, number2 } = req.body;
    const operation = req.params.operation;

    // Check if either number is negative
    if (number1 < 0 || number2 < 0) {
        return res.status(400).json({ error: "Invalid!" });
    }

    try {
        const result = calculateResult(number1, number2, operation);
        res.json({ result: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
