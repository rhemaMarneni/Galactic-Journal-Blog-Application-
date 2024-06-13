import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

let blogPosts = []

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Galactic Journal",
    password: "password",
    port: "5432"
})

db.connect();


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
}

//homepage
app.get("/", async (req,res)=>{
    try{
        const blogPosts = await getUserPosts(1); 
        // console.log(blogPosts);
        res.render("index.ejs",{blogPosts:blogPosts});
    }
    catch(err){
        console.log(err);
    }
})

//create page 
app.get("/create",(req,res)=>{
    res.render("create.ejs");
})

//create post
app.post("/createpost",async(req,res)=>{
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
        const result = await db.query("SELECT * FROM blogposts WHERE post_id = $1 AND user_id = 1",[postId]);
        const post = result.rows[0];
        const postDate = new Date(post.post_date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        post.post_date = postDate.toLocaleDateString('en-US', options);
        res.render("view.ejs",{post: post});
    }
    catch(err){
        res.status(404).send("You've encountered the dreaded Error 404: Post not found!!");
    }
})

//edit post
app.post("/editpost",async (req,res)=>{
    try{
        const postId = req.body.postId;
        const result = await db.query("SELECT * FROM blogposts WHERE post_id = $1 AND user_id = 1",[postId]);
        const post = result.rows[0];
        res.render("edit.ejs",{post: post});
    }
    catch(err){
        res.status(404).send("You've encountered the dreaded Error 404: Post not found!!");
    }
})

//savepost
app.post("/savepost",async (req,res)=>{
    try{
        const postId = req.body.postId;
        const title = req.body.title;
        const desc = req.body.desc;
        const result = await db.query("UPDATE blogposts SET post_title = $1, post_desc = $2 WHERE post_id = $3 RETURNING *",[title,desc,postId]);
        const post = result.rows[0];
        res.render("view.ejs",{post:post});
    }
    catch(err){
        res.status(404).send("You've encountered the dreaded Error 404: Post not found!!");
    }
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})