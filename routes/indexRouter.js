var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var sessionMiddleware = require('../session-middleware');
var bdController = require('../bd__controller');

router.get("/", sessionMiddleware.checkSession, function(req, res){
    var sessionID = req.session.id;
    bdController.selectAllMessagesToDB(sessionID, function(result){
        res.render("Tasks.hbs",{messages: result});
    });
});

router.post("/addNewTask", sessionMiddleware.checkSession, function(req, res){
    var messageID = uuid.v1();
    var messageData = {
        sessionID: req.session.id,
        messageID,
        messageValue: req.body.messageValue
    }
    var returnedMessageData = {
        messageID,
        messageValue: req.body.messageValue
    }
    var jsonMessageData = JSON.stringify(returnedMessageData);
    bdController.insertMessageToDB(messageData, function(){
        res.send(jsonMessageData);
    });
});

router.post("/removeTask", sessionMiddleware.checkSession, function(req, res){
    var messageID = req.body.messageID;
    var messageData = {
        sessionID: req.session.id,
        messageID
    };
    bdController.removeMessageFromDB(messageData, function(){});
});

module.exports = router;