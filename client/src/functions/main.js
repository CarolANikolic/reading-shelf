import updateItemContent from "./updateItemContent.js";
import updateUI  from "./updateUI.js";
import deleteItem from "./deleteItem.js";

document.addEventListener("DOMContentLoaded", () => {
    const items = [...document.querySelectorAll("[data-itemid]")];
    const trashBin = document.querySelectorAll("li [data-itemdelete]");

    updateItemContent(items);
    updateUI(trashBin, "li[data-itemid", deleteItem);
});