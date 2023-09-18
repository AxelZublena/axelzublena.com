import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const { DB_HOST, DB_PORT, DB_DATABASE, ATLAS_CONNECTION_STRING } = process.env;

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}


export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        // const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
        // const mongoUrl = "mongodb://localhost:27017"
        let mongoUrl = ""
        if (ATLAS_CONNECTION_STRING) {
            mongoUrl = ATLAS_CONNECTION_STRING;
        }
        else {
            mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}`;
        }
        cached.promise = MongoClient.connect(mongoUrl).then((client) => {
            return {
                client,
                db: client.db(DB_DATABASE)
            };
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
