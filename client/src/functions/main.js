import updateItemContent from "./updateItemContent.js";
import updateUI from "./updateUI.js";

document.addEventListener("DOMContentLoaded", () => {
    const items = [...document.querySelectorAll("[data-itemid]")];
    const trashBin = document.querySelectorAll("li [data-itemdelete]");
    const readItems = document.querySelectorAll("li [data-itemread]");

    updateItemContent(items);
    updateUI(trashBin, "li[data-itemid");

})