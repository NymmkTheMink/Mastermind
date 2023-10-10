var secret_code = [] 
var pieces = ["red", "green", "yellow", "blue"]
var chosen_color = ''
var guess = []
var current_row = "row1"
var hint_colors = ["gray", "gray", "gray", "gray"]

// Makes the circle follow the mouse
document.addEventListener('DOMContentLoaded', () => {
    var mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById('mouseCircle');

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    }

    var delay = 1,
        revisedMousePosX = 0,
        revisedMousePosY = 0;

    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);

        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay; 

        mouseCircle.style.top = revisedMousePosY + 'px';
        mouseCircle.style.left = revisedMousePosX + 'px';
    }
    delayMouseFollow();
});


// Generates a random number between 0 and 3
function npc_choose_piece() {
    var generated = Math.floor(Math.random() * 4)
    return generated
}


// Generates the secret code
function code_generater() {
    while (secret_code.length != 4) {
        secret_code[secret_code.length] = pieces[npc_choose_piece()]
    }
}


// Sets the color of the selected slot to the color chosen
function set_color(index){
    guess[index] = chosen_color
    var change_slot_color = document.getElementById(current_row + "Slot" + index)
    change_slot_color.style.backgroundColor = chosen_color 
}


// Changes the current color to the one selected
function choose_color(color){
    chosen_color = color
    var change_circle_color = document.getElementById("mouseCircle")
    change_circle_color.style.backgroundColor = chosen_color
}


// Generates a new secret combination
function start_new_game() {
    secret_code = []
    code_generater()
}


// Changes the current row to the next one once check is pressed
function change_row(check_row) {
    if (check_row == "row1") {
        current_row = "row2"
    }
    else if (check_row == "row2") {
        current_row = "row3"
    }
    else if (check_row == "row3") {
        current_row = "row4"
    }
    else if (check_row == "row4") {
        current_row = "row5"
    }
    else if (check_row == "row5") {
        current_row = "row6"
    }
    else if (check_row == "row6") {
        current_row = "row7"
    }
    else if (check_row == "row7") {
        current_row = "row8"
    }
    else if (check_row == "row8") {
        current_row = "row9"
    }
    else if (check_row == "row9") {
        current_row = "row10"
    }
    else {
        window.alert("You failed! The secret code was " + secret_code + ".\nPress OK to start another game.")
        location.reload()
    }
}


// Checks if the guess matches with the secret combination and gives hints. 
function check_guess(check_row) {
    // Checks if has colored all the circles in the row
    if (guess.length == 4) {
        hint_colors = ["gray", "gray", "gray", "gray"]
        let num_black = 0

        // Checks if the guess is the right color and in the right place
        for (let i = 0; i < 4; i++) {
            if (guess[i] == secret_code[i]) {
                hint_colors[i] = "black"
                num_black ++
            }
        }
        
        // Checks if the guess is the right color but in the wrong place
        for (let i = 0; i < 4; i++) {
            if (hint_colors[i] != "black") {
                for (let k = 0; k < 4; k ++) {
                    if ( k != i && guess[i] == secret_code[k] && hint_colors[k] != "black") {
                        hint_colors[i] = "white"
                    }
                }
            }
        }
        
        // Changes the hint slots to the right color
        for (let i = 0; i < 4; i ++){
            var change_hint_slot_color = document.getElementById(current_row + "HintSlot" + i)
            change_hint_slot_color.style.backgroundColor = hint_colors[i]
        }

        // Checks if the player has won if so alerts the player
        if (num_black == 4) {
            window.alert("Hurray! You guessed the secret code!\nPress OK to play again.")
            location.reload()
        }
        
        // Moves on to the next row
        else {
            change_row(check_row)
            guess = []
        }
    }

    // Alerts the player to color all cirles
    else {
        window.alert("You must color all circles before checking!")
    }
}

// calls the check guess function on the current row
function click_on_check(check_row) {
    check_guess(check_row)
}

// Starts a new game when the window loads
window.onload = start_new_game()

