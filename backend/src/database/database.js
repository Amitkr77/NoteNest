import mongoose from "mongoose";

const db =async()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://amitroyk99:NoteNest@cluster0.xvwrs.mongodb.net/workbook')
        console.log(`MongoDb connected !! DB HOST : ${conn.connection.host} ${conn.connection.name}`);
        
    } catch (error) {
        console.error("Mongoose connection error", error);
        process.exit(1);
    }
}

export default db