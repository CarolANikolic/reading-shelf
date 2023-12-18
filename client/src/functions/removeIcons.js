const removeIcons = (documentText, itemsToRemove) => {

    itemsToRemove.forEach(item => {
        let existItemToRemove = documentText.includes(item);
        if (existItemToRemove) {
            documentText = documentText.replace(item, '');
        }
    });

    return documentText
}

export default removeIcons