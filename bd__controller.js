var db = require("./app.js");

function makeQuery(query, callback){
    db.connection.query(query, callback);
}

module.exports.insertMessageToDB = function insertMessageToDB(data, callback){
    var query = `INSERT INTO messages values("`+data.sessionID+`","`+data.messageID+`", "`+data.messageValue+`")`;
    makeQuery(query, function(err, result){
        if(err){
            console.log(err);
        }
        callback();
    });
}

module.exports.selectAllMessagesToDB = function selectAllMessagesToDB(sessionID, callback){
    var query = `SELECT * FROM messages WHERE session_id = "`+ sessionID +`"`;
    makeQuery(query, function(err, result){
        if(err){
            console.log(err);
        }
        callback(result);
    });
}

module.exports.removeMessageFromDB = function removeMessageFromDB(data, callback){
    var query = `DELETE FROM messages WHERE session_id = "`+ data.sessionID +`" AND message_id = "`+ data.messageID +`"`;
    makeQuery(query, function(err, result){
        if(err){
            console.log(err);
        }
        callback(result);
    });
}





