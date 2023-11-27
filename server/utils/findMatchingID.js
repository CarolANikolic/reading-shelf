const findMatchingID = (collection, idToMatch) => {
    const matchingID = collection.find(item => item.id === idToMatch);

    return matchingID
}

export default findMatchingID