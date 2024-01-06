import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const post = await getPost(params.post);
	return post
}

async function getPost(id: string) {
	try {
		// const id = post;
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("posts");
		const post = await collection.findOne({ _id: new ObjectId(id) });

		if (!post) {
			console.log("no post")
			// TODO: redirect user to Home or body
			error(404, 'Post not found');
		}

		return {
			_id: post._id.toString(),
			file: post.file,
			date: post.date,
			title: post.title
		}
	} catch (err) {
		error(404, err.message);
	}
}
