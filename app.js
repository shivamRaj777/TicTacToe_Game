let boxes=document.querySelectorAll(".box");
let resetbutton=document.querySelector("#rst-btn");
let messageContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let newGameBtn=document.querySelector("#new-btn");

//for two players turns one by one
let turnO=true;  //palyerO ===O will be set as value when clicked
let count=0; //for draw condition we will check with count if it reaches 9 and there is no winner then draw will be declared

//store the patterns for winning
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]

//function to handle the reset button
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();//to handle the reset part 
    messageContainer.classList.add("hide");//will hide the message and game will reset
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
//disable the button once the winner is declared
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box clicked");
        if(turnO){
            box.innerText="O";
            box.style.color="skyblue"; 
            turnO=false; // as next turn will be playerX so we dont want O  as value 
        }else{
            box.innerText="X";
            box.style.color="red";
            turnO=true; //for player Y so that O will be set
        }
        box.disabled=true; //once a value is set ,we cannot change the value again by a click
        count++;

        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw(); //will be called to handle the draw function
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`Game was a Draw`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        //console.log(pattern[0],pattern[1],pattern[2]);
        //console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        let posVal1=boxes[pattern[0]].innerText;
        let posVal2=boxes[pattern[1]].innerText;
        let posVal3=boxes[pattern[2]].innerText;

        if(posVal1 !="" && posVal2 !="" && posVal3 !=""){
            if(posVal1===posVal2 && posVal2===posVal3){
                console.log("winner",posVal1);
                showWinner(posVal1);
                return true;
            }
        }
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`; //for message to be displayed when player wins the game.
    messageContainer.classList.remove("hide"); //now this will enable the msg to be displayed in the container
    disableBoxes();
}
//now new game button will be displayed so we will handle newgame button action 
newGameBtn.addEventListener("click",resetGame);
resetbutton.addEventListener("click",resetGame);