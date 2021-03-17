var express = require('express');
var app = express();
var session = require('express-session');
var mySQL = require('mysql');
var MySQLSessionStore = require('express-mysql-session')(session);

var MySQLOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zlatodima',
    database: "tasksdb"
};

var connection = mySQL.createConnection(MySQLOptions);
connection.connect(function(){
    var query = "CREATE DATABASE IF NOT EXISTS `TasksDB`;";
    connection.query(query, function(err, result){
        if(err){
            console.log(err);
        }
    });

    var query = `CREATE TABLE IF NOT EXISTS messages(
     session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
     message_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
     data mediumtext COLLATE utf8mb4_bin NOT NULL,
     FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE, PRIMARY KEY(message_id))ENGINE=InnoDB`;
    connection.query(query, function(err, result){
        if(err){
            console.log(err);
        }
    });
});

const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.use(express.static(__dirname));


var sessionStore = new MySQLSessionStore({}, connection);

app.use(session({
    name: 'session-id',
    secret: 'keyboard cat',
    resave: true,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
        maxAge : 1000 * 1000,
    }
}));

module.exports.connection = connection;
module.exports.Store = sessionStore;

var indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

app.listen(3000);