For which teammate did you implement “Microservice A”?
This microservice is made for both Steven and Kevin

What is the current status of the microservice? Hopefully, it’s done!
Completed!

How is your teammate going to access your microservice? Should they get your code from GitHub? Should they run your code locally? Is your microservice hosted somewhere? Etc.
Using an api they can send a json post to https://fathomless-fjord-42807-d7734a491f1f.herokuapp.com/convert

If your teammate cannot access/call YOUR microservice, what should they do? Can you be available to help them? What’s your availability?
They can reach out to me via microsoft teams. I will respond within one day, although it will most likely be within a few hours.

If your teammate cannot access/call your microservice, by when do they need to tell you?
by end of week 9.

Is there anything else your teammate needs to know? Anything you’re worried about? Any assumptions you’re making? Any other mitigations / backup plans you want to mention or want to discuss with your teammate?
If there is a specific issue or feature that they would like fixed/added I'm more than happy to fix it!

Example: 

    fetch('https://fathomless-fjord-42807-d7734a491f1f.herokuapp.com/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            {   
                curr_unit: 'tbsp', 
                amount: 2, 
                desired: 'ml' 
            }
        })
    })
    .then(response => response.json()) 
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

