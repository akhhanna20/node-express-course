console.log(__dirname);

setInterval(() => {
  console.log("MY_VAR:", process.env.MY_VAR);
}, 1000);
console.log(`I will run first`);

console.log("__filename:", __filename);

setTimeout(() => {
  console.log("hello world");
}, 1000);

console.log("process.platform:", process.platform);
