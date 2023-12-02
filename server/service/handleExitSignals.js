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