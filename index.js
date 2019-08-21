const express = require('express'),
    http = require('http');
const bodyParser = require('body-parser');


const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(bodyParser.json());


// Logger Start
var fs = require('fs')
const morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream')
var logDirectory = path.join(__dirname, 'log')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})
app.use(morgan('dev', {
    stream: accessLogStream
}));

// Logger ENd

app.use(express.static(__dirname + '/public'));
const expenseRouter = require('./routes/expenseRouter');

//callRouter(app);
app.use('/expenses', expenseRouter);


app.use((req, res, next) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Expense Manager System</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
