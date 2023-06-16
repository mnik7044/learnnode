const express = require("express");
const app = express();
const port = 8002;

const mongoose = require("mongoose")

const fs = require("fs")

//Connecting mongoose with nodejs

mongoose.connect("mongodb://127.0.0.1:27017/blog-app-1")
.then(() => console.log("Mongoose connected"))
.catch((err)=> console.log("Mongo error", err))



//Schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName:{
    type: String,
    required: false,
  },
  email:
  { type: String,
    required: true,
    unique: true,
  },
  job_title: {
    type: String,
  },
  gender: {
    type: String,
  }
})


const User = mongoose.model('user', userSchema)



//Middleware pluggins
app.use(express.urlencoded({extended:false}))

app.use((req,res,next) =>{
  console.log("hello from middlewarreee")
  next()
})

// Routes
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
      <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
      </ul>`;
    res.send(html);
  });

  
  //Rest apis
app.get("/api/users", async(req, res) => {
  const allDbUsers = await User.find({})
  return res.json(allDbUsers);
});

app

.route("/api/users/:id")

.get(async (req,res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404)
    return res.json(user);
})
.patch(async(req,res) => {
    //Edit user Id
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json({status: "succsess"})
})
.delete(async(req,res) => {
    //Delete user with id
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"})
})

app.post("/api/users", async(req,res)  =>{
    // Create a new user
    const body = req.body
   if(!body ||
    !body.first_name ||
    !body.last_name||
    !body.email||
    !body.gender||
    !body.job_title
    ) {
      return res.status(400).json({msg: "All fields are required"})
    }
    const result = await User.create({
      firstName:body.first_name,
      lastName:body.last_name,
      email:body.email,
      gender:body.gender,
      job_title:body.job_title
    })

    console.log(result)
    return res.status(201).json({msg: "success"})
})







app.listen(port, () => console.log(`Server started at port: ${port}`));
