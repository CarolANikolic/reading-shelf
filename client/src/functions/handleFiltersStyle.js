// Remember which of the filters button was clicked to keep the active style even after the page is reloaded or revisited
const handleFiltersStyle = () => {
    const filters = [...document.querySelectorAll(".filters__btn")];

    filters.forEach(filter => {

        filter.classList.remove("filters__btn--active");

        filter.addEventListener("click", () => {

            // Store the clicked button's ID in localStorage
            localStorage.setItem("activeButtonId", filter.id);
        });

        // Set the active class based on localStorage on page load
        const activeButtonId = localStorage.getItem("activeButtonId");
        if (activeButtonId === filter.id) {
            filter.classList.add("filters__btn--active");
        }
    });
};

export default handleFiltersStyle;
