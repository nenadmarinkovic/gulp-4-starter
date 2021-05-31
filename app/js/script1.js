console.log("Load script 1");

// ES6 supported

const isA = (el) => {
  el == "A" ? console.log("A") : console.log("Not A");
};

isA("A") // A
isA("ABC") // Not A
