import express from 'express'
import { userController } from '../controllers/Users.js';
class Users {
    router;
    constructor() {
        this.router = express.Router();
        this.initializeSchema()
    }
    initializeSchema() {
     this.router.post('/login',userController.login)
     this.router.post('/signup',userController.signUp)

    }
}
export default new Users()