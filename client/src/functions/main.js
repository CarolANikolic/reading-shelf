import updateItemContent from "./updateItemContent.js";
import updateUI from "./updateUI.js";

document.addEventListener("DOMContentLoaded", () => {
    const items = [...document.querySelectorAll("[data-itemid]")];

    updateItemContent(items);
    updateUI(items);
})