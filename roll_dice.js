'use strict';
const TIMEOUT = 100;
const NUMROLLS = 4;

/**
 * Generates numbers and displays each with a timeout of .1 sec
 * @param {int} val - the number of sides the die has
 * @param {int} prev - the last number generated (should always start at 0)
 * @param {int} i - the number of rolls so far (should always start at 0)
 * @returns {int} the last number generated for the die roll, 0 if there's an issue
 */
function genNum(val, prev = 0, i = 0){
  if(val < 2) {
    alert("dice sides cannot be less than 2!");
    return 0;
  } else if(i > NUMROLLS) {
    setHistory(prev, val);
    return prev;
  }
  
  let result = document.getElementById("result");
  result.style = ""; //reset style 
  
  // get random number
  let num = Math.round(Math.random() * 1000) % val + 1;
  while(num === prev){
    num = Math.round(Math.random() * 1000) % val + 1;
  }
  
  // set styling if max or min result
  if(num === val) {
    result.style = "color: #55cc55" // set green if max 
  } else if(num === 1) {
    result.style = "color: #cc5555" // set red if 1 
  }
  result.innerText = num; // display number 
  
  setTimeout(() => { genNum(val, num, i+=1); }, TIMEOUT); // recursively call function and increment counter with the set timeout
  
}

/**
 * Sets the roll history using the given numbers 
 * @param {int} num - the number rolled on the die 
 * @param {int} dieSides - the number of sides of the die that was rolled 
 */
function setHistory(num, dieSides){
  let histList = document.querySelectorAll("li");
  let hist = document.getElementById("hist_list");
  let nums = [];

  // get the list of items currently in history
  if(histList.length > 0){
    let i = histList.length - NUMROLLS;
    if(i < 0) i = 0;
    for(; i < histList.length; i++){
      if(histList[i].innerText === "none"){ continue; }
      nums.push(histList[i].innerText);
    } 
    nums.push(num);
  } else {
    hist.innerHTML = `<li>d${dieSides} (${num})</li>`;
  }

  // set the current history 
  if(nums.length > 0){
    let outItems = ""
    for(let i = 0; i < nums.length; i++){
      if(i === nums.length - 1){
        outItems += `<li>d${dieSides} (${nums[i]})</li>`;
      } else {
        outItems += `<li>${nums[i]}</li>`;
      }
    }
    hist.innerHTML = outItems;
  }
}