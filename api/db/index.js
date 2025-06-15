import mongoose from "mongoose"

const dbConnect =async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("db is coonnected ....")
    } catch (error) {
        console.log("error in database connection" , error);
        process.exit(1)
    }   
}

export default dbConnect