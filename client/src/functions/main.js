import updateItemContent from "./updateItemContent.js";
import updateUI  from "./updateUI.js";
import deleteItem from "./deleteItem.js";
import markAsRead from "./markAsRead.js";

document.addEventListener("DOMContentLoaded", () => {
    const items = [...document.querySelectorAll("[data-itemid]")];
    const trashBins = [...document.querySelectorAll("li [data-itemdelete]")];
    const readIcons = [...document.querySelectorAll("li [data-itemread]")];
    const doneIcons = [...document.querySelectorAll("li [data-itemdone]")];

    updateItemContent(items);
    updateUI(trashBins, "li[data-itemid]", deleteItem, "delete");
    updateUI(readIcons, "li[data-itemid]", markAsRead, "done");
    updateUI(doneIcons, "li[data-itemid]", markAsRead, "toRead");
    
});