let left_arrow = document.querySelector("#carousel-1 .left-arrow");
let right_arrow = document.querySelector("#carousel-1 .right-arrow");

let screen_store = document.querySelectorAll("#carousel-1 .carousel-screen"); //nodelist that cantain all the pictures
let num_screen = screen_store.length; //to get the screen acount from the carousel

//list of all circles
 let circles_store = document.querySelectorAll("#carousel-1 .circle-container .circle");


//a number, to target main screen
let current_screen = 0;

//Animation variable
let anim = false;

//Animation time
let animTime = 500;

//Working with the sortPositioning function
//sort out the positioning
sortPositioning(screen_store[current_screen], screen_store[current_screen - 1], screen_store[current_screen + 1]);
//putting the first circle in fill
highlightcircle(circles_store[0]);



// Movement of the screen either in the right or left side
right_arrow.addEventListener("click", ()=>{
    start_animation("right");
});

left_arrow.addEventListener("click", () =>{
    start_animation("left");
});


//that gonna works for now only to the circles
function start_animation(direction){
    if(!anim){
        anim = true;
        if(direction === "left"){
            //screen part
            moving_Left();
            //circle part
            highlightcircle(circles_store[current_screen - 1], "left");
        }else if(direction === "right"){
            //screen part
            moving_Right();
            //circle part
            highlightcircle(circles_store[current_screen + 1], "right");
        }else{
            anim = false;
            return;
        }
    }
}

//Move to the Right
function moving_Right(){
    if(current_screen < num_screen - 1){ //if the current index isn't equal to num_screen -1 (that means the last index from the screen nodelist)
        toLeft(screen_store[current_screen]); //The current screen  will shift to the left (shift = cambiar)
        comeRight(screen_store[current_screen + 1]); //the picture from the right size will become to the current screen
        setTimeout(() =>{
            anim = false;
            current_screen++; //The current screen will be the next one
            sortPositioning(screen_store[current_screen],screen_store[current_screen - 1], screen_store[current_screen+1]);
        }, animTime);
    }else{
        toLeft(screen_store[current_screen]);
        comeRight(screen_store[0]);
        setTimeout(() =>{
            anim = false;
            current_screen = 0; //The current screen will be the next one
            sortPositioning(screen_store[current_screen],screen_store[current_screen - 1], screen_store[current_screen+1]);
        }, animTime);
    }
}
//Move to the Left
function moving_Left(){
    if(current_screen > 0){
        toRight(screen_store[current_screen]);
        comeLeft(screen_store[current_screen - 1]);
        setTimeout(() =>{
           anim = false; 
           current_screen--;
           sortPositioning(screen_store[current_screen],screen_store[current_screen - 1], screen_store[current_screen+1]); 
        }, animTime);
    }else{
        toRight(screen_store[current_screen]);
        comeLeft(screen_store[num_screen - 1]);
        setTimeout(() =>{
            anim = false; 
            current_screen = num_screen - 1;
            sortPositioning(screen_store[current_screen],screen_store[current_screen - 1], screen_store[current_screen+1]); 
         }, animTime);
    }
}




//Animations methods that work with (@keyFrames)
function toLeft(screen){
    screen.style.animation = "toLeft 0.5s ease-in-out forwards";
    setTimeout(()=>{
        screen.style.animation = "";
    }, animTime);
}
function toRight(screen){
    screen.style.animation = "toRight 0.5s ease-in-out forwards";
    setTimeout(() =>{
        screen.style.animation = "";
    }, animTime);
}
function comeLeft(screen){
    screen.style.animation = "comeLeft 0.5s ease-in-out forwards";
    setTimeout(() =>{
        screen.style.animation = "";
    }, animTime);
}
function comeRight(screen){
    screen.style.animation = "comeRight 0.5s ease-in-out forwards";
    setTimeout(() =>{
        screen.style.animation = "";
    }, animTime);
}




//Sort positioning. Don't want images to overlap
function sortPositioning(mainScreen, leftScreen, rightScreen){
    //if we're in the end of the carousel, and the rightscreen
    //or leftscreen is undefined
    if(leftScreen === undefined){ //if leftscreen is undefined
        leftScreen = screen_store[num_screen - 1]; //leftscreen will be the last screen from the carousel
    }

    if(rightScreen === undefined){//if rightScreen is undefined or nulls
        rightScreen = screen_store[0]; //rightscreen will take the first screen from the carousel screen
    }

    // To manipulate all the Text and screen carousel
    screen_store.forEach((a_screen) =>{ //a_screen means one of each screen from the carousel screen 
        if(a_screen === mainScreen){
            a_screen.style.display = "block";
            a_screen.style.left = "0px";
        }else if(a_screen === leftScreen){
            a_screen.style.display = "block";
            a_screen.style.left = "-100%";
        }else if(a_screen === rightScreen){
            a_screen.style.display = "block";
            a_screen.style.left = "100%";
        }else{
            a_screen.style.display = "none";
        }
    });
}


//building the circles work when we wick on it
circles_store.forEach(a_circle =>{
    a_circle.addEventListener("click", the_event =>{
        if(!anim){
            //Converting the nodelist to Array, to use 'indexOd' method
            let array_circle_store = Array.prototype.slice.call(circles_store);
            let circle_index = array_circle_store.indexOf(the_event.target);
            //configurate circle styling
            highlightcircle(the_event.target);
        }
    })
});



//to fill a circle with white color
function highlightcircle(circle_selected, direction){
   
    // if the circles are in the ends
    if(direction === "left" && circle_selected === undefined){
        circle_selected = circles_store[num_screen - 1]; //to move the first circle to the last circle
    }else if(direction === "right" && circle_selected === undefined){
        circle_selected = circles_store[0]; //to move the last circle to the first circle
    }

    // to fill the circle depending the conditions
    circles_store.forEach((a_circle) =>{
        if(a_circle === circle_selected){
            a_circle.classList.add("circle-fill");
        }else{
            a_circle.classList.remove("circle-fill");
        }
    }); 
}


