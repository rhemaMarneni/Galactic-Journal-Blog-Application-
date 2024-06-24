import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
<<<<<<< HEAD
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import flash from "connect-flash";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 sec * 1 min * 1 hour * 1 day
        httpOnly: true,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //for static files
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to expose flash messages to the views
app.use((req, res, next) => {
    res.locals.errorMessages = req.flash('error');
    next();
});

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
=======

const app = express();
const port = 3000;

let blogPosts = []

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Galactic Journal",
    password: "password",
    port: "5432"
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
})

db.connect();

<<<<<<< HEAD
async function getUserPosts(...args){
    try{
        let blogPosts = []
        let result;
        if(args.length > 0){
            const userID = args[0]
            result = await db.query("SELECT * FROM blogposts WHERE userid = $1 ORDER BY post_date LIMIT 15;",[userID]);
        }else{
            result = await db.query("SELECT * FROM blogposts ORDER BY post_date LIMIT 15;");
        }
        result.rows.forEach((post)=>{
            blogPosts.push(post);
        })
        return blogPosts;
    } catch(err){
        console.log(err)
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
=======

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //for static files

async function getUserPosts(user_id){
    const result = await db.query("SELECT * FROM blogposts WHERE user_id = $1",[user_id]);
    let blogPosts = []
    result.rows.forEach((post)=>{
        blogPosts.push(post);
    })
    return blogPosts;
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
}

//homepage
app.get("/", async (req,res)=>{
    try{
<<<<<<< HEAD
        const blogPosts = await getUserPosts();
        // console.log(blogPosts);
        res.render("index.ejs",{blogPosts:blogPosts, user: req.user, title:"Most Recent Posts"});
=======
        const blogPosts = await getUserPosts(1); 
        // console.log(blogPosts);
        res.render("index.ejs",{blogPosts:blogPosts});
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
    }
    catch(err){
        console.log(err);
    }
})

<<<<<<< HEAD
//login
app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

//register
app.get("/register",(req,res)=>{
    res.render("register.ejs")
})

//google auth - GET
app.get("/auth/google", passport.authenticate("google",{
    scope: ["profile","email"],
}))

app.get("/auth/google/galacticjournal", passport.authenticate("google",{
    successRedirect: "/",
    failureRedirect: "/login",
}))

//logout
app.get("/logout",(req,res)=>{
    req.logout(function(err){
        if(err){ return next(err)}
        res.redirect("/")
    })
})

//create page 
app.get("/create",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("create.ejs",{user: req.user})
    } else {
        res.redirect("/login")
    }
})

//userposts
app.get("/userposts",async (req,res)=>{
    if(req.isAuthenticated()){
        try{
            const userID = req.user.userid
            const blogPosts = await getUserPosts(userID);
            // console.log(blogPosts);
            res.render("index.ejs",{blogPosts:blogPosts, user: req.user, title:"Your Posts"});
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        res.redirect("/login")
    }
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true  // Enable flash messages for failure cases
}));

