"use strict";console.log("Load script 1 ✅"),console.log("ES6 arrow functions, ternary operators, map() method, and const/let supported:");var isA=function(o){"A"==o?console.log("A"):console.log("Not A")};isA("A"),isA("ABC");var numbers=[4,9,16,25],x=numbers.map(Math.sqrt);console.log(x);var data=["ES6 supported","Node.js version 14 optimized"],list=document.querySelector(".insert-list");list.innerHTML=data.map(function(o){return"<li> ".concat(o," </li>")}).join(" "),console.log("Load script 2 ✅");var fruits=["1","2","3","4"];console.log(fruits.includes("1"));