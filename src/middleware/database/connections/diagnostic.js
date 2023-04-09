const mongoose = require('mongoose');
const cachegoose = require('cachegoose');

let connection;

function connectToDiagnosticDatabase(){

  mongoose.set('strictQuery', true);
  if(!connection){
    connection  = mongoose.createConnection('mongodb+srv://omerald_diag:Q67VNbv7q8MlrnAp@admindiagnostic.dcs0b80.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });  
  }
  
  cachegoose(mongoose, {
    port: 6379,
    host: 'localhost'
  });

  return connection;
}

module.exports = connectToDiagnosticDatabase;