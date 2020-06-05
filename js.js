let red=100, green=100, blue=100; 
let options = 9;
box = document.getElementsByClassName("myCol");
question = document.getElementById("rgb");
response = document.getElementById("response");
header = document.getElementById("header");
newColors = document.getElementById("newColors");
mode = document.getElementsByClassName("mode");

//Mode Functionalities
for(let i=0; i<3; i++){
    mode[i].addEventListener("click", () => {
        options = (i+1)*3; // determining number of options
        mode[i].classList.add("textInversion"); //Highlighting the selected option
        mode[(i+1)%3].classList.remove("textInversion"); //removed highlights
        mode[(i+2)%3].classList.remove("textInversion"); //from other two
        reset();
        
    });
}

//Disable unwanted boxes
function rmBox(options){
    for(i=8; i>options-1; i--){
        box[i].style.display = "none";
    }
}

//Return string rgb(red, green blue) 
function colorTxt(red, green, blue){
    let str = "rgb("+red+", "+green+", "+blue+")";
    return str;
}

//Generate Randum Number < 256
function randNum(){
     c = Math.floor(Math.random()*256);
    return c;
}

function ansFound(){
    //put Correct in navbar
    response.textContent = "Correct!";  
    //other boxes changed to that color
    for(let i=0;i<options;i++){
        if(i!=answer){
            box[i].style.background = colorTxt(red,blue,green);
        }
    }    
    //All boxes get reset ability
    for(let i=0;i<options;i++){
        box[i].addEventListener("click", reset);
    }
    
    //header Color changed to answer
    header.style.background = colorTxt(red,blue,green);
    newColors.textContent = "Play Again?";
}

function boxDisappear(obj){
    this.style.background = colorTxt(0, 0, 0);
    response.textContent = "Try Again!";
}

//Reset to be applied to reset whole thing
function genAns(){
    
    rmBox(options);
    response.textContent = "";
   
    //2 Creating Solution
    red = randNum(); blue = randNum(); green = randNum(); //a. Generating Randim colors

    answer = Math.floor(Math.random()*options); //b. Genrating Answer 
    box[answer].style.background = colorTxt(red, blue, green);  //c Coloring answer box

    rgb.textContent = colorTxt(red, blue, green).toUpperCase(); //d. Header Question
    header.style.background = "#1485c7";    //e. Default Header Color
    
    //f. Coloring Other Boxes random colors
    for(let i=0;i<options;i++){
        if(i!=answer){
            //Coloring with random colors
            box[i].style.background = colorTxt(randNum(),randNum(),randNum());
            //Adding event to disappear when clicked
            box[i].addEventListener("click", boxDisappear);
        }
    }
    
    //g. Add function to Answer Box
    box[answer].addEventListener("click", ansFound); 
}

function reset(){
    //1 Remove reset event from all the boxes
    for(let i=0;i<options;i++){
        box[i].removeEventListener("click", reset);
        box[i].removeEventListener("click", ansFound); 
        box[i].removeEventListener("click", boxDisappear);
        box[i].style.display = "block";
    }
    genAns();
    newColors.textContent = "New Colors";

}

newColors.addEventListener("click", reset);
mode[2].classList.add("textInversion"); //Highlighting the selected option

reset();
