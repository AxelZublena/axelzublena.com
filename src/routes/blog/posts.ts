import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";
import * as fs from "fs";
import hljs from 'highlight.js';
import { marked } from "marked";
import { DOMParser, parseHTML } from "linkedom"

export async function get(request) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("posts");
		const posts = await collection.find({}).toArray();

		return {
			status: 200,
			body: {
				posts
			}
		};
	} catch (err) {
		console.log("things happens here")
		return {
			status: 500,
			body: {
				error: "A server error occured",
				message: err
			}
		};
	}
}

export async function post(request) {
	try {
		// Parses the request body
		const post = JSON.parse(request.body);

		marked.setOptions({
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			}
		});
		marked.setOptions({
			renderer: new marked.Renderer(),
			highlight: function(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			},
			langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
			pedantic: false,
			gfm: true,
			breaks: false,
			sanitize: false,
			smartLists: true,
			smartypants: false,
			xhtml: false
		});

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

			return {
				status: 200,
				body: {
					status: "Success"
				}
			};
		}

	} catch (err) {
		return {
			status: 500,
			body: {
				error: "A server error occured",
				message: err
			}
		};
	}
}
export async function put(request) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("posts");

		const post = JSON.parse(request.body);
		await collection.updateOne(
			{ _id: new ObjectId(post._id) },
			{ $set: { title: post.title, date: post.date, body: post.body } }
		);

		return {
			status: 200,
			body: {
				status: "Success"
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: "A server error occured",
				message: err
			}
		};
	}
}
export async function del(request) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("posts");

		const post = JSON.parse(request.body);
		await collection.deleteOne({ _id: new ObjectId(post._id) });

		return {
			status: 200,
			body: {
				status: "Success"
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: "A server error occured",
				message: err
			}
		};
	}
}
