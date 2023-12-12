const deleteItem = async (itemID) => {
    try {
        const response = await fetch(`/delete/${itemID}`, {
            method: "DELETE",  
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.ok;
    } catch (error) {
        console.log("Error deleting item:", error);
        return false;
    }
}

const updateUI = (items, itemIdentifier) => {

items.forEach(item => {
    
    item.addEventListener("click", async () => {
            const listItem = item.closest([itemIdentifier]);
            const itemID = listItem.dataset.itemid;
            const deleted = await deleteItem(itemID);

        if (listItem) {
            if (deleted) {
                listItem.remove();
            }
        }
        });
    });
};

export default updateUI;
