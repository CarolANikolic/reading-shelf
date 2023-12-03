import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todoList",
    password: "Bazingadatabase$",
    port: 5432,
    application_name: "todoApp"
});

export default db