"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helpers_1 = require("../helpers");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', (0, helpers_1.use)(auth_controller_1.signUp));
authRouter.post('/signin', (0, helpers_1.use)(auth_controller_1.signIn));
authRouter.post('/signout', (0, helpers_1.use)(auth_controller_1.signOut));
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map