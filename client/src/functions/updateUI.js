const updateUI = (items, itemIdentifier, actionFunction, keyword) => {
    items.forEach(item => {
        
        item.addEventListener("click", async () => {
            const listItem = item.closest([itemIdentifier]);
            const itemID = listItem.dataset.itemid;
            const updateAction = await actionFunction(itemID);

            if (listItem && updateAction) {
                
                if (keyword === "delete") {
                    listItem.remove();
                }
                
                if (keyword === "read") {
                    item.remove();
                    const doneRead = document.createElement("img");
                    doneRead.src = '../public/images/done-read.svg'; 
                    listItem.appendChild(doneRead);
                }
            }
            });
    });
};

export default updateUI