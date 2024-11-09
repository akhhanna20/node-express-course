const { writeFile, readFile } = require("fs").promises;

//Write first line to temp.txt
writeFile("temp.txt", "I am a first line\n", "utf8")
  .then(() => {
    // Write the second line, returning the promise to allow chaining
    console.log("Second line written successfully.");
    return writeFile("temp.txt", "I am a second line\n", { flag: "a" }, "utf8");
  })
  // Write the third line, returning the promise to allow chaining
  .then(() => {
    console.log("Third line written successfully.");
    return writeFile("temp.txt", "I am a third line\n", { flag: "a" }, "utf8");
  })
  .then(() => {
    // Read the file after all lines have been written
    return readFile("temp.txt", "utf8");
  })
  .then((data) => {
    // Log the file contents to the console
    console.log("File content:\n", data);
  })
  .catch((error) => {
    console.log("Error writing to file:", error);
    console.error("Error writing to file:", error);
  });
