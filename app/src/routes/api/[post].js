import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";

export async function get(request) {
	try {
		const id = request.params.post;
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection("axelzublena-post");
		const post = await collection.findOne({ _id: new ObjectId(id) });

		return {
			status: 200,
			body: {
				post
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: "Could not retrieve post",
				message: err.message
			}
		};
	}
}
