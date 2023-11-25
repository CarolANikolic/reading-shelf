import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

// Define paths: current file, client directory, current  directory, json file.
const __fileName = fileURLToPath(import.meta.url);
const __clientDir = path.resolve(__fileName, "../../client");
const __currentDir = path.dirname(__fileName);
const dataFilePath = path.join(__currentDir, "data.json");

// Set the view engine to ejs
app.set("view engine", "ejs");

// Define the views folder where your ejs files are located
app.set("views", `${__clientDir}`);

// Mount middlware to pass body data encoded on the url
app.use(bodyParser.urlencoded({ extended: true }));

let dataList = [];

// Check if my json file exists.
if (fs.existsSync(dataFilePath)) {
    // Read the json file
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    // Save the content of json file in my variable.
    dataList = JSON.parse(jsonData);
}

app.get("/", (req, res) => {
    res.render("index.ejs", { items: dataList });
});

app.post("/", (req, res) => {
    // Create a new object when the user enter an item.
    const newItem = {
        content: req.body.item,
        active: true
    };
    
    // Add the new item into json file
    dataList.push(newItem);
    fs.writeFileSync(dataFilePath, JSON.stringify(dataList), "utf-8");
    
    // Render on the home page the list with the new item
    res.render("index.ejs", { items: dataList });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
