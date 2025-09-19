import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI ;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Global cache for connection
let cached = global.mongoose || {
    conn: null
};

if (!global.mongoose) {
    global.mongoose = cached;
}

export async function connectDb() {
    try {
        // console.log(cached.conn, 'cached conn')
        if (cached.conn) {
            return cached.conn;
        }

        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
            bufferCommands: false,
            dbName: 'fruitcup',
        };

        cached.conn = await mongoose.connect(MONGODB_URI, opts);
        console.log('connected to db - ', MONGODB_URI)
        return cached.conn;
    } catch (err) {
        console.error('Error in connecting db', err)
    }
}
