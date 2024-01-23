const HttpError = require("../models/http-error")
const User = require("../models/users")
const bodyParser = require('body-parser');
const {
    validationResult
} = require('express-validator')
const mongoose = require('mongoose');


const {
    Webhook
} = require("svix")


const getUsers = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findOne({
            creator: userId,
        });
    } catch (error) {
        const err = new HttpError("could not find user", 500)
        return next(err)
    }

    res.json({
        user: user.toObject({
            getters: true
        })
    })
}


// const signup = async (req, res, next) => {
//     const {
//         name,
//         email,
//         password,
//         pomo
//     } = req.body;

// const hasUser = DUMMY_USERS.find(u => u.email === email);
// if(hasUser) {
//     throw new HttpError("Could not create user, email already exists", 422)
// }

//     let existingUser
//     try {
//         existingUser = await User.findOne({
//             email: email
//         });
//     } catch (error) {
//         const err = new HttpError('Signing up failed, please try again laterr', 500)
//         return next(err)
//     }

//     if (existingUser) {
//         const error = new HttpError("User already exists please login in instead", 422)
//         return next(error)
//     }

//     const createdUser = new User({
//         name,
//         email,
//         password,
//         pomo
//     })
//     try {
//         await createdUser.save()
//     } catch (error) {
//         const err = new HttpError("Could not create user", 500)
//         next(err)
//     }
//     res.status(201).json({
//         user: createdUser.toObject({
//             getters: true
//         })
//     })
// }

// const login = async (req, res, next) => {
//     const {
//         email,
//         password
//     } = req.body;

//     let existingUser
//     try {
//         existingUser = await User.findOne({
//             email: email
//         });
//     } catch (error) {
//         const err = new HttpError('Loggin in failed, please Sign up', 500)
//         return next(err)
//     }

//     if (existingUser || existingUser.password !== password) {
//         const error = new HttpError(
//             'Invalid credentials, could not log you in', 401
//         )
//         return next(error)
//     }

//     res.json({
//         message: "Login successful"
//     })

// }

const createUser = async (firstname, hours, userId, next) => {
    const createdUser = new User({
        name: firstname,
        hours: hours,
        creator: userId
    })
    try {
        await createdUser.save()
    } catch (error) {
        const err = new HttpError("Could not create pomo", 500)
        next(err)
    }
}

const postInitialUser = async (req, res, next) => {
    const hours = 0

    try {
        const payload = JSON.stringify(req.body);
        const headers = req.headers;

        // Get the Svix headers for verification
        const svix_id = headers["svix-id"]
        const svix_timestamp = headers["svix-timestamp"]
        const svix_signature = headers["svix-signature"]

        // If there are missing Svix headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return new Response("Error occured -- no svix headers", {
                status: 400,
            });
        }


        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY)
        const evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        })
        const {
            id,
            first_name,
            primary_email_address_id
        } = evt.data;
        // Handle the webhook
        const eventType = evt.type;
        if (eventType === "user.created") {
            console.log(`User ${id} was ${eventType}`);
            console.log(`User ${first_name} was ${eventType}`);

            const createdUser = new User({
                hours: hours,
                name: first_name,
                creator: id,
                email: primary_email_address_id
            })
            await createdUser.save()
        }
        res.status(200).json({
            success: true,
            message: 'Webhook received'
        })

    } catch (error) {
        const err = new HttpError(error, 400)
        console.log(error)
        return next(err)


    }

    // res.status(200).json({
    //     success: true,
    //     message: 'Webhook received'
    // })

}


exports.getUsers = getUsers;
exports.postInitialUser = postInitialUser;
// exports.login = login;
// exports.signup = signup;