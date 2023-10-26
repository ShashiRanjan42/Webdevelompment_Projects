const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={}[]:;"<,>.|?/';

let password ="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

// initially ye function niche likha hai
setIndicator("#ccc");

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText =passwordLength;
        // और स्लाइडर के लिए कोड जो बैकग्राउंड चंगे क्र रहा है .
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100 / (max - min)) + "% 100%";
}

function getRndInteger(min, max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}

function generateSymbol() {
    let randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange)
});

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
})

function shufflePassword(array)
{
    // using fisher yates method
    for(let i=array.length-1; i>0; i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        // swap
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str ="";
    array.forEach((el) => (str += el));

    return str;
}


generateBtn.addEventListener('click',() => {
    //console.log("hdshklgdj");
    if(checkCount == 0)
    return;

    // console.log(checkCount);
    // Special case
    if(checkCount > passwordLength)
    {
        passwordLength = checkCount;
        handleSlider();
    }

    // Password bnana Suru krte hai
    password ="";

    let funcArr = [];

    if(uppercaseCheck.checked) 
    funcArr.push(generateUpperCase);
    
    if(lowercaseCheck.checked) 
    funcArr.push(generateLowerCase);

    if(numbersCheck.checked) 
    funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked) 
    funcArr.push(generateSymbol);

    // complusary part added
    for(let i=0; i<funcArr.length; i++)
    {
        password += funcArr[i]();
    }
    // console.log(password); 

    // Baki ka addition
    for(let i=0; i<passwordLength - funcArr.length; i++)
    {
        let randIndex = getRndInteger(0,funcArr.length);
        // console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    // console.log(password);

    // yaha tk password ready hai
    // password ko shuffle kr rhe 
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    // calculating strength
    calcStrength();
});

function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 5px ${color}`;
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8)
    setIndicator("#0f0");
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6)
    setIndicator("#ff0");
    else
    setIndicator("#f00");
}

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
});

async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch {
        copyMsg.innerText = "failed";
    }
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}