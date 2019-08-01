const MongoClient = require('mongodb').MongoClient;

let db = null;
exports.connect = (url, done) => {
    if (db) return done();

    const DB_NAME = url === 'taskDB';

    MongoClient.connect(url, (err, client) => {
        if (err) return console.error(err);
        db = client.db(DB_NAME);
        done()
    })
};

exports.get = () => {
    return db;
};