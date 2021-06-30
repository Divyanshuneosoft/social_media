import { postModel } from "../models/Posts.js"

class Posts {
    async addPost(req, res) {
        try {
            var posts = await postModel._model.create({ ...req.body, createdAt: new Date().toISOString(), creator: req.user._id, name: req.user.name })
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(201).send({
            message: "post created successfully",
            data: posts
        })
    }
    async getPosts(req, res) {
        try {
            const limit = 8;
            var pageNumber = parseInt(req.query.pageNumber ?? 0) * limit;
            var numberOfPages = await postModel._model.countDocuments({})
            var posts = await postModel._model.find().skip(pageNumber).limit(limit)
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(201).send({
            message: "Posts fetched sucessfully",
            data: posts,
            currentPage: parseInt(req.query.pageNumber ?? 1),
            numberOfPages: numberOfPages
        })
    }
    async getPostsByCreator(req, res) {
        try {
            var { name } = req.query.name;
            var posts = await postModel._model.find({ name: name })
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(200).send({
            message: `${name}'s post fetched successfully`,
            posts
        })
    }
    async getPost(req, res) {
        try {
            const { id } = req.query;
            var post = await postModel._model.findOne({ '_id': id }).lean()
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(200).send({
            message: "post fetched successfully",
            post
        })
    }
    async postLikes(req, res) {
        try {
            const { id } = req.query;
            const post = await postModel._model.findOne({ '_id': id }).lean()
            if (!post) {
                return res.status(400).send({
                    message: 'No Post with this id'
                })
            }
            const index = post.likes.findIndex(id => id.toString() === req.user._id.toString())
            if (index == -1) post.likes.push(req.user._id);
            else post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString())
            var updatedPost = await postModel._model.findOneAndUpdate({ '_id': post._id }, { '$set': { 'likes': post.likes } }, { new: true })
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(200).send({
            message: "updated post fetched successfully",
            updatedPost
        })
    }
    async addComment(req, res) {
        try {
            const id = req.body.id;
            const post = await postModel._model.findOne({ '_id': id }).lean()
            if (!post) {
                return res.status(400).send({
                    message: 'No Post with this id'
                })
            }
            post.comments.push({ comments: req.body.comments, addedBy: req.user._id })
            var updatedPost = await postModel._model.findOneAndUpdate({ '_id': id }, { '$set': { 'comments': post.comments } })
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(200).send({
            message: "updated post fetched successfully",
            updatedPost
        })
    }
    async updatePost(req, res) {
        try {
            let updatedPostObject = {};
            const id = req.body.id;
            const post = await postModel._model.findOne({ '_id': id }).lean()
            if (!post) {
                return res.status(400).send({
                    message: 'No Post with this id'
                })
            }
            for (let key in req.body) {
                if (key === '_id') continue;
                updatedPostObject[key] = req.body[key]
            }
            var updatedPost = await postModel._model.findOneAndUpdate({ '_id': id }, { '$set': updatedPostObject })
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(200).send({
            message: "post updated successfully",
            updatedPost
        })
    }
    async deletePost(req, res) {
        try {
           var post = await postModel._model.findOneAndDelete({'_id':req.query.id})
        } catch (error) {
            return res.status(503).send({
                message: "service unavailable"
            })
        }
        return res.status(200).send({
            message:"post deleted successfully",
            post
        })
    }
}
export let postController = new Posts()