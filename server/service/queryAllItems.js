
const queryAllItems = async (database, tableName) => {
    const queryAllItems = `SELECT * FROM ${tableName}`;
    const queryAllItemsResult = await database.query(queryAllItems);

    return queryAllItemsResult.rows;
}

export default queryAllItems;
