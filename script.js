var inputName = document.querySelector('.name-field'),
    playBtn = document.querySelector('.play-btn'),
    time = document.querySelector('.time'),
    questDiv = document.querySelector('.question'),
    eqOne = document.querySelector('.eq-one'),
    eqTow = document.querySelector('.eq-two'),
    eqThree = document.querySelector('.eq-thr'),
    eqFour = document.querySelector('.eq-frr'),
    resultDiv = document.querySelector('.result'),
    resultSpan = document.querySelector('.result .res'),
    resMessg = document.querySelector('.res-msg'),
    rightAnsw = document.querySelector('.good'),
    wrongAnsw = document.querySelector('.bad');
      
window.onload = inputName.focus();

//enter name and start game
playBtn.onclick = function() {
  if(inputName.value == ''){
    alert('Please Enter Your Name');
    inputName.focus();
  } else {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.welcome .name').textContent = inputName.value;
    inputName.value = '';
    //timer function .. Start countDown
    sec = 30;
    var timer = setInterval(() => {
      sec -= 1;
      if (sec<10) {
        sec = '0' + sec;
        if (sec<5) {
          time.style.color = 'red';
        }
      }
      if (sec<1) {  //if time finished stop countDown and Display Result
        clearInterval(timer);
        count = 10; //set count = 10 (i use count in function nextQst() to check if count >9 then displaay Result)
        resultSpan.textContent = cor; //the result will be the correct answers choosed
        resMsg(cor);
        rightAnsw.textContent = 'Right = ' + righAn;
        wrongAnsw.textContent = 'Wrong = ' + wrongAn;
        resultDiv.style.display = 'block';
      }
      time.textContent = sec;
    }, 1000);
  }
}

//get random numbers from 0 to 10
var x = Math.round(Math.random()*10),
    y = Math.round(Math.random()*10),
    a = Math.round(Math.random()*10),
    b = Math.round(Math.random()*10),
    c = Math.round(Math.random()*10),
    d = Math.round(Math.random()*10),
    e = Math.round(Math.random()*10),
    f = Math.round(Math.random()*10);
      
//change the question (the operation)
//at start of game append random x and y operands in question div
qst    = document.createElement('span');
qstTxt = document.createTextNode(x + ' x ' + y);
qst.appendChild(qstTxt);
questDiv.appendChild(qst);
      
//answers change
//at start of game get random numbers and push in array to pick from them the four possibilities and contaains the right answer (x*y)
var eq = [a * b, c * d, e * f, x * y];

//creaate text for each element and append it to the possibilities span
eqTxtOne   = document.createTextNode(eq[0]);
eqTxtTwo   = document.createTextNode(eq[1]);
eqTxtThree = document.createTextNode(eq[2]);
eqTxtFour  = document.createTextNode(eq[3]);
eqOne.appendChild(eqTxtOne);
eqTow.appendChild(eqTxtTwo);
eqThree.appendChild(eqTxtThree);
eqFour.appendChild(eqTxtFour);

var count   = 0,  //to check on number of question (i choose 10 question in this app)
    cor     = 0,  //correct answers
    righAn  = 0,  //right answers the person get
    wrongAn = 0;  //wrong answers the person get

//function to change question when click on one of the for possibilities
function nextQst(e) {
    //check answers
    if(e.target.textContent == x * y){
      cor+=1;
      righAn +=1;
      document.querySelector('.corectSc').textContent = cor;
    } else {
      wrongAn +=1;
    }
    //remove the old question (operation)
    questDiv.removeChild(questDiv.lastChild);
    //get random numbers and append new question (new operation)
    x = Math.round(Math.random()*10),
    y = Math.round(Math.random()*10),
    a = Math.round(Math.random()*10),
    b = Math.round(Math.random()*10),
    c = Math.round(Math.random()*10),
    d = Math.round(Math.random()*10),
    e = Math.round(Math.random()*10),
    f = Math.round(Math.random()*10);
    var eq = [a * b, c * d, e * f, x * y];
    qst = document.createElement('span');
    qstTxt = document.createTextNode(x + ' x ' + y);
    qst.appendChild(qstTxt);
    questDiv.appendChild(qst);
    //empty answers text (the 4 possibilities)
    eqTxtOne.textContent = '';
    eqTxtTwo.textContent = '';
    eqTxtThree.textContent = '';
    eqTxtFour.textContent = '';

    //shuffle array to change everytime the answers orders
    var arrLen = eq.length;
    for(var i=arrLen-1; i>0; i--){
      var j = Math.floor(Math.random() * (i+1));
      var k = eq[i];
      eq[i] = eq[j];
      eq[j] = k;
    }
    //change answers (the 4 possibilities)
    eqTxtOne = document.createTextNode(eq[0]);
    eqTxtTwo = document.createTextNode(eq[1]);
    eqTxtThree = document.createTextNode(eq[2]);
    eqTxtFour = document.createTextNode(eq[3]);
    eqOne.appendChild(eqTxtOne);
    eqTow.appendChild(eqTxtTwo);
    eqThree.appendChild(eqTxtThree);
    eqFour.appendChild(eqTxtFour);

    count++;  //question + 1
    
    if(count>9){  //if person answers on 10 question then display result
      resultSpan.textContent = cor; //result will be the correct answers (example output: 8/10)
      resMsg(cor);
      rightAnsw.textContent = 'Right = ' + righAn;
      wrongAnsw.textContent = 'Wrong = ' + wrongAn;
      resultDiv.style.display = 'block';
      
    }
}

//play again function
document.querySelector('.play-again').onclick = function() {
  window.location.reload();
}
      
//Result msg function
function resMsg(corect) { //check the correct answers and displaay for each result a message 
  if(corect < 5) {
    resMessg.textContent = 'Try Again!';
    resMessg.style.color = 'red';
  } else if(corect >= 5 && corect <= 8) {
    resMessg.textContent = 'Good!';
    resMessg.style.color = 'green';
  } else {
    resMessg.textContent = 'Perfect!';
    resMessg.style.color = 'yellow';
  }
}