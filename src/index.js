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

//get user by emailId
app.get('/feed', async (req,res) =>{
    const userEmail =   req.body.emailId;

    try {
        const user =  await User.findOne({emailId : userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    } catch (error) {
        res.status(400).send("Something went wrong ");
    }

});
// Detele a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
      const user = await User.findByIdAndDelete({ _id: userId });
      //const user = await User.findByIdAndDelete(userId);
      res.send("User deleted successfully");
    } catch (err) {
      res.status(400).send("Something went wrong ");
    }
  });
  // Update data of the user
  app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
      const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
      const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k)
      );
      if (!isUpdateAllowed) {
        throw new Error("Update not allowed");
      }
      if (data?.skills.length > 10) {
        throw new Error("Skills cannot be more than 10");
      }
  
      const user = await User.findByIdAndUpdate({ _id: userId }, data, {
        returnDocument: "after",
        runValidators: true,
      });
      console.log(user);
      res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message);
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




