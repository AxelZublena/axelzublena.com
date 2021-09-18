import { connectToDatabase } from "$lib/db";
import { ObjectId } from "mongodb";
import * as fs from 'fs';
import { exec } from "child_process"
import Showdown from "showdown"
import { reporter } from 'vfile-reporter'
import { remark } from 'remark'
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import remarkHtml from 'remark-html'

export async function get(request) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("axelzublena-file");
        const files = await collection.find().toArray();

        return {
            status: 200,
            body: {
                files
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
        const data = JSON.parse(request.body)

        //const markdownFileDataURL = data.fileDataURL
        //const markdownFileName = data.fileName
        //const markdownFilePath = path + markdownFileName

        //const fileUint8Array = dataURLtoFile(markdownFileDataURL);
        //saveFile(fileUint8Array, markdownFilePath)

        //const HTMLFileName = markdownFileName.split('.')[0] + ".html";
        //const HTMLFilePath = path + HTMLFileName;
        //console.log("things appening")
        //markdownToHTML(markdownFilePath, HTMLFileName);
        //const HTMLFileUint8Array = fs.readFile(HTMLFilePath, null);

        //const markdownFileDataURL = data.fileDataURL
        //const fileUint8Array = dataURLtoFile(markdownFileDataURL);
        //console.log(fileUint8Array)

        //console.log(fileUint8Array);
        //const htmlFileText = fs.readFile(fileUint8Array, null);
        //const htmlFileText = JSON.parse(fileUint8Array.toString())

        //const htmlFileText = fs.readFileSync("./temp.md", "utf-8")
        //const htmlFileText = reader.readAsText(fileuint8array.buffer);
        //console.log(htmlFileText)

        //const converter = new Showdown.Converter()
        ////const text = '# hello, markdown!'
        //const htmlFile = converter.makeHtml(data.fileText)
        //remark().process(data.fileText).then((file) => console.log(file))
        remark()
            .use(remarkPresetLintRecommended)
            .use(remarkHtml)
            .process('## Hello world!')
            .then((file) => {
                console.error(reporter(file))
                console.log(String(file))
            })
        //console.log(htmlFile);


        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection("axelzublena-file");

        //const db_data = {
        //html: htmlFile,
        //name: data.fileName
        //}
        //console.log(db_data)
        //await collection.insertOne(db_data);


        return {
            status: 200,
            body: "Success"
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                error: "A server error occured",
                message: err.message
            }
        }
    }
}
function dataURLtoFile(dataURL) {
    let arr = dataURL.split(','),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return u8arr;
}
function saveFile(blob, path) {
    fs.appendFile(path, blob, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${path} saved.`);
        }
    });
}
