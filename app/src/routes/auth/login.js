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
		if (!user) {
			return {
				status: 401,
				body: {
					message: "Incorrect email or password"
				}
			};
		}

		if (user.password !== stringHash(body.password)) {
			return {
				status: 401,
				body: {
					message: "Unauthorized"
				}
			};
		}

		const cookieId = uuidv4();

		// Look for existing email to avoid duplicate entries
		const duplicateUser = await cookieDB.findOne({ email: body.email });

		// If there is user with cookie, update the cookie, otherwise create a new DB entry
		if (duplicateUser) {
			await cookieDB.updateOne({ email: body.email }, { $set: { cookieId } });
		} else {
			await cookieDB.insertOne({
				cookieId,
				email: body.email
			});
		}

		const headers = {
			"Set-Cookie": cookie.serialize("session_id", cookieId, {
				httpOnly: true,
				maxAge: 120,
				sameSite: "lax",
				path: "/"
			})
		};

		return {
			status: 200,
			headers,
			body: {
				message: "Logged successfuly"
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
