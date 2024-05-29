const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const conversions = {
    "volume": {
        "tsp": 1,
        "tbsp": 3,
        "cup": 48,
        "fl oz": 6,
        "pt": 96,
        "qt": 192,
        "gal": 768,
        "ml": 0.202884,
        "L": 202.884
    },
    "weight": {
        "oz": 1,
        "lb": 16,
        "g": 0.035274,
        "kg": 35.274
    }
};

const convertUnits = (amount, from, to, type) => {
    const baseAmount = amount * conversions[type][from];
    const result = baseAmount / conversions[type][to];
    return parseFloat(result.toFixed(3));
};

const isUnitValid = (unit, type) => conversions[type].hasOwnProperty(unit);

app.post('/convert', (req, res) => {
    const { curr_unit, amount, desired } = req.body;

    if (!curr_unit || !desired || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid input: Ensure current unit, desired unit, and amount are correctly specified.' });
    }

    const type = isUnitValid(curr_unit, 'volume') && isUnitValid(desired, 'volume') ? 'volume' :
                 isUnitValid(curr_unit, 'weight') && isUnitValid(desired, 'weight') ? 'weight' : null;

    if (type) {
        const convertedAmount = convertUnits(amount, curr_unit, desired, type);
        return res.json({ unit: desired, amount: convertedAmount });
    }

    return res.status(400).json({ error: 'Incompatible or unknown units' });
});

app.listen(port, () => {
    console.log(`Unit conversion API is running on http://localhost:${port}`);
});
