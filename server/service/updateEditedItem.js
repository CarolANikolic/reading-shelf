const updateEditedItem = async (database, itemID, columnName, newContent) => {
    const queryUpdate = `UPDATE book_list SET ${columnName} = $1 WHERE id = $2`;
    const resultOfQueryUpdate = await database.query(queryUpdate, [newContent, itemID])

    return resultOfQueryUpdate.rowCount
}

export default updateEditedItem