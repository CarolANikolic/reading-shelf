<img src="client/public/images/screenshots/header.png" width=100% alt="header screenshot">

Reading Shelf is a personal project developed to explore PostgreSQL and NodeJS. The basic idea of the Reading Shelf is a CRUD (Create, Read, Update, Delete). It started as a To Do List, but I decided that for a To Do List would be more interesting to develop another project using some kind of data persistence like localStorage so that each user can have their own To Do List. Because of that, I decided to go with the idea of using books, like a book list. With Reading Shelf, you can add new books to the list, update existing titles, mark them as read, and delete them. You can also visualize it by category of all books, read, and to read. This is a list that is connected to a database, and is a generic list, meaning all users can see the same titles.

## Responsive Design

The design is created by me and it follows a mobile-first workflow, adapting to all screen sizes.

## Development Process

- Setting up the project starting files;
- Making the HTML structure for the landing page;
- Setting up the server side;
- Downloading the necessary dependencies;
- Creating a database and table in PostgreSQL;
- Connecting to the database;
- Handle database exit signals;
- Set up the necessary middleware;
- Define the paths to the client-side files;
- Setting up the server side with the methods and necessary endpoints;
- On the server side create a function to query all items;
- On the server side create a function to insert a new item into the database;
- Define a function to check if the input is repeated;
- Send a client request to edit an item;
- Send a client request to mark an item as read;
- Send a client request to delete an item;
- Testing all the requests;
- Send a server response to edited items;
- Send a server response to filtered items;
- Send a server response to a deleted item;
- Testing all the responses;
- On the client side create a function to update the UI after any alteration (delete, mark as to read or read);
- Testing all the requests;
- Adjusting the HTML structure as per necessity;
- Refactor the functions to separate the concerns and smoother reading and maintenance;
- Styling each component of the page and adding classes on HTML.

## Built with

- Semantic HTML5 markup;
- EJS
- JavaScript;
- Node.js;
- Express.js;
- PostgreSQL;
- Mobile-first workflow.

## Technologies and Tools

- [HTML5](https://html.com)
- [CSS3](https://www.w3.org/Style/CSS/)
- [JavaScript](https://www.javascript.com)
- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)

## Requirements

To work with the code, you will need, before you begin, to install on your machine: Node.Js, and Git and to have a source-code editor such as [VSCode](https://code.visualstudio.com).
You will also need to download all the dependencies used in this project by using this command in your terminal:

```
npm install
```

To run de project on your machine, open http://localhost:3000/ in your browser, and on the terminal use de following command:
```
npm start 
```

You can also set up and connect your database (databaseConfig.js).

## What I Learned

### The Differences between a SQL and a NoSQL database

- I learned the difference between SQL (Structured Query Language) and NoSQL(Not Only Structured Query Language). SQL is relational (establish relationships between tables) using primary and foreign keys to do so. It follows a defined structure, meaning the commands like query, update, insert, and delete data. And also need a predefined schema like the data types, the relationship between tables, etc. SQL scales vertically, by increasing the storage capacity of a single server. Even with the increase in storage capacity, there is a limit on how much a server can store information. So for companies and projects where the data to be stored follow a pattern and the quantity of data is managable, SQL may be the best approach.
A NoSQL is a more flexible database, it can hold different types of data like graphs, and each record (document, key-value pair, etc) can have its schema without affecting other documents in the same collection. NoSQL becomes the best approach for companies that deal with a lot of data in various formats that wouldn't adhere to a fixed structure and that would require higher performance (grow horizontally - add more servers to distribute the load).

### How to Set Up and Connect a PostgreSQL Database

~~~
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "bookList",
    password: "myPassword",
    port: 5432,
    application_name: "todoApp"
});

export default db
~~~

### How to close a PostgreSQL Database, Handling the Exit Signals Gracefully
- Instead of simply shutting down the database connection, it is interesting to listen for signals like a CLI (Ctrl + C) and log messages to follow the closing process.

~~~
const closeDb = (db) => {
    process.on('exit', () => {
        console.log('Cleanup: Closing database connection...');
        db.end(); 
    });
}

const handleExit = (db, server) => {
    ["SIGINT", "SIGTERM"].forEach(signal => {
        try {
            process.on(signal, () => {
                console.log(`Received ${signal} signal. Closing server...`);
                closeDb(db);
                console.log(`Exiting application...`)
                server.close()
                process.exit(0);
            })
        } 
        catch (err) {
            console.log(`Error during cleanup: ${err}.`)
            process.exit(1)
        } 
    })
};

export { closeDb, handleExit }
~~~

### Use the Structured Commands to Perform Actions in the Database
- QUERY ALL

~~~
   
const queryAllItems = async (database, tableName) => {
    const queryAllItems = `SELECT * FROM ${tableName}`;
    const queryAllItemsResult = await database.query(queryAllItems);

    return queryAllItemsResult.rows;
}

export default queryAllItems;

~~~

- INSERT DATA 

~~~
   
const insertDataIntoDb = async (db, tableName, columns, values) => {

    try {
        const query = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.map((_, i) => `$${i + 1}`).join(", ")})`;
        const result = await db.query(query, values);
        
        console.log(`Inserted data into ${tableName}`);
    } catch (err) {  
        console.error(`Error inserting data into ${tableName}:`, err);
        throw err; 
    } 
}

export default insertDataIntoDb;

~~~

- QUERY SPECIFIC DATA FOLLOWING A CONDITION 

~~~
   
const filterItemsFromDb = async (database, tableName, columnName, valueToFilter) => {
    try {
        const filterItems = `Select * FROM ${tableName} WHERE ${columnName} = $1`;
        const filterResult = await database.query(filterItems, [valueToFilter]);
        return filterResult.rows;

    } catch (error) {
        console.log("Error applying filter:", error);
        throw error
    }

}

export default filterItemsFromDb

~~~

- UPDATE DATA

~~~

const updateEditedItem = async (database, itemID, columnName, newContent) => {
    try {
        const queryUpdate = `UPDATE book_list SET ${columnName} = $1 WHERE id = $2`;
        const resultOfQueryUpdate = await database.query(queryUpdate, [newContent, itemID]);
        return resultOfQueryUpdate.rowCount

    } catch (error) {
        console.log("Error updating item:", error);
        throw error
    }
}

export default updateEditedItem

~~~

- DELETE DATA

~~~

const deleteItemDb = async (database, itemID) => {
    const queryDelete = 'DELETE FROM book_list WHERE id = $1';
    const resultOfQueryDelete = await database.query(queryDelete, [itemID]);
    return resultOfQueryDelete.rowCount
}

export default deleteItemDb

~~~

### Made with :heart: by [Caroline Almeida Nikolic](https://www.linkedin.com/in/carolinealmeidanikolic/)