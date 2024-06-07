const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

app.use(express.json());


const recipes = require('./recipes.json');



/*
    FOR SERVING TO FRONT END
*/


/*
    Simple function to return the recipe with the specified ID
*/
app.get('/recipe/:_id', (req, res) =>{
    console.log("Returning recipe with a specific ID")
    const recID = req.params._id;
    if(recID < recipes.length){
        res.json(recipes[recID]);
    }
    else{
        res.status(404).json({Error: 'Not Found'});
    }
});

/*
    Function to return all recipes 
*/

app.get('/recipes', (req, res) =>{
    console.log("Returning all recipes")
    res.json(recipes);
})


/*
    Function to add a recipe to the backlog
*/

const fs = require('fs');

app.post('/recipe/add', (req, res) => {
    console.log("Request to add new recipe")
    const newRecipe = req.body;
    newRecipe.ID = recipes.length;
    recipes.push(newRecipe);

    fs.writeFile('recipes.json', JSON.stringify(recipes, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({Error: 'Failed to write to file'});
        } else {
            res.status(200).json({Success: 'Recipe added successfully'});
        }
    });
});


app.get('/recipe/:_id', (req, res) =>{
    console.log("Returning recipe with a specific ID")
    const recID = req.params._id;
    if(recID < recipes.length){
        res.json(recipes[recID]);
    }
    else{
        res.status(404).json({Error: 'Not Found'});
    }
});

app.post('/recipe/edit/:_id', (req, res) => {
    console.log("Request to edit a recipe")
    const recID = req.params._id;
    const editedRecipe = req.body;
    recipes[recID] = editedRecipe;
    fs.writeFile('recipes.json', JSON.stringify(recipes, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({Error: 'Failed to write to file'});
        } else {
            res.status(200).json({Success: 'Recipe added successfully'});
        }
    });
});










/*
    CONVERSION PORTION
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
    console.log(`API backend is running on http://localhost:${port}`);
});
