'user strict';
var sql = require('./connectionManager');

//Task object constructor
var Expense = function (expense) {
    this.expenseID = expense.expenseID;
    this.expense = expense.expense;
    this.itemName = expense.itemName;
    this.date = new Date();
    //   expenseID, expense, itemName, date expenses
};
Expense.createTask = function (expenseModel, result) {
    sql.query("INSERT INTO expenses set ?", expenseModel, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Expense.getTaskById = function (taskId, result) {
    sql.query("Select * from expenses where expenseID = ? ", taskId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Expense.getAllExpenses = function (result) {
    sql.query("Select * from expenses", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};
Expense.updateById = function (id, task, result) {
    sql.query("UPDATE expenses SET expense = ?,itemName=? WHERE expenseID = ?", [task.expense, task.itemName, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Expense.remove = function (id, result) {
    sql.query("DELETE FROM expenses WHERE expenseID = ?", [id], function (err, res) {
        console.log("Deleting Record: ", id);
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};
Expense.removeAll = function (id, result) {
    sql.query("DELETE FROM expenses WHERE expenseID in (?)", [id], function (err, res) {
        console.log("Deleting Record: ", id);
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

module.exports = Expense;
