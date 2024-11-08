const { writeFile, readFile } = require("fs");

console.log("start");

writeFile("./temporary/fileB.txt", "This is line 1\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    writeFile(
      "./temporary/fileB.txt",
      "This is line 2\n",
      { flag: "a" },
      (err, result) => {
        console.log("at point 2");
        if (err) {
          console.log("This error happened: ", err);
        } else {
          writeFile(
            "./temporary/fileB.txt",
            "This is line 3\n",
            { flag: "a" },
            (err, result) => {
              console.log("at point 3");
              if (err) {
                console.log("This error happened: ", err);
              } else {
                console.log("done with this task");
              }
            }
          );
        }
      }
    );
  }
});
console.log("starting next task");
