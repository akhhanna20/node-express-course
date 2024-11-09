const { writeFile, readFile } = require("fs").promises;

async function writer() {
  try {
    // Writing three lines to 'temp.txt'
    await writeFile(
      "temp.txt",
      "I am a first line\nI am a second line\nI am a third line\n",
      "utf8"
    );
    console.log("File written successfully.");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
}

async function reader() {
  try {
    // Read the content of 'temp.txt'
    const data = await readFile("temp.txt", "utf8");
    console.log("File content:\n", data);
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

//call await reader and await writer
async function readWrite() {
  // Call the writer function
  writer();

  // Call the reader function
  reader();
}

readWrite();
