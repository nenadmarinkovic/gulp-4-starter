// Just for purpose of testing, delete in dev mode

console.log("Load script 1 ✅");

// ES6 supported

console.log(
  "ES6 arrow functions, ternary operators, map() method, and const/let supported:"
);

const isA = (el) => {
  el == "A" ? console.log("A") : console.log("Not A");
};

isA("A"); // A
isA("ABC"); // Not A

let numbers = [4, 9, 16, 25];
let x = numbers.map(Math.sqrt);
console.log(x); // 2, 3, 5, 5


// Testing map, template literals

const data = ['ES6 supported', 'Node.js version 14 optimized'];
const list = document.querySelector(".insert-list");

list.innerHTML = data.map((num) => {
    return `<li> ${num} </li>`; // Outputs data in list-item div
  }).join(" ");
