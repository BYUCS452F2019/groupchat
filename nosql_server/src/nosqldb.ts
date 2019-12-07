const mongoClient = require('mongodb').MongoClient;

// mongodb+srv://groupchatadmin:<groupchatadmin>@cluster0-lfwdy.mongodb.net/test?retryWrites=true&w=majority

const mongoDbUrl = "mongodb+srv://groupchatadmin:<groupchatadmin>@cluster0-lfwdy.mongodb.net/test?retryWrites=true&w=majority";
let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, db) => {
        mongodb = db;
        callback();
    });
}

function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};