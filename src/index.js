const express = require('express');
const connectDB = require('./config/database.config');
const User = require('./models/user');

const app = express();
app.use(express.json());

app.post('/signup',async (req,res)=>{
    // Creating a new instance of the User model

    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added Successfully");
    } catch(err) {
        res.status(400).send("error saving the user" + err.message);
    }
});
PORT = 7777;

connectDB()
    .then(()=>{
        console.log("Database established successfully");

        app.listen(PORT,()=>{ 
            console.log(`Server is started at port ${PORT} `);
    }); 
    }).catch((err)=>{
        console.error("Database Connection Failed");
    });




