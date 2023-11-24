import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

const __fileName = fileURLToPath(import.meta.url);
const __clientDir = path.resolve(__fileName, "../../client");

// Set the view engine to ejs
app.set("view engine", "ejs");

// Define the views folder where your ejs files are located
app.set("views", `${__clientDir}`);

app.get("/", (re, res) => {
    res.render("index.ejs");
})

app.listen({port}, () => {
    console.log(`Server running on port ${port}.`)
})