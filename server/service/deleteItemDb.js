const deleteItemDb = async (database, itemID) => {
    const queryDelete = 'DELETE FROM book_list WHERE id = $1';
    const resultOfQueryDelete = await database.query(queryDelete, [itemID]);
    return resultOfQueryDelete.rowCount
}

export default deleteItemDb