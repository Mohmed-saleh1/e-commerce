const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { reject, use } = require('bcrypt/promises');
const { boolean } = require('webidl-conversions');
const DB_URL = 'mongodb://127.0.0.1:27017/online-shop';

const userSchema = mongoose.Schema({

   username: String,
   email: String,
   password: String,
   confirmPassword: String,
   isAdmin: { type: Boolean, default: false }

})
const User = mongoose.model('user', userSchema)

exports.createNewUser = (username, email, password) => {

   mongoose.set('strictQuery', false);

   return new Promise((resolve, reject) => {
      mongoose.connect(DB_URL)
         .then(() => { return User.findOne({ email: email }) })   // check if the email already exists or not
         .then(user => {
            if (user) { mongoose.disconnect(), reject("email is used"); }
            else { return bcrypt.hash(password, 10) }
         })
         .then(hashedPassword => {
            let user = new User({ username: username, email: email, password: hashedPassword })
            return user.save()
         })
         .then(() => { resolve() })
         .catch(err => { reject(err) })
   })
}


exports.login = (email, password) => {
   return new Promise((resolve, reject) => {

      mongoose.set('strictQuery', false);

      mongoose.connect(DB_URL)
         .then(() => User.findOne({ email: email }))
         .then(user => {
            if (!user) { mongoose.disconnect(), reject('This email not registered ') }
            else return bcrypt.compare(password, user.password).then(same => {
               if (!same) {
                  mongoose.disconnect()
                  reject('password is incorrect')
               }
               else {
                  resolve({
                     id: user._id,
                     isAdmin: user.isAdmin
                  })
               }
            })
         })
         .catch(err => reject(err))
   })
}