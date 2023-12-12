const checkIsInputRepeated = async (db, valueToCompare) => { 
    try {
        const queryForRepeatedValue = 'SELECT * FROM book_list WHERE LOWER(TRIM(content)) = LOWER(TRIM($1))';
        const resultForRepeatedValue = await db.query(queryForRepeatedValue, [valueToCompare])
        return resultForRepeatedValue.rows
    } catch (error) {
        console.log("Error while querying repeated value:", error)
        throw error
    }
}

export default checkIsInputRepeated