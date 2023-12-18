import updateErrorMessage from "./updateErrorMessage.js";
import removeIcons from "./removeIcons.js";

const filterItems = (filterButton, elementIdentifier, keyword, itemsToRemove) => {
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
            
            // Remove Icons from responseText
            responseText = removeIcons(responseText, itemsToRemove);

            if (filterResponse.ok) {
                // Update the DOM with the modified HTML
                document.documentElement.innerHTML = responseText; 
                updateErrorMessage(responseText, elementIdentifier, keyword);
            } 
        } catch (error) {
            console.log("Error displaying filtered items:", error);
        }
    });
};

export default filterItems;
