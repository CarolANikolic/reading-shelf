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


const updateUI = (items) => {

    items.forEach(item => {
        const itemID = item.dataset.itemid;

        item.addEventListener("change", async () => {
            const deleted = await deleteItem(itemID);

            if (deleted) {
                item.parentNode.removeChild(item);
            }
        });
    });
};

export default updateUI;
