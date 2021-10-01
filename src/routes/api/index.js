import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";
import * as fs from "fs";
//import Showdown from "showdown";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import marked from "marked";
import hljs from "highlight.js";

export async function get(request) {
	try {
		const post = request.query.get("post");
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("axelzublena-blog");
		const posts = await collection.find({ post }).toArray();

		return {
			status: 200,
			body: {
				posts
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

export async function post(request) {
	try {
		// Parses the request body
		const post = JSON.parse(request.body);

		// Initializes converter for Markdown to HTML
		//const converter = new Showdown.Converter();

		// Sets converter to GitHub flavor of markdown
		//converter.setFlavor("github");

		marked.setOptions({
			highlight: function (code) {
				return hljs.highlightAuto(code).value;
			}
		});
		// Converts markdown to html from post's file
		//const htmlFile = sanitizeHtml(converter.makeHtml(post.file.text));
		const htmlFile = marked(post.file.text);

		// Initializes HTML parser with the html text
		const dom = new JSDOM(htmlFile);

		// Gets the title element
		//const title = dom.querySelector();
		const title = dom.window.document.querySelector("h1");

		// Set the title of the post
		post.title = title.textContent;
		// Remove the title from the HTMl text file
		title.remove();
		// Update post object with the right file text (html)
		post.file.text = dom.window.document.body.innerHTML;

		// Connect to the DB and the right table
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("axelzublena-blog");

		// Insert a new post
		await collection.insertOne(post);

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
export async function put(request) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("axelzublena-blog");

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
		const collection = db.collection("axelzublena-blog");

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
