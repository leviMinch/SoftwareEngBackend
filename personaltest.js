const axios = require('axios');

const recipe = {
    "Title": 'test',
    "Author": "John Doe",
    "ID": 2 - 1,
    "Overview": 'test',
    "Image": "/images/default.png",
    "Date Added": "05-30-2022",
    "Ingredients": 1,
    "Steps": 1,
    "Servings": parseInt(1),
    "Cook Time": {
        "Prep": "15 minutes",
        "Cook": "15 minutes",
        "Total": "30 minutes"
    }
};


axios.post('http://localhost:3000/recipe/add', recipe)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

axios.get('http://localhost:3000/recipes')
    .then(response =>{
        console.log(response, null, 2);
    })
    .catch(error =>{
        console.error(`Error: ${error}`);
    })
