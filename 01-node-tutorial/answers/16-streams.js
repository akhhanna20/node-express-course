const { createReadStream } = require("fs");

// Initialize a counter for the number of chunks
let chunkCount = 0;

// Create a read stream with specified encoding and highWaterMark
const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

// Set up an event listener for "data" to read chunks from the stream
stream.on("data", (chunk) => {
  chunkCount++; // Increment the counter for each chunk received
  console.log(`Received ${chunkCount} chunks`);
});

// Handle the "end" event to report the number of chunks received
stream.on("end", () => {
  console.log("All chunks have been received. Total chunks:", chunkCount);
});

// Handle any errors that might occur
stream.on("error", (error) => {
  console.error("An error occurred while reading the file:", error);
});
