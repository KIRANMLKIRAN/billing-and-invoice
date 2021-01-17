const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const{ mongoose}=require('./db.js');
var billinRrouter=require('./routes/billing.route')
var app=express();
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());



const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log('Server started at:3000'));
app.use('/billing',billinRrouter);


