const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.HOST;

(async ()=>{
    await mongoose.connect(url, {
        useNewUrlParser:true,
        useUnifiedTopology: true
      }).then( () => console.log('connected to MONGO'))
      .catch(err => console.log(err))
})();
