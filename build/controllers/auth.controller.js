"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.signUp = void 0;
const models_1 = require("../models");
const validators_1 = require("../validators");
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../middlewares/errors");
const bcrypt_1 = require("../utils/bcrypt");
const helpers_1 = require("../helpers");
const env_config_1 = __importDefault(require("../config/env.config"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validators_1.validateUser)(req.body);
    const { name, email, password } = req.body;
    const existingUser = yield models_1.User.findOne({ where: { email } });
    if (existingUser) {
        throw new errors_1.CustomError('Email already exists', http_status_1.default.BAD_REQUEST);
    }
    // If the email is not found, create a new user
    const newUser = yield models_1.User.create({ name, email, password });
    const payload = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
    const token = (0, helpers_1.generateToken)(payload, env_config_1.default.secret);
    res.cookie('token', token, { httpOnly: true });
    res.status(http_status_1.default.CREATED).json(payload);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validators_1.validateSignedInUsers)(req.body);
    const { email, password } = req.body;
    const user = yield models_1.User.findOne({ where: { email } });
    if (!user) {
        throw new errors_1.CustomError('User not found', http_status_1.default.NOT_FOUND);
    }
    if (!(0, bcrypt_1.compare)(password, user.password)) {
        throw new errors_1.CustomError('Invalid credentials', http_status_1.default.UNAUTHORIZED);
    }
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    };
    const token = (0, helpers_1.generateToken)(payload, env_config_1.default.secret);
    res.cookie('token', token, { httpOnly: true });
    res.json({ user: payload, token });
});
exports.signIn = signIn;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Sign-out request received');
    res.clearCookie('token');
    res.status(http_status_1.default.OK).json({ message: 'User signed out' });
    console.log('Sign-out response sent');
});
exports.signOut = signOut;
// To send the token from the server to the frontend team so that they can store it in local storage, you can include the token in the JSON response sent from the server. Here's an example of how you can modify your server-side code to achieve this:
// javascript
// Copy code
// const token = generateToken(payload, envConfig.secret);
// // Sending the token in the response to the frontend team
// res.json({ user: payload, token });
// In this code snippet, after generating the token using the generateToken function, you include it in the JSON response object. When the frontend team receives the response on the client-side, they can extract the token from the JSON response and store it in the local storage using JavaScript.
// On the frontend side (in a JavaScript file or script tag in your HTML file), you can handle the response and store the token in local storage like this:
// javascript
// Copy code
// // Assuming you make a fetch or XMLHttpRequest to the server and get the response object
// fetch('your-api-endpoint')
//   .then(response => response.json())
//   .then(data => {
//     // Extract the token from the response
//     const token = data.token;
//     // Store the token in local storage
//     localStorage.setItem('token', token);
//     // Now, the token is stored in local storage and can be used as needed
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// In this example, the localStorage.setItem('token', token) line stores the received token in the local storage of the user's 
// browser. From this point, the frontend team can access the token from local storage and use it in subsequent requests to the server for authentication or other purposes.
//# sourceMappingURL=auth.controller.js.map