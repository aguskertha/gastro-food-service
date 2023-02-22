const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./../models/user.model');

module.exports = async (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
            const user = await User.findOne({ email: email });
            if(!user){
                return done(null, false, {message: 'That email is not registered'});
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return done(null, false, {message: 'Password incorect!'});
            }
            else{
                return done(null, user);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user)=>{
            done(err, user);
        });
    });
}