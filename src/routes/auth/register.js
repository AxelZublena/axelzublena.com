import stringHash from "string-hash";
import * as cookie from "cookie";
import { v4 as uuidv4 } from "uuid";

import { connectToDatabase } from "$lib/db";

export async function post(request) {
	try {
		const body = request.body;

		// Connect to the DB and the right table
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const userDB = db.collection("axelzublena-user");
		const cookieDB = db.collection("axelzublena-cookies");

		const user = await userDB.findOne({ email: body.email });
		if (user) {
			return {
				status: 409,
				body: {
					message: "User with that email already exists"
				}
			};
		}

		await userDB.insertOne({
			email: body.email,
			password: stringHash(body.password),
			name: body.name
		});

		const cookieId = uuidv4();

		await cookieDB.insertOne({
			cookieId,
			email: body.email
		});

		const headers = {
			"Set-Cookie": cookie.serialize("session_id", cookieId, {
				httpOnly: true,
				maxAge: 120,
				sameSite: "strict",
				path: "/"
			})
		};

		return {
			status: 200,
			headers,
			body: {
				message: "Registered successfuly"
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
