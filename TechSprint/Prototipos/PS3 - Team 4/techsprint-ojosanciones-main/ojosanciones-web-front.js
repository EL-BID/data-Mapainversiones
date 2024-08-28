'use strict';

const optionDefinitions = [
    { name: 'elastic_uri', alias: 'e', type: String }, // id field to use for file names in the dataset
    { name: 'keywordList', alias: 'k', type: String }, // id field to use for file names in the dataset
    { name: 'elastic_index', alias: 'i', type: String, defaultValue: "ojosanciones" } // elastic index name to query
];

const commandLineArgs = require('command-line-args');
const args = commandLineArgs(optionDefinitions);

//import user and keyword list
// const keywordList = require(args.keywordList)
const http = require("http");

const db = require("./lib/db");
const views = require("./lib/views");


const host = 'localhost';
const port = 8009 || process.env.OJOSANCIONES_PORT;


const log = ""

main();


//Connect to elastic, query each keyword and send emails
function main() {
    db.connect(args.elastic_uri,args).then(() => {
        startServer();
    }).catch(err => {
        
        process.exit(err);
    })
}

function startServer() {

    const server = http.createServer(views.requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}

