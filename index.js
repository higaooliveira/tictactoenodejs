const express = require('express')
const app = express()
const port  = 8080;
app.use(express.json());
const knex = require('knex')({
    client: "mysql",
    connection: {
        host:'127.0.0.1',
        user: 'root',
        password: '',
        database: 'tictactoe'
    }
});


app.post('/save', function(req, res,next){
    console.log(req.body);
    knex('games')
    .insert(req.body)
    .then(data=>{
        return res.send(data);
    }, next);   
});

app.get('/all', function(req, res, next){
    knex('games')
    .then(data=>{
        res.send(data);
    }, next);   
});

app.get(/\/(.*)?.*/, app.use(express.static("./dist")));

app.listen(port, function(){
    console.log("Para derrubar o servidor utilize ctrl + c");
});