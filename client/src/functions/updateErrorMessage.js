const updateErrorMessage = (response, elementIdentifier, keyword) => {

const existsFilteredItems = response.includes(elementIdentifier);
const errorMessage = document.querySelector(".errorMessage")

    if (!existsFilteredItems) {
        const errorMessage = document.querySelector(".errorMessage");
        if (keyword === "read") {
            errorMessage.textContent = "You don't have any read titles.";
        }
    } else {
        errorMessage.textContent = "";
    }
}

export default updateErrorMessage
