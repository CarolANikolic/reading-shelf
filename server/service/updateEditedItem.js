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