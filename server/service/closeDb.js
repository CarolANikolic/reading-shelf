const closeDb = (db, server) => {
    process.on('exit', () => {
        console.log('Closing database connection...');
        db.end(); 
    });
}

export default closeDb

