const filterItems = (filterButton, elementIdentifier, keyword) => {
    filterButton.addEventListener("click", async () => {
        try {
            const filterResponse = await fetch(`/filter`, {
                method: "GET",
                headers: {
                    "Content-Type": "text/html" // Requesting HTML response
                }
            });

            // Get HTML response as text
            let responseText = await filterResponse.text(); 

            if (filterResponse.ok) {
                // Update the DOM with the modified HTML
                document.documentElement.innerHTML = responseText; 
            } 
        } catch (error) {
            console.log("Error displaying filtered items:", error);
        }
    });
};

export default filterItems;
