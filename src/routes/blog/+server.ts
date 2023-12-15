import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";
import hljs from 'highlight.js';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { parseHTML } from "linkedom"
import { json } from '@sveltejs/kit';

// TODO: Secure API

export async function GET({ request }) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("posts");
        const posts = await collection.find({}).toArray();

        return json({
            status: 200,
            posts
        })
    } catch (err) {
        return json({
            status: 500,
            body: {
                error: "A server error occured",
                message: err
            }
        });
    }
}

export async function POST({ request }) {
    try {
        // Parses the request body
        const post = await request.json()

        const marked = new Marked(
            markedHighlight({
                langPrefix: 'hljs language-',
                highlight(code, lang) {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                }
            })
        );

        let html = marked.parse(post.file.text);
        // Initializes HTML parser with the html text
        const dom = parseHTML(html)
        // const dom = new JSDOM(html);

        // Gets the title element
        const titleDOM = dom.window.document.querySelector("h1");

        post.title = titleDOM.innerText;

        // Remove the title from the HTMl text file
        titleDOM.remove();

        post.file.text = dom.document.toString();


        if (html) {

            // Connect to the DB and the right table
            const dbConnection = await connectToDatabase();
            const db = dbConnection.db;
            const collection = db.collection("posts");

            // Insert a new post
            await collection.insertOne(post);

            return json({
                status: 200,
                body: {
                    status: "Success"
                }
            });
        }

    } catch (err) {
        console.log(err)
        return json({
            status: 500,
            body: {
                error: "A server error occured",
                message: err.message
            }
        });
    }
}
export async function PUT({ request }) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("posts");

        const post = await request.json()
        await collection.updateOne(
            { _id: new ObjectId(post._id) },
            { $set: { title: post.title, date: post.date, body: post.body } }
        );

        return json({
            status: 200,
            body: {
                status: "Success"
            }
        });
    } catch (err) {
        return json({
            status: 500,
            body: {
                error: "A server error occured",
                message: err
            }
        });
    }
}
export async function DELETE({ request }) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("posts");

        const post = await request.json()
        await collection.deleteOne({ _id: new ObjectId(post._id) });

        return json({
            status: 200,
            body: {
                status: "Success"
            }
        });
    } catch (err) {
        return json({
            status: 500,
            body: {
                error: "A server error occured",
                message: err
            }
        });
    }
}
