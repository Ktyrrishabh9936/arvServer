const chalk = require("chalk");
const { default: mongoose } = require("mongoose");


const Connectdb = function(){
        mongoose.connect(process.env.mongoURL);
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log(chalk.bgGreen('Mongo Database is connected successfully'));
});
conn.on('disconnected',function(){
    console.log(chalk.bgGreen('Mongo Database is disconnected '));
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
    }

module.exports = Connectdb;