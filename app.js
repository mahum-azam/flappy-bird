//JavaScript script for Flappy Bird

//Create variables for the elements of #block, #hole, and #character by reading its HTML element
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");

//Create variable for jumping
var jumping = 0;

//Create counter for scoring
var counter = 0;

//Event listener re-iterates this snippet every time the animation loops!
//Changing hole position for each iteration!
hole.addEventListener('animationiteration', () => {

    //Calling a random number between -150 and -450
    var random = -((Math.random() * 300) + 150);

    //Setting the top position of the hole to be a random number between -150 and -450 px for each animation iteration.
    hole.style.top = random + "px";

    //Adds +1 to the counter each time the player passes a wall.
    counter++;

});

//Interval function that runs every 10 seconds
setInterval(function(){

    //Creating a variable characterTop that will grab the "top" height property from the CSS element for character
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    //This gravity function should only run if we are NOT jumping.
    //In which case, we should always be moving down.
    //Meant to simulate gravity within the game.
    if (jumping == 0) {

        //If the player jumps, 3 will be added to the character's height, moving it up.
        character.style.top = (characterTop + 3)+ "px";

    }

    //Adding more variables that will act as constraints within the game.
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);

    //If characterTop, blockLeft or cTop break either of these constraints, the game will alert the user and reset.
    if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft >- 50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
        alert("Game over. Score: " + (counter - 1));
        character.style.top = 100 + "px";
        counter = 0;
    }

},10);

//Creating the jump function.
//The jumping function will always equal 0 (as set above),
//UNLESS the jump function is currently running.
function jump(){

    jumping = 1;

    //Keeps track of how many times the jump interval runs.
    let jumpCount = 0;

    //Function runs every 10 milliseconds.
    var jumpInterval = setInterval(function(){

        //Creating a variable characterTop that will grab the "top" height property from the CSS element for character
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        //Prevents the user from jumping past the given top height.
        //You can't keep jumping past the top of the game!
        if ((characterTop > 6) && (jumpCount < 15)) {

            //After the player jumps, their position will quickly decrease by 5 units.
            character.style.top = (characterTop - 5) + "px";
            
        }

        //When the jumpInterval function has ran over 20 times,
        //the interval will be reset. Otherwise the game will run endlessly.
        if (jumpCount > 20) {
            clearInterval(jumpInterval);

            //Resetting the count to 0.
            jumping=0;
            jumpCount=0;
        }

        //Adds +1 to the jump counter each time this interval is executed.
        jumpCount++;

    }, 10);

}