const { Schema, model } = require('mongoose');

const personSchema = new Schema({
  nickname: { 
    type: String,  
    unique : true,  
    trim: true,
    dropDups: true,
    required: [true, 'Nickname required']
  },
  pass: {
    type: String,  
    required: [true, 'Password required'], 
    validate(value) {
      if (value.includes(' ')) {
        throw new Error("Password must not include spaces.")
      }
      if (value.length < 8) {
        throw new Error("Password is too short. At least 8 characters.")
      } 
      if (value.length > 20) {
        throw new Error("Password is too long. Max: 20 characters.")
      }
    }
  },
  photo: String
});

module.exports = model('person', personSchema);
