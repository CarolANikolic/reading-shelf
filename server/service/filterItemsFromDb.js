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