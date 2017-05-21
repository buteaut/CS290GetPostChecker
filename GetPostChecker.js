/**
 * Author: Thomas Buteau
 * Class: CS290-400
 * Assignment: Get and Post Checker
 * Due Date: 5-21-17
 * Note: Code used is based on Form Handling lecture for CS-290 Week 7
 */

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req,res){
    //set up array to take request arguments

    var userArr = [];
    for (var item in req.query)
    {
        userArr.push({'name':item,'value':req.query[item]})
    }
    var context = {};
    context.dataList = userArr;
    res.render('get-loopback-improved', context);
});

app.post('/', function(req,res){
    //same set up as app.get above
    var userArr = [];
    for (var item in req.body)
    {
        userArr.push({'name':item,'value':req.body[item]})
    }
    var context = {};
    context.dataList = userArr;
    res.render('post-loopback', context);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});