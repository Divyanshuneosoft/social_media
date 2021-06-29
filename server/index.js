import express from 'express';
import mongoose from 'mongoose';
import { postsRoute } from './routes/Posts.js';
import cors from 'cors';
import usersRoute from './routes/Users.js';
class App {
    app = express()
    constructor() {
        this.onInit()
    }
    onInit() {
      const port = process.env.PORT || 5000;
      this.app.listen(port,()=>{
          console.log(`port is connected on ${port}`)
      })
      this.app.use(cors())
      this.app.use(express.json())
      mongoose.connect('mongodb+srv://nativmd:nativmd@cluster0.ihdmj.mongodb.net/posts?retryWrites=true&w=majority',{
          useUnifiedTopology:true,
          useNewUrlParser:true,
          useFindAndModify:false
      })
      .then(()=>{
          console.log(`mongodb is connected successfully`)
      })
      .catch(error=>{
          console.log(error)
      })
      this.app.use('/api/user',usersRoute.router)
      this.app.use('/api/post',postsRoute.router)

    } 
}
export default new App()