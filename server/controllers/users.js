const HttpError =require("../models/http-error")

const DUMMY_USERS = [
    { name: 'mohamed saleh',
    id: "u1",
    email : "testing@gmail.com",
    password: "testing"
}
]


const getUsers = (req, res, next) => {
res.json({users: DUMMY_USERS})
}


const signup = (req, res, next) => {
    const {name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser) {
        throw new HttpError("Could not create user, email already exists", 422)
    }

    const createdUser = {
        id: Math.random() * 100,
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser)
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