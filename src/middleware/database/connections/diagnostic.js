const mongoose = require('mongoose');
const cachegoose = require('cachegoose');


function connectToDiagnosticDatabase(){

  mongoose.set('strictQuery', true);
  
  mongoose.createConnection('mongodb+srv://omerald_diagnostic:q9YgAQtcyE5YUC2d@cluster0.ps6ksja.mongodb.net/diagnostic_centers_dev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  });
  

  cachegoose(mongoose, {
    port: 6379,
    host: 'localhost'
  });
  
  const connection = mongoose.connection;
  return connection;
}

module.exports = connectToDiagnosticDatabase;