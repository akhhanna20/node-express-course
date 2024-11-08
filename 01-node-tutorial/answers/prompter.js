const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let targetNumber = Math.floor(Math.random() * 100) + 1;
let feedback = "Guess a number between 1 and 100.";
let userGuess = "";
let attemptCount = 0;
let isGameOver = false; // Flag to track if the game is over

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <h1>Guessing Game</h1>
   <p>Attempt count: ${attemptCount}</p>
   <p>${feedback}</p>
  <form method="POST">
    <label>Enter your guess: </label>
  <input name="guess" type="number" value="${userGuess}" ${
    isGameOver ? "disabled" : ""
  }></input>
  <button type="submit"  ${isGameOver ? "disabled" : ""}>Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["guess"]) {
        userGuess = parseInt(body["guess"], 10);
        attemptCount++; // Increment the attempt counter
        if (userGuess < targetNumber) {
          feedback = "Too low. Guess again.";
        } else if (userGuess > targetNumber) {
          feedback = "Too high. Guess again.";
        } else {
          feedback = `Correct!You got it! The number was " ${targetNumber}.`;
          isGameOver = true; // Set the flag to true when the user guesses correctly
        }
      } else {
        feedback = "Please enter a valid number.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
