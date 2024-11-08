//Load the path module
const path = require("path");

console.log(path.sep);

// Use path.join() to join strings into a file path
const filePath = path.join("/content/", "subfolder", "test.txt");
console.log("filePath:", filePath);

// Use path.basename() to get the file name
const base = path.basename(filePath);
console.log("base:", base);

// Use path.join() to join strings into a file path
const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt");
console.log("absolute:", absolute);
