import mongoose from "mongoose";

const db =async()=>{
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/workBook')
        console.log(`MongoDb connected !! DB HOST : ${conn.connection.host}`);
        
    } catch (error) {
        console.error("Mongoose connection error", error);
        process.exit(1);
    }
}

export default db