const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
/*
json request format:
{
    "curr_unit": "current unit",
    "amount": number,
    "desired": "desired unit"
}

json response format:
{
    "unit": "desired unit",
    "amount": number
}

*/
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

const convertVolume = (amount, from, to) => {
    const amountInTsp = amount * conversions.volume[from];
    const result = amountInTsp / conversions.volume[to];
    return parseFloat(result.toFixed(3));
};

const convertWeight = (amount, from, to) => {
    const amountInOz = amount * conversions.weight[from];
    const result = amountInOz / conversions.weight[to];
    return parseFloat(result.toFixed(3));
};

const isVolumeUnit = unit => conversions.volume.hasOwnProperty(unit);
const isWeightUnit = unit => conversions.weight.hasOwnProperty(unit);

app.post('/convert', (req, res) => {
    const { curr_unit, amount, desired } = req.body;

    if (!curr_unit || !desired || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    if (isVolumeUnit(curr_unit) && isVolumeUnit(desired)) {
        const convertedAmount = convertVolume(amount, curr_unit, desired);
        return res.json({ unit: desired, amount: convertedAmount });
    }

    if (isWeightUnit(curr_unit) && isWeightUnit(desired)) {
        const convertedAmount = convertWeight(amount, curr_unit, desired);
        return res.json({ unit: desired, amount: convertedAmount });
    }

    if ((isVolumeUnit(curr_unit) && isWeightUnit(desired)) || (isWeightUnit(curr_unit) && isVolumeUnit(desired))) {
        return res.status(400).json({ error: 'Cannot convert between volume and weight directly' });
    }

    return res.status(400).json({ error: 'Unknown units' });
});

app.listen(port, () => {
    console.log(`Unit conversion API is running on http://localhost:${port}`);
});
