import fs from "fs";

const saveEntryIntoData = (entryArray, entry, jsonFilePath) => {
    entryArray.push(entry);
    fs.writeFileSync(jsonFilePath, JSON.stringify(entryArray), "utf-8");
}

export default saveEntryIntoData
