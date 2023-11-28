const updateItemContent = () => {
    const editableItems = [...document.querySelectorAll("[data-itemid]")];

    editableItems.forEach(item => {
        const currentContent = item.innerText;

        item.addEventListener("blur", () => {
            const itemID = item.dataset.itemid;
            const itemNewContent = item.innerText;

            // Dont send request if there is no actual change (e.g. user just clicked and made the input field focus)
            if (currentContent !== itemNewContent) {
            
            // Send a request to the server to update the item
                fetch(`/updateItem/${itemID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({content: itemNewContent})
                })
                .then(response => response.json())
                .then(updatedItem => console.log('Item updated:', updatedItem))
                .catch(error => console.log("Error updating item:", error))
            }
        })
    }); 
}

export default updateItemContent