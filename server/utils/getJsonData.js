import fs from "fs";

const getJsonData = (jsonFilePath) => {
    if (fs.existsSync(jsonFilePath)) {
        // Read the json file
        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        // Save the content of json file in my variable.
        const myData = JSON.parse(jsonData);

        return myData
    }
}

export default getJsonData

