const { CodeError } = require('../middleware/CustomExceptions');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

exports.home = (req, res) => res.render('home', { layout: 'main'});

exports.signupPageRender = (req, res) => res.render('signup', { layout: 'main'});

exports.signupProcess = async (req, res) => {
    const { username, email, password: plainTextPassword} = req.body;

    if (typeof username !== 'string'){
        return res.json({ status: 'error', error: 'Invalid username'})
    }

    if (plainTextPassword.length < 8){
        return res.json({ status: 'error', error: 'Password should be more than 8 character long'})
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    let usernameExist;
    try{
        usernameExist = await User.findOne({ username});
    }catch (error){
        return res.json({ status: 'error', error: 'Something went wrong please try again'})
    }


    if (usernameExist){
        return res.json({ status: 'error', error: 'Username already taken. Try another one'})
    }

    let emailExist;

    try{
        emailExist = await User.findOne({ email});
    }catch (error){
        return res.json({ status: 'error', error: 'Something went wrong. Please try again'})
    }

    if (emailExist){
        return res.json({ status: 'error', error: 'User already exist. Try to login'})
    }

    try{
        const result = await User.create({
            username,
            email,
            password
        })

        console.log(result);
    }catch (error){
        return res.json({ status: 'error', error: 'Something went wrong. Please try again'})
    }

    res.json({ status: 'ok', message: `${username} you're successfully registered` })
}

exports.loginRender = ( req, res) => res.render('login', { layout: 'main'});