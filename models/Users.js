const mongoose = require('mongoose');
//Same as const Schema = mongoose.Schema;
//ES2015 or ES6 destructuring
//mongoose is restricting mongo's schemaless feature
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});
//telling mongoose to create a new collection for user
mongoose.model('users', userSchema);
