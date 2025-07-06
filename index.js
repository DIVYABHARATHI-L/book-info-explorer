import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

//get file names
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//start express server
const app = express();
const PORT = process.env.PORT || 3000;

//use and set the server
//1.set the server to look for ejs file
app.set("view engine", "ejs");
//2.set the directory name for ejs files
app.set("views", path.join(__dirname,"views"));
//3.middleware to parse data
app.use(express.urlencoded({extended : true}));
//4.serve static files to middleware from public folder
app.use(express.static(path.join(__dirname,"public")));

//get request for home
app.get("/", (req,res)=>{
    res.render("home");
});

//post request to search book
app.post("/search", async(req,res)=>{
    const query = req.body.query;
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    try{
        const response = await axios.get(apiURL);
        const books = response.data.items || [];
        res.render("book", {books});
    }
    catch(error){
        console.error("API Error: ", error.message);
        res.render("book",{books: []});
    }
})

//to save to database
app.post("/save", async(req, res)=>{
    const {title, authors, publisher} = req.body;
    try {
        await pool.query(
            "INSERT INTO books (title, authors, publisher) VALUES ($1, $2, $3)",
            [title, authors, publisher]
        );
        res.redirect("/saved");
    }
    catch(err){
        console.error(err);
        res.send("Error in saving book");
    }
});

//to show saved books
app.get("/saved", async (req, res)=>{
    try{
        const result = await pool.query("SELECT * FROM books");
        res.render("saved", {books: result.rows});
    }
    catch(err){
        console.error(err);
        res.send("Error in retrieving saved books");
    }
});

//listen for request
app.listen(PORT, ()=>{
    console.log(`Server running on https://localhost:${PORT}.`);
});