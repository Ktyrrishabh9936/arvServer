const express = require('express');
const cors = require('cors');
const Connectdb = require('./source/config/db');
const app  = express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config();
Connectdb();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
        return res.status(200).send({message:'Welcome to node js',status:true});
});

const authRouters = require('./source/routes/authRoute');
app.use('/auth',authRouters);

const userRouters = require('./source/routes/userRoute');
app.use('/users',userRouters);
const blogRouters = require('./source/routes/BlogRoute');
app.use('/blog',blogRouters);


const chalk = require('chalk');

app.listen(5000,()=>{
        console.log(chalk.magenta("Arevei Api Run Successfully ------->"));
})
module.exports = app;