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
