import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


export default async function connect(){
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect('mongodb://127.0.0.1:27017/',
    {
        dbName :'Lois',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } ,err => err ? console.log(err) :
        console.log('MongoDB successefully Connected to Lois database')
        );

}
