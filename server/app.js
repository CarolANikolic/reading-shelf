import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import { v4 as uniqueID } from 'uuid';
import db from "./database/databaseConfig.js";
import insertDataIntoDb from "./service/insertDataIntoDb.js";
import { handleExit } from "./service/handleExitSignals.js";
import isEmptyInput from "./utils/isEmptyInput.js";
import checkIsInputRepeated from "./service/checkIsInputRepeated.js";
import queryAllItems from "./service/queryAllItems.js";
import updateEditedItem from "./service/updateEditedItem.js";
import deleteItemDb from "./service/deleteItemDb.js";
import checkItemActiveStatus from "./service/checkItemActiveStatus.js";

const app = express();
const port = 3000;

db.connect()

// Define paths: current file, client directory, current  directory, json file.
const __fileName = fileURLToPath(import.meta.url);
const __clientDir = path.resolve(__fileName, "../../client");

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


app.get("/", async (error, res) => {
    try {
        const items = await queryAllItems(db, "book_list");
        res.render("index.ejs", { items: items, errorMessage: "" });
    } catch (error) {
        console.log("Unable to query items:", error)
    }
});


app.post("/", async (req, res) => {
    const content = req.body.item;

    if (!isEmptyInput(content)) {
        try {
            const newItem = {
                id: uniqueID(),
                content: content,
                active: true
            };

            const repeatedItems = await checkIsInputRepeated(db, newItem.content);

            if (repeatedItems.length === 0) {
                const tableName = "book_list";
                const columns = ["id", "content", "active"];
                const values = [newItem.id, newItem.content, newItem.active];

                await insertDataIntoDb(db, tableName, columns, values);

                const updatedItems = await queryAllItems(db, "book_list");
                res.render("index.ejs", { items: updatedItems, errorMessage: "" });
            } else {
                res.render("index.ejs", { items: items, errorMessage: "This book already exists." });
            }

        } catch (err) {
            console.error('Error inserting item into database:', err);
            res.status(500).send('Error adding item.');
        }
    }
});


app.put("/updateItem/:itemID", async (req, res) => {
    const itemID = req.params.itemID;
    const itemNewContent = req.body.content;

    try {
        const isNewContentRepeated = await checkIsInputRepeated(db, itemNewContent);

        if (isNewContentRepeated.length === 0) {
            const editedItemResult = await updateEditedItem(db, itemID, "content", itemNewContent);

            if (editedItemResult !== 0 && isEmptyInput(itemNewContent) === false) {
                res.json({ errorMessage: "" });
                console.log("Book updated successfully.")
            } else {
                res.status(404).json({ errorMessage: "" });
                console.log("Item not found.")
            }
        } else {
            res.json({ errorMessage: "This book already exists." });
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: "Error updating item." });
    }
});


app.delete("/delete/:itemID", async (req, res) => {
    const itemID = req.params.itemID;

    try {
        await deleteItemDb(db, itemID);
        console.log("Item deleted successfully.");
        res.sendStatus(200); 
    } catch (error) {
        console.log("Item was not deleted:", error);
        res.status(500).send("Error deleting item.");
    }
});


app.put("/read/:itemID", async (req, res) => {
    const itemID = req.params.itemID;

    try {
        const itemStatus = await checkItemActiveStatus(db, "active", itemID);
        console.log(itemStatus)

        if (itemStatus === true) {
            await updateEditedItem(db, itemID, "active", false);
            console.log("Status is:", await checkItemActiveStatus(db, "active", itemID))
            console.log("Item marked as read successfully");
            res.sendStatus(200);

        } 
        
        if (itemStatus === false) {
            await updateEditedItem(db, itemID, "active", true);
            console.log("Status is:", await checkItemActiveStatus(db, "active", itemID))
            console.log("Item marked as read successfully");
            res.sendStatus(200);
        }
    } catch (error) {
        console.log("Failed updating active column:", error);
        res.status(500).send("Error marking item as read.")
    }
});


const server = app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

handleExit(db, server);