const filterItems = (filterButton, endpointName) => {
    filterButton.addEventListener("click", () => {
        try {
            filterButton.classList.add("filters__btn--active");
            fetch(`/${endpointName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            
        } catch (error) {
            console.log("Error filtering items:", error)
            
        }
    })
}

export default filterItems