var express = require('express');
require('./config/database');
var app = express();
var apiRoute = require('./modules')

var middlewares = require('./config/middlewares')(app);
apiRoute(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
    if(err){
        console.log(err)
    }else{
        console.log('APP IS RUNNING ON PORT ', PORT)
    }
})