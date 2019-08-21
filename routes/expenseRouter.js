const express = require('express');
const bodyParser = require('body-parser');
var Expense = require('../helper/expenseModel');

const expenseRouter = express();
expenseRouter.use(bodyParser.json());

expenseRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log("req.query " + req.query.method);

    if (req.query.method == 'listAll') {
        Expense.getAllExpenses(function (err, task) {

            console.log('controller')
            if (err)
                res.send(err);
            console.log('res', task);
            res.send(task);
        });
    } else if (req.query.method == 'updateExpense') {
        Expense.updateById(new Expense(req.body).expenseID, new Expense(req.body), function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    } else if (req.query.method == 'deleteExpense') {
        Expense.remove(new Expense(req.body).expenseID, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    } else if (req.query.method == 'deleteExpenseAll') {
        Expense.removeAll(new Expense(req.body).expenseID, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    } else if (req.query.method == 'insertExpense') {
        var new_task = new Expense(req.body);
        Expense.createTask(new_task, function (err, task) {

            if (err)
                res.send(err);
            res.json(task);
        });
    } else {
        next();
    }
});
expenseRouter.route('/:taskId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log("req.query " + req.query.method);

    if (req.query.method == 'listAll') {

        next();
    } else {

        Expense.read_a_task(req, res);


    }
});


module.exports = expenseRouter;
