const axios = require('axios');

// Function to test the conversion API
const testConversion = async (curr_unit, amount, desired) => {
    try {
        const response = await axios.post('http://localhost:3000/convert', {
            curr_unit,
            amount,
            desired
        });
        console.log(`Converted ${amount} ${curr_unit} to ${response.data.amount} ${response.data.unit}`);
    } catch (error) {
        console.error(`Error: ${error.response ? error.response.data.error : error.message}`);
    }
};

// Test cases
const testCases = [
    { curr_unit: 'tbsp', amount: 2, desired: 'ml' },   // Expected ~29.5735 ml
    { curr_unit: 'cup', amount: 1, desired: 'tbsp' },  // Expected 16 tbsp
    { curr_unit: 'pt', amount: 1, desired: 'cup' },    // Expected 2 cups
    { curr_unit: 'qt', amount: 1, desired: 'pt' },     // Expected 2 pints
    { curr_unit: 'gal', amount: 1, desired: 'qt' },    // Expected 4 quarts
    { curr_unit: 'fl oz', amount: 1, desired: 'tbsp' }, // Expected 2 tbsp
    { curr_unit: 'oz', amount: 1, desired: 'g' },      // Expected 28.35 g
    { curr_unit: 'lb', amount: 1, desired: 'oz' },     // Expected 16 oz
    { curr_unit: 'L', amount: 1, desired: 'ml' },      // Expected 1000 ml
    { curr_unit: 'kg', amount: 1, desired: 'g' },      // Expected 1000 g
];

// Run the test cases
testCases.forEach(test => {
    testConversion(test.curr_unit, test.amount, test.desired);
});
