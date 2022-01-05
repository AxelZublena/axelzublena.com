import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";

export async function get(request) {
	try {
		const id = request.params.post;
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("posts");
		const post = await collection.findOne({ _id: new ObjectId(id) });
		if (!post) {
			console.log("no post")
			return {
				status: 404,
				headers: {
					location: '/'
				}
			};
		}

		return {
			status: 200,
			body: {
				post
			}
		};
	} catch (err) {

		return {
			status: 404,
			body: {
				error: "Could not retrieve post",
				message: err.message
			}
		};
	}
}
