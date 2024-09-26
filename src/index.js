const express = require('express');

const app = express();

app.use('/ping',(req,res) => {
    res.send("welcome to the server");
});


PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT} `);
}

)