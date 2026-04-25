import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI ;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Global cache for connection
let cachedCon = global.mongoose || {
    conn: null
};

if (!global.mongoose) {
    global.mongoose = cachedCon;
}

export async function connectDb() {
    try {
        // console.log(cachedCon.conn, 'cachedCon conn')
        if (cachedCon.conn) {
            return cachedCon.conn;
        }

        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
            bufferCommands: false,
            dbName: 'fruitcup',
        };

        cachedCon.conn = await mongoose.connect(MONGODB_URI, opts);
        console.log('connected to db - ', MONGODB_URI)
        return cachedCon.conn;
    } catch (err) {
        console.error('Error in connecting db', err)
    }
}
