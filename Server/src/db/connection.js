import mongoose from "mongoose";


export const connectionDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log('\nDB Connected successfully')
    } catch (error) {
        console.log("MONGODB Connection Failed ", error);
        process.exit(1);
    }
}