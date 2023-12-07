import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import getJsonData from "./utils/getJsonData.js";
import saveEntryIntoData from "./utils/saveEntryIntoData.js";
import { v4 as uniqueID } from 'uuid';
import findMatchingID from "./utils/findMatchingID.js";
import db from "./database/databaseConfig.js";
import insertDataIntoDb from "./service/insertDataIntoDb.js";
import { handleExit } from "./service/handleExitSignals.js";
import isEmptyInput from "./utils/isEmptyInput.js";
import isInputRepeated from "./service/checkIsInputRepeated.js";
import queryAllContent from "./service/queryAllContent.js";

const app = express();
const port = 3000;

db.connect()

// Define paths: current file, client directory, current  directory, json file.
const __fileName = fileURLToPath(import.meta.url);
const __clientDir = path.resolve(__fileName, "../../client");
const __currentDir = path.dirname(__fileName);
const dataFilePath = path.join(__currentDir, "data.json");

// Serve static files from the client side
app.use(express.static(__clientDir));

// Set the view engine to ejs
app.set("view engine", "ejs");

// Set the views folder where the ejs files are located
app.set("views", path.join(__clientDir, "views"));

// Parse json data
app.use(express.json())

// Mount middlware to pass body data encoded on the url
app.use(bodyParser.urlencoded({ extended: true }));

let dataList = [];
const jsonData = getJsonData(dataFilePath);
dataList = jsonData;


const items = await queryAllContent(
    db, 
    "todo_list", 
    "content"
)

app.get("/", async (req, res) => {
    res.render("index.ejs", { items: items, errorMessage: "" });
});

app.post("/", async (req, res) => {
    const content = req.body.item.toLowerCase().trim();
    
    if (!isEmptyInput(req.body.item)) {
        
        try {
            // Create a new object when the user enters an item.
            const newItem = {
                id: uniqueID(),
                content: content,
                active: true
            };
            
            // Add the new item into the JSON file
            dataList.push(newItem);
            
            saveEntryIntoData(dataFilePath, dataList);
            
            // Check if the newItem already exists on the database
            const repeatedItems = await isInputRepeated(db, newItem.content)
            
            if (repeatedItems.length === 0) {
                const tableName = "todo_list";
                const columns = ["id", "content", "active"];
                const values = [newItem.id, newItem.content, newItem.active];

               // Wait for the database insertion to complete
                await insertDataIntoDb(db, tableName, columns, values);

                res.redirect("/")
            } else {
                res.render("index.ejs", { items: dataList, errorMessage: "This item already exists." })
            }

        } catch (err) {
            console.error('Error inserting item into database:', err);
            res.status(500).send('Error adding item');
        } 
    }
});

app.put("/updateItem/:itemID", (req, res) => {
    const itemID = req.params.itemID;
    const itemNewContent = req.body.content;
    const itemToBeUpdatedOnList = findMatchingID(dataList, itemID);

    if (itemToBeUpdatedOnList) {
        // Update the data on the dataList array
        itemToBeUpdatedOnList.content = itemNewContent;

        // Update the data in jsonData array
        saveEntryIntoData(dataFilePath, jsonData)

        res.json({ message: "Item updated successfully" });
    } else {
        res.status(404).json({ error: "Item not found" });
    }
})

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

// Cleanup tasks (close database) and exit the app properly.
handleExit(db, server)