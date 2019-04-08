const getDataObject = require('./getDataFromFile');
const MongoClient = require('mongodb').MongoClient;


const connectionUrl = '';
const dbName = '';
const collectionName = '';
const fileName = '';

getDataObject(fileName, (objectArray) => {
    MongoClient.connect(connectionUrl, function (err, client) {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertMany(objectArray);
        client.close();
        console.log('insert complete');
    });
});

