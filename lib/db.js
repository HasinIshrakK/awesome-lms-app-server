import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;

let client;
let db;

export async function connectDB() {
    if (db) return { client, db };

    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        },
    });

    try {
        await client.connect();
        db = client.db("awesome_lms");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        throw err;
    }

    return { client, db };
}
