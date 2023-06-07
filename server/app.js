const _ = require('lodash');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const users1 = require('./users.json');
const todos1 = require('./todos.json');
const movs = require('./movs.json');
const fs=require("fs");

/*var TODOS = [
    { 'id': 1, 'user_id': 1, 'name': 250, 'completed': false },
    { 'id': 2, 'user_id': 2, 'name': 1500, 'completed': true },
    { 'id': 3, 'user_id': 3, 'name': 200, 'completed': false },
    { 'id': 4, 'user_id': 4, 'name': 1750, 'completed': false },
];
var USERS = [
    { 'id': 1, 'username': 'jemma' , 'password': 'pass'},
    { 'id': 2, 'username': 'paul' , 'password': 'pass'},
    { 'id': 3, 'username': 'sebastian' , 'password' : 'pass1'},
];*/
function getTodos(userID) {
    var todos = _.filter(todos1, ['user_id', userID]);

    return todos;
}
function getTodo(todoID) {
    var todo = _.find(todos1, function (todo) { console.log(todo.id);return todo.id == todoID; })

    return todo.name;
}
function getMovs(userID) {
    var transfers = _.filter(movs, ['id',userID]);
    var deposits = _.filter(movs , ['id',userID]);

    return transfers;
}
function getMov(movID) {
    var mov = _.find(movs, function (mov) { console.log(mov.id);return mov.id == movID; })

    return mov;
}
function getUsers() {
    return users1;
}

app.use(bodyParser.json());
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});
app.post('/api/deposit',function(req,res){
    const body=req.body;
    const quantia=body.quantia;

    const todo=todos1.find(todo=>todo.user_id==req.user.userID)
    console.log(req.user.userID)
    console.log(todo.user_id)
    const cash=todo.name
    const new_cash=cash+parseInt(quantia)
    upd_todo=todos1.findIndex((obj=>obj.id==req.user.userID))
    todos1[upd_todo].name=new_cash;
    const mov=movs.find(mov=>movs.id==req.user.userID)
    upd_mov=movs.findIndex((obj)=>obj.id==req.user.userID)
    movs[upd_mov].deposits.push(quantia);
    //todos1.name=new_cash
    console.log(movs)
    console.log(todos1)

    fs.writeFile("todos.json",JSON.stringify(todos1),(error)=>{
        if(error){
            console.log(error)

        throw error;}
    })

    fs.writeFile("movs.json",JSON.stringify(movs),(error)=>{
        if(error){
            console.log(error)

        throw error;}
    })
    res.send({new_cash})
});
app.post('/api/transfer',function(req,res){
    const body=req.body;
    const quantia=body.quantia;

    const todo=todos1.find(todo=>todo.user_id==req.user.userID)
    console.log(req.user.userID)
    console.log(todo.user_id)
    const cash=todo.name
    const new_cash=cash-parseInt(quantia)
    //Error handling
    if(new_cash<0){
        console.log("ERROR");
        res.status(400).json({msg: "Insuficient funds"})
    }
    else{
    upd_todo=todos1.findIndex((obj=>obj.id==req.user.userID))
    todos1[upd_todo].name=new_cash;
    const mov=movs.find(mov=>movs.id==req.user.userID)
    upd_mov=movs.findIndex((obj)=>obj.id==req.user.userID)
    movs[upd_mov].transfers.push(quantia);
    todo.name=new_cash
    console.log(todos1)

    fs.writeFile("todos.json",JSON.stringify(todos1),(error)=>{
        if(error){
            console.log(error)

        throw error;}
    })

    fs.writeFile("movs.json",JSON.stringify(movs),(error)=>{
        if(error){
            console.log(error)

        throw error;}
    })
    
    res.send({new_cash})}
});
app.post('/api/auth', function(req, res) {
    const body = req.body;
    const flag = body.flag;
    let user = users1.find(user => user.username == body.username);
    if((!user || body.password != user.password) && flag) return res.sendStatus(401);
    if(!user && !flag){
        todos1.push({id: 6, user_id: 6, name: 0, completed: true});
        users1.push({id: 6, username: body.username, password: body.password});
        movs.push({id: 6, name: body.username, transfers: [], deposits: [] })
        user = users1.find(user => user.username == body.username);
        //Add to files
        fs.writeFile("todos.json",JSON.stringify(todos1),(error)=>{
            if(error){
                console.log(error)
    
            throw error;}
        })
    
        fs.writeFile("users.json",JSON.stringify(users1),(error)=>{
            if(error){
                console.log(error)
    
            throw error;}
        })

        fs.writeFile("movs.json",JSON.stringify(movs),(error)=>{
            if(error){
                console.log(error)
    
            throw error;}
        })
    }
    var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
    res.send({token});
});

app.get('/api/todos', function (req, res) {
    res.type("json");
    res.send(getTodos(req.user.userID));
});
app.get('/api/movs', function (req, res) {
    res.type("json");
    res.send(getMovs(req.user.userID));
});
app.get('/api/movs/:id', function (req, res) {
    var movID = req.params.id;
    res.type("json");
    res.send(getMov(movID));
});
app.get('/api/todos/:id', function (req, res) {
    var todoID = req.params.id;
    res.type("json");
    res.send(getTodo(todoID));
});
app.get('/api/users', function (req, res) {
    res.type("json");
    res.send(getUsers());
});

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
