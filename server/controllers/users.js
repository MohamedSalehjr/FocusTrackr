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
    const {creator, name, email, password } = req.body;

    // const hasUser = DUMMY_USERS.find(u => u.email === email);
    // if(hasUser) {
    //     throw new HttpError("Could not create user, email already exists", 422)
    // }

    const createdUser = new User({
        name,
        email,
        password,
        creator
    })
    try {
       await createdUser.save() 
    } catch (error) {
        const err = new HttpError("Could not create user", 500)
        next(err)
    }
    res.status(201).json({user: createdUser})
}

const login = (req, res, next) => {
    const {email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email == email)
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Could not identify user credentials", 401);
    }

    res.json({message: "Login successful"})

}


exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;