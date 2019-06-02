var express = require('express');
var app = express();
app.use(express.json())

const mongo = require('mongodb').MongoClient;
var url = 'mongodb://wv-server:27017/EmployeeDB';
var str = "";


app.route('/Loans').get(function(req, res) {
    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err)
            return
        }

        const db = client.db('FinanceApp')
        const coll = db.collection('Loans')

        coll.find().toArray(
            (err, items) => {
            console.log(items);
            res.send(items);
         })
    });
});

app.route('/payments').get(function(req, res) {
    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err)
            return
        }

        const db = client.db('FinanceApp')
        const coll = db.collection('Payments')

        coll.find().toArray(
            (err, items) => {
                console.log(items);
                res.send(items);
            })
    });
});
app.route('/payments/:borrower').get(function(req, res) {
    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err)
            return
        }


        const db = client.db('FinanceApp')
        const coll = db.collection('Payments')

        coll.find({borrower: req.params.borrower}).toArray(
            (err, items) => {
                console.log(items);
                res.send(items);
            })
    });
});


app.route('/payment').put(function(req, res) {
    mongo.connect(url, (err, client) => {
        if (err) {
            console.error(err)
            res.json(paymentPutError);
            return;
        }

        if( !req.body.borrower || !req.body.paymentAmount ) {
            res.json(paymentPutError);
            return;
        }

        const db = client.db('FinanceApp')
        const coll = db.collection('Payments')

        const paymentDate = (!req.body.paymentDate ? new Date() : new Date(req.body.paymentDate));

        const payment = {
            borrower: req.body.borrower,
            paymentAmount: req.body.paymentAmount,
            paymentDate: paymentDate
        };

        coll.insertOne( payment );
        res.json(payment);
        // res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object

    })
});


const paymentPutError =
    {
        error: "Invalid request",
        expected: {
            borrower: "Warren Voelkl",
            paymentAmount: 123,
            paymentDate: Date()
        }
    };

var server = app.listen(3000, function() {});

/*
db.createCollection("Employee")

db.Employee.insertMany([
    {Employeeid : 1, Employee Name : Guru99},
	{Employeeid : 2, Employee Name : Joe},
	{Employeeid : 3, Employee Name : Martin}
])

 */