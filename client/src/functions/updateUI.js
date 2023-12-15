const updateUI = (items, itemIdentifier, actionFunction, keyword) => {
    items.forEach(item => {
        
        item.addEventListener("click", async () => {
            const listItem = item.closest([itemIdentifier]);
            const itemID = listItem.dataset.itemid;
            const updateAction = await actionFunction(itemID);

            if (listItem && updateAction) {
                
                if (keyword === "delete") {
                    listItem.remove();
                } else if (keyword === "done") {
                    item.remove();
                    const doneRead = document.createElement("img");
                    doneRead.src = "../public/images/done-read.svg"; 
                    listItem.appendChild(doneRead);
                } else if (keyword === "toRead") {
                    item.remove();
                    const itemToRead = document.createElement("img");
                    itemToRead.src = "../public/images/icon-read.svg"; 
                    itemToRead.setAttribute("data-itemread", "read")
                    listItem.appendChild(itemToRead);
                }
            }
            });
    });
};

export default updateUI