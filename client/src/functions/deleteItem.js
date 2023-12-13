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

export default deleteItem