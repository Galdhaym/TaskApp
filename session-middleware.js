var sessionStore = require("./app");
var uuid = require("uuid");

module.exports.checkSession = function(req, res, next){
    sessionStore.Store.get(req.session.id, function(error, session){
        if(session === null){
            console.log("session = "+ session);
            console.log("error = "+ error);
            var id = uuid.v1();
            req.session.id = id;
            req.session.userType = "guest";
            next();
        }
        else{
            next();
        }
    });
}

