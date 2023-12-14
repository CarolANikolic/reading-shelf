const markAsRead = async (itemID) => {
    try {
        const response = await fetch(`/read/${itemID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });

        return response.ok;

    } catch (error) {
        console.log("Error marking item as read:", error);
        return false
    }
};

export default markAsRead