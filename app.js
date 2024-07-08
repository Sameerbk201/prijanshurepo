require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./model/todoschema');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(cors());


app.post("/todocreate",async(req,res)=>{
    try {
        const {title,description} = req.body;
        if(!title||!description)
            return res.json({status:false,message:"nothing"})
        const data = new Todo({title, description});
        const todo= await data.save();
        return res.json({status:true,message:"success",todo})
    } catch (error) {
        res.json({status:false,message:"todo"})
    }

})

app.get("/gettodoall",async(req,res)=>{
    try {
        const todos= await Todo.find();
        return res.json({status:true,message:"todofound",todos})
    } catch (error) {
        res.json({status:false,message:"couldnt get it"})
    }
})
// Routes
// const todosRouter = require('./routes/todos');
// app.use('/todos', todosRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
