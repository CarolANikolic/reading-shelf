const checkItemActiveStatus = async (database, columnName, itemID) => {
    const queryStatus = `SELECT ${columnName} FROM book_list WHERE id = $1`;
    const resultOfQueryStatus = await database.query(queryStatus, [itemID]);

    if (resultOfQueryStatus.rows.length > 0) {
        return resultOfQueryStatus.rows[0][columnName];
    }

    return null; 
}

export default checkItemActiveStatus;
