const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ObjectID = require('mongodb').ObjectId;

const register = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        let errors = [];
        if(!name || !email || !password || !password2){
            errors.push({message: 'Please fill in all fields!'});
        }
        
        if(password !== password2){
            errors.push({message: 'Password not matched!'});
        }
        
        if(password.length < 6){
            errors.push({message: 'Password should be at least 6 characters!'});
        }

        if(errors.length > 0 ){
            return res.status(400).json(errors);
        }
        else{
            const user = await User.findOne({email: email});
            if(user){
                errors.push({message: 'User already exist!'});
                return res.status(400).json(errors);
            }
            else{
                const newUser = new User({name, email, password});
                bcrypt.hash(password, 10, async (err, hashedPassword) => {
                    if(err){
                        errors.push({message: err});
                        return res.status(400).json(errors);
                    }
                    else{
                        newUser.password = hashedPassword;
                        await newUser.save();
                        res.json({message: 'Success'});
                        // req.flash('success_msg', 'You are now registered and can login!');
                        // res.redirect('/users/login');
                    }
                })
            }
        }

    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-layout-no-nav',
            message: error,
            status: 400
        });
    }
}

const registerPage = async (req, res, next) => {
    try {
        res.render('User/register', {
            layout: 'layouts/main-layout-no-nav',
        })
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-layout-no-nav',
            message: error,
            status: 400
        });
    }
}

const login = async (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin/users/login',
            failureFlash: true
        })(req, res, next);
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-layout-no-nav',
            message: error,
            status: 400
        });
    }
}

const logout = async (req, res, next) => {
    try {
        req.logout((err) => {
            if (err) { return next(err); }
            req.flash('success_msg', 'You are logged out!');
            res.redirect('/admin/users/login');
        });
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-layout-no-nav',
            message: error,
            status: 400
        });
    }
}

const loginPage = async (req, res, next) => {
    try {
        res.render('User/login', {
            layout: 'layouts/main-layout-no-nav',
        })
    } catch (error) {
        res.render('error', {
            layout: 'layouts/main-layout-no-nav',
            message: error,
            status: 400
        });
    }
}

const getFormResetPassword = async (req, res, next) => {
    try{
        res.render('User/reset-password', {
            layout: 'layouts/main-layout',
            username: req.user.name,
            title: 'Reset Password'
        })
    }
    catch(error){
        res.render('error', {
            layout: 'layouts/main-layout-no-nav',
            message: error,
            status: 400
        });
    }
}
const resetPassword = async (req, res, next) => {
    try{
        if(!req.user){
            req.flash('error_msg', 'Login first');
            res.redirect(`/admin/users/login`)
        }
        const {password, newPassword, confirmNewPassword} = req.body;
        const user = await User.findOne({ _id: ObjectID(req.user._id) });
        if(!user){
            throw 'User Not Found!';
        }
        let errors = [];
        if(!password || !newPassword || !confirmNewPassword){
            errors.push({message: 'Please fill in all fields!'});
        }
        
        
        if(confirmNewPassword.length < 6 || newPassword.length < 6){
            errors.push({message: 'Password should be at least 6 characters!'});
        }
        else{
            if(newPassword !== confirmNewPassword){
                errors.push({message: 'Password not matched!'});
            }
        }

        if(errors.length > 0 ){
            res.render('User/reset-password', {
                layout: 'layouts/main-layout-no-nav',
                errors,
                password,
                newPassword,
                confirmNewPassword,
            });
        }
        else{
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                errors.push({message: 'Invalid Password!'});
                res.render('User/reset-password', {
                    layout: 'layouts/main-layout-no-nav',
                    errors,
                    password,
                    newPassword,
                    confirmNewPassword,
                });
            }
            else{
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                if (hashedPassword) {
                    await User.updateOne(
                        { _id: ObjectID(req.user._id) },
                        {
                            $set: {
                                password: hashedPassword
                            }
                        }
                    );
                    req.flash('success_msg', 'Password changed successfully!');
                    res.redirect(`/admin/dashboard`)
                }
            }
        }
    }
    catch(error){
        res.render('error', {
            layout: 'layouts/main-layout-no-nav',
            message: error,
            status: 400
        });
    }
}

module.exports = {
    loginPage,
    registerPage,
    register,
    login,
    logout,
    resetPassword,
    getFormResetPassword
}