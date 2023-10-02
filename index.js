const count = document.getElementById('counter');

function increment(){
    let counter = parseInt(count.innerText);
    counter += 1;
    count.innerText = counter;
}
function decrement(){
    let counter = parseInt(count.innerText);
    counter = counter - 1;
    count.innerText = counter;
}

