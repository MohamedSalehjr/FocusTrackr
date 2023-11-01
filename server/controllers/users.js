const HttpError =require("../models/http-error")
const User = require("../models/users")





const getUsers = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try {
         user = await User.find({creator:userId});
    } catch (error) {
        const err = new HttpError("could not find user", 500)
        return next(err)
    }

    res.json({user: user.map(user => user.toObject({getters:true}))})
}


const signup = async (req, res, next) => {
    const {name, email, password, pomo } = req.body;

    // const hasUser = DUMMY_USERS.find(u => u.email === email);
    // if(hasUser) {
    //     throw new HttpError("Could not create user, email already exists", 422)
    // }

    let existingUser
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
       const err = new HttpError('Signing up failed, please try again laterr', 500)
       return next(err)
    }

    if(existingUser){
        const error = new HttpError("User already exists please login in instead",422)
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        password,
        pomo
    })
    try {
       await createdUser.save() 
    } catch (error) {
        const err = new HttpError("Could not create user", 500)
        next(err)
    }
    res.status(201).json({user: createdUser.toObject({getters:true})})
}

const login = async (req, res, next) => {
    const {email, password } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
       const err = new HttpError('Loggin in failed, please Sign up', 500)
       return next(err)
    }

    if(existingUser || existingUser.password !== password){
        const error = new HttpError(
            'Invalid credentials, could not log you in', 401
        )
        return next(error)
    }

    res.json({message: "Login successful"})

}


exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;