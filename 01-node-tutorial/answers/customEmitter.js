const EventEmitter = require("events");

// Create an instance of EventEmitter
const emitter = new EventEmitter();

//Event without parameters
emitter.on("start", (mesage) => {
  console.log("Start event received:", mesage);
});
emitter.emit("start", "Hello World!");

//Event with parameters
emitter.on("response", (name, id) => {
  console.log(`Data recieved user ${name} with id:${id}`);
});
emitter.emit("response", "Anna", Date.now());

//async function that waits on an event
const waitForEvent = () => {
  console.log("Waiting for an event...");
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};
const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is: ", msg);
};
doWait();
emitter.emit("happens", "Hello World!");

//event with timer
setInterval(() => {
  emitter.emit("timer", "I am a timer");
}, 2000);
emitter.on("timer", (msg) => console.log(msg));
