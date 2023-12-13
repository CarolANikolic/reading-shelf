const updateUI = (items, itemIdentifier, actionFunction) => {
    items.forEach(item => {
        
        item.addEventListener("click", async () => {
                const listItem = item.closest([itemIdentifier]);
                const itemID = listItem.dataset.itemid;
                const updateAction = await actionFunction(itemID);

            if (listItem) {
                if (updateAction) {
                    listItem.remove();
                }
            }
            });
        });
};

export default updateUI
