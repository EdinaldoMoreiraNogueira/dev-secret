const mongoose = require('mongoose');

let coon = null;

const URI = 'mongodb+srv://edinaldo:69xKuhFRJibbDu4z@cluster0.l7tqg.mongodb.net/edinaldo?retryWrites=true&w=majority';

module.exports = async () => {
    if(!coon){
         coon = mongoose.connect(URI, {
             useNewUrlParser: true,
             useCreateIndex: true

         });
    
        return await coon
        
        }
} 