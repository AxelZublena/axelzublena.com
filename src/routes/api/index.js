import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";
import * as fs from 'fs';

export async function get(request) {
    try {
        const post = request.query.get("post")
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("axelzublena-blog");
        const posts = await collection.find({ post }).toArray();

        return {
            status: 200,
            body: {
                posts
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                error: "A server error occured",
                message: err
            }
        }
    }
}

export async function post(request) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("axelzublena-blog");

        const post = JSON.parse(request.body);
        await collection.insertOne(post);

        return {
            status: 200,
            body: {
                status: "Success"
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                error: "A server error occured",
                message: err
            }
        }
    }
}
export async function put(request) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("axelzublena-blog");

        const post = JSON.parse(request.body);
        await collection.updateOne({ _id: new ObjectId(post._id) }, { $set: { title: post.title, date: post.date, body: post.body } });

        return {
            status: 200,
            body: {
                status: "Success"
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                error: "A server error occured",
                message: err
            }
        }
    }
}
export async function del(request) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("axelzublena-blog");

        const post = JSON.parse(request.body);
        await collection.deleteOne({ _id: new ObjectId(post._id) });

        return {
            status: 200,
            body: {
                status: "Success"
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                error: "A server error occured",
                message: err
            }
        }
    }
}
function dataURLtoFile(dataURL, filename, path = ".") {
    let arr = dataURL.split(','),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    fs.appendFile(filename, u8arr, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${filename} saved. Path=${path}`);
        }
    });
}
