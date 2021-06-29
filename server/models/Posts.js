import mongoose from 'mongoose';
class Posts {
    _model
    postsSchema
    constructor() {
        this.initializeSchema()
        this._model = mongoose.model('PostMessage',this.postsSchema)
    }
    initializeSchema() {
        this.postsSchema = new mongoose.Schema({
            title: String,
            message: String,
            fileUrl:String,
            name: String,
            creator: mongoose.Types.ObjectId,
            tags: [String],
            likes: { type: Object,default:[] },
            comments: { type: Object,default:[] },
            createdAt:{
                type:Date,
                default:new Date()
            }
        })
    }
}
export let postModel = new Posts()