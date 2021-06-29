import mongoose from 'mongoose';
class Users {
    userSchema;
    _model;
    constructor() {
        this.initializeSchema()
        this._model = mongoose.model('Users', this.userSchema)
    }
    initializeSchema() {
        this.userSchema = new mongoose.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            id:{type:String }
        })
    }
    async findUser(filter,selection){
        try {
          var user = await this._model.findOne(filter,selection).lean()
        } catch (error) {
           throw error 
        }
        return user
    }
}
export let userModel = new Users()