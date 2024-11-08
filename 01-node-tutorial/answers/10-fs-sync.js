const { readFileSync, writeFileSync, writeFile } = require("fs");

const first = readFileSync("./content/first.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");

writeFileSync("./temporary/fileA.txt", `${first}.\n`);

writeFileSync("./temporary/fileA.txt", `${second}.\n`, { flag: "a" });
writeFileSync("./temporary/fileA.txt", `Hello this is third text file.\n`, {
  flag: "a",
});

const result = readFileSync("./temporary/fileA.txt", "utf-8");
console.log(result);
