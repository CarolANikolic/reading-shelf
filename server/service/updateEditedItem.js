const updateEditedItem = async (database, itemID, newContent) => {
    const queryUpdate = 'UPDATE book_list SET content = $1 WHERE id = $2';
    const resultOfQueryUpdate = await database.query(queryUpdate, [newContent, itemID])

    return resultOfQueryUpdate.rowCount
}

export default updateEditedItem