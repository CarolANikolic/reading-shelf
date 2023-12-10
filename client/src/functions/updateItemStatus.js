const deleteItem = async (itemID, value) => {
    try {
        const response = await fetch(`/delete/${itemID}`, {
            method: "DELETE",  
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { property: value})
        });

    } catch (error) {
        console.log("Error deleting item:", error);
    }
}

const updateItemStatus = () => {  
    const items = [...document.querySelectorAll("[data-itemid]")];

    items.forEach(item => {
        const itemID = item.dataset.itemid;

        item.addEventListener("change", async () => {
            let status;

            if (item.checked) {
                status = false; 
            } else {
                status = true;
            }

            await deleteItem(itemID, "active", status);          
        });
    });
};

export default updateItemStatus;