//register
app.post("/register", async (req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const pwd1 = req.body.password1
    const pwd2 = req.body.password2

    if (pwd1 === pwd2){
        try{
            const checkResult = await db.query("SELECT * FROM users WHERE email = $1",[email])
            if(checkResult.rows.length > 0){
                res.redirect("/login")
            } else {
                bcrypt.hash(pwd1, saltRounds, async(err,hash)=>{
                    if(err){
                        console.log("Error hashing the password",err)
                    } else{
                        const result = await db.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",[name,email,hash])
                        const user = result.rows[0]
                        req.login(user, (err)=>{
                            console.log("success")
                            console.log(user)
                            res.redirect("/")
                        })
                    }
                })
            }
        } catch(err){
            console.log(err)
        }
    } else{
        res.send("Passwords do not match")
    }
=======
//create page 
app.get("/create",(req,res)=>{
    res.render("create.ejs");
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
})

//create post
app.post("/createpost",async(req,res)=>{
<<<<<<< HEAD
    if(req.isAuthenticated()){
        try{
            const title = req.body.title;
            const desc = req.body.desc;
            const date = new Date();
            const userID = req.user.userid;
            // console.log(req.user)
            await db.query("INSERT INTO blogposts (post_title,post_desc,post_date,userid) VALUES ($1,$2,$3,$4)",[title,desc,date,userID]);
            res.redirect("/");
        }
        catch(err){
            console.log();
        }
    } else { res.redirect("/login") }
=======
    try{
        const title = req.body.title;
        const desc = req.body.desc;
        const date = new Date();
        await db.query("INSERT INTO blogposts (post_title,post_desc,post_date) VALUES ($1,$2,$3)",[title,desc,date]);

        res.redirect("/");
    }
    catch(err){
        console.log();
    }
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
})

//delete post
app.post("/deletepost", async(req,res)=>{
    try{
        const postId = req.body.postId;
        const confirmationStatus = req.body.confirmationStatus;
        if (confirmationStatus){
            await db.query("DELETE FROM blogposts WHERE post_id = $1",[postId]);
            res.redirect("/")
        }; 
    }
    catch(err){
        res.status(500).send("This post cannot be deleted. Please try again later.");
    }
})

//view post
app.post("/viewpost",async (req,res)=>{
    try{
        const postId = req.body.postId;
<<<<<<< HEAD
        const result = await db.query("SELECT * FROM blogposts WHERE post_id = $1",[postId]);
        const post = result.rows[0];
        // console.log(post)
        const postDate = new Date(post.post_date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        post.post_date = postDate.toLocaleDateString('en-US', options);
        const author = await db.query("SELECT * FROM users WHERE userid = $1",[post.userid])
        const authorResult = author.rows[0]
        // console.log(authorResult)
        let isAuthor = false;
        if(req.isAuthenticated()){//if user logged in, show 'edit' and 'delete' for own posts
            try{
                const currentUserID = req.user.userid
                isAuthor = (authorResult.userid === currentUserID) ? true: false
            } catch(err){
                console.log(err)
            }
        } 
        res.render("view.ejs",{post: post, author: authorResult.name, isAuthor: isAuthor});
    }
    catch(err){
        console.log(err)
=======
        const result = await db.query("SELECT * FROM blogposts WHERE post_id = $1 AND user_id = 1",[postId]);
        const post = result.rows[0];
        const postDate = new Date(post.post_date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        post.post_date = postDate.toLocaleDateString('en-US', options);
        res.render("view.ejs",{post: post});
    }
    catch(err){
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
        res.status(404).send("You've encountered the dreaded Error 404: Post not found!!");
    }
})

//edit post
app.post("/editpost",async (req,res)=>{
<<<<<<< HEAD
    if(req.isAuthenticated()){
        try{
            const postId = req.body.postId;
            const result = await db.query("SELECT * FROM blogposts WHERE post_id = $1 AND userid = $2",[postId, req.user.userid]);
            const post = result.rows[0];
            res.render("edit.ejs",{post: post});
        }
        catch(err){
            console.log(err)
            res.status(404).send("You've encountered the dreaded Error 404: Post not found!!");
        }
    } else { res.redirect("/login") }
=======
    try{
        const postId = req.body.postId;
        const result = await db.query("SELECT * FROM blogposts WHERE post_id = $1 AND user_id = 1",[postId]);
        const post = result.rows[0];
        res.render("edit.ejs",{post: post});
    }
    catch(err){
        res.status(404).send("You've encountered the dreaded Error 404: Post not found!!");
    }
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
})

//savepost
app.post("/savepost",async (req,res)=>{
    try{
        const postId = req.body.postId;
        const title = req.body.title;
        const desc = req.body.desc;
        const result = await db.query("UPDATE blogposts SET post_title = $1, post_desc = $2 WHERE post_id = $3 RETURNING *",[title,desc,postId]);
        const post = result.rows[0];
<<<<<<< HEAD
        res.redirect(307,"/viewpost")
=======
        res.render("view.ejs",{post:post});
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
    }
    catch(err){
        res.status(404).send("You've encountered the dreaded Error 404: Post not found!!");
    }
})

<<<<<<< HEAD
//authentication

//local
passport.use(
    "local",
    new Strategy(async function verify(username, password, cb) {
        if (!isValidEmail(username)) {
            return cb(null, false, { message: "Invalid email format" });
        }
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
          username,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                return cb(null, user);
              } else {
                return cb(null, false, { message: "Wrong password. Please retry with the correct password." });
              }
            }
          });
        } else {
          return cb(null, false, { message: "User does not exist" });
        }
      } catch (err) {
        console.log(err);
      }
    })
);   

//google
passport.use(
    "google",
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/galacticjournal",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb)=>{
        try{
            // console.log(profile)
            const result = await db.query("SELECT * FROM users WHERE email = $1",[profile.email])
            if (result.rows.length === 0){
                const newUser = await db.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",[profile.displayName, profile.email, "google"])
                return cb(null, newUser.rows[0])
            } else {
                return cb(null, result.rows[0])
            }
        }
        catch(err){
            console.log(err)
            return cb(err)
        }
    }
    )
)

passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

=======
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})