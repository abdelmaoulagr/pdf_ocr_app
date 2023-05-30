// To connect with your mongoDB database
import mongoose from 'mongoose';
import connect from './database/conn.js';


// Schema for users of app
const LoisSchema = new mongoose.Schema({
    loi: {
        type: String,
		required: true,
	},
});
const Loi= mongoose.model('lois',LoisSchema);

// For backend and express
import express, { json } from 'express';
const app = express();
import cors from 'cors'
app.use(express.json());
app.use(cors());
const port=5000

//import model
import File from './model/files.model.js';

// checking backend is working or not by
app.get("/", (req, res) => {
    try{
        File.find({}).then(data=>{
            res.json(data)
        }).catch(err=>{res.json({err})})
    }catch(err){res.json({err})}
});

//POST: http://loacalhost:5000/uploads
app.post('/uploads',async(req,res)=>{
    const body = req.body;
    try{
        const newFile = await File.create(body)
        newFile.save();
        res.status(201).json({msg:"New file Uploaded.....!"})
    }catch(err){
        res.status(409).json({message:err.message})
    }
})

// get data from lois collection
app.get("/lois", async (req, res) => {
    try {
        const firstloi = await Loi.find({},{_id:0});
        res.send({"data":firstloi});
        console.log({"data":firstloi})
        } catch (err) {
        console.log(err);
    }
});

connect().then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`App listen at port ${port}`);
        })
    }catch(error){
        console.log("Can't connect to server")
    }
}).catch((error)=>{
    console.log("Invalid Database Connection.....")
})

