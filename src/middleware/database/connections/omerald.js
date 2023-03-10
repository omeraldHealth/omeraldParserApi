const mongoose = require('mongoose');
const cachegoose = require('cachegoose');

let connection;

function connectToOmeraldDatabase(){

  mongoose.set('strictQuery', true);
  
  if(!connection){
    connection = mongoose.createConnection("mongodb+srv://omerald:WGSCcf0aQKFrhs7A@cluster0.52olk.mongodb.net/omerald_backend?retryWrites=true&w=majority", {
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

module.exports = connectToOmeraldDatabase;