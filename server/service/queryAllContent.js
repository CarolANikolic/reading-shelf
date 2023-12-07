const queryAllContent = async (database, tableName, fieldToQuery) => {
    const queryAllItems = `SELECT ${fieldToQuery} FROM ${tableName}`;
    const queryAllItemsResult =  await database.query(queryAllItems);

    return queryAllItemsResult.rows
}

export default queryAllContent
