const express =  require("express");
const app=express();

const port=process.env.PORT || 4000;

app.get("/", function(req,res){
    res.json({
        message: "Sucess",
        data: "Api Running"
    })
})

app.listen(port, function(){
    console.log(`The server is running at port ${port}`);
})