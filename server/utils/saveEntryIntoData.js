import fs from "fs";

const saveEntryIntoData = (jsonFilePath, jsonFile) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonFile, null, 2));
}

export default saveEntryIntoData
