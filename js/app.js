// Enemies our player must avoid
class Enemy {
    constructor() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        /*setting initial location
        starting x position is random,
        to prevent all the enemies from being spawned on top of each other
        y possition will be varied for each enemy via the setSpeedAndYPos method*/
        this.x = -1000 + Math.round(Math.random()) * -1000;
        this.y = 222;

        //this is a property that is used to adjust speed
        this.speed = 0;

    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        //moves enemy across the horizontal axis of the screen
        this.x += this.speed * dt ^ this.speed + 1;

        //If the enemy has gone off the right side of the screen
        if (this.x > 1000 + Math.round(Math.random() * 1000)) {
            /*
            set the x position to a random position behind the starting line
            (somewhereoff to the left side of the screen).
            */
            this.x = -1000 + Math.round(Math.random() * -1000);

            //to keep the enemies movements from feeling too much like a loop
            //change it's speed and y position with setSpeedAndYPos method
            this.setSpeedAndYPos(Math.round(Math.random() * 10));

        }

        // if a collision has been detected
        if (this.collisionDetection()) {
            //call the handleCollision method
            this.handleCollision();

        }

    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //checks for collisions with the player
    collisionDetection() {
        if (this.x >= (player.x - 45) && this.x <= (player.x + 50) && this.y >= player.y && this.y <= (player.y + 100)) {
            //returning true indicating a collision has occurred
            return true;

        }

    }

    //Handles collisions with the player
    handleCollision() {
        //call the reset player method
        player.resetPlayer(false, true);

        /*only lose points if  the score is above zero as to prevent a negative score*/
        if (player.score > 0) {
            //player loses ten points when hit
            player.score -= 10;
        }

    }

    setSpeedAndYPos(speed) {
        //sets the speed and y position of the enemy depending on value passed to this method
        switch (speed) {
            case 0:
                this.speed = 3;
                this.y = 220;
                break;
            case 1:
                this.speed = 3.5;
                this.y = 140;
                break;
            case 2:
                this.speed = 3.8;
                this.y = 54;
                break;
            case 3:
                this.speed = 4;
                this.y = 220;
                break;
            case 4:
                this.speed = 5;
                this.y = 140;
                break;
            case 5:
                this.speed = 5.5;
                this.y = 54;
                break;
            case 6:
                this.speed = 6;
                this.y = 220;
                break;
            case 7:
                this.speed = 6.6;
                this.y = 140;
                break;
            case 8:
                this.speed = 7;
                this.y = 54;
                break;
            case 9:
                this.speed = 7.7;
                this.y = 220;
                break;
            case 10:
                this.speed = 8;
                this.y = 140;
                break;
        }

    }

}

/*The Queen class is used to spawn the enemies*/
class Queen {
    constructor(allEnemies) {
        for (let i = 0; i < 10; i++) {
            //makes a new enemy and adds it to the allEnemies array
            allEnemies.push(new Enemy);
            //sets a semi random speed and y posistion for the most recently made enemy
            allEnemies[i].setSpeedAndYPos(Math.round(Math.random() * 10));
        }
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        //image or sprite for the player will be changed during the character select screen
        this.sprite = 'images/char-boy.png';

        //setting initial location
        this.y = 400;
        this.x = 200;

        //used to keep track of the player's score
        this.score = 0;

        /*this property is to prevent the player from moving
        while the character select screen is up*/
        this.isSelectingCharacter = false;
    }

    // Update the players's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        return dt * 1;
    }

    // Draw the player and player's score on the screen, required method for game
    //TODO:add a health system to be drawn on the screen close to the score
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        //displays the player's current score
        ctx.font = '1.8em VT323, monospace';
        ctx.fillStyle = '#000';
        ctx.fillText(`pts:${this.score}`, 5, 500);

        //TODO: add hearts to the player
    }

    /*handles the player's directional movement*/
    handleInput(keyPressed) {
        /*if the right arrow key was pressed and if the players x pos is less than 400
        as to prevent the player from moving off the right side of the screen and
        if the is selecting character property is set to false
        which is used to make sure that the player doesent move
        while the character select screen is up
        */
        if (keyPressed === 'right' && this.x < 400 && this.isSelectingCharacter == false) {
            //move the player right
            this.x += this.update(100);

            //log the key that was pressed to the console
            console.log(keyPressed);
        }

        /*if the left arrow key was pressed and if the players x pos is greater than 0
        as to prevent the player from moving off the left side of the screen and
        if the is selecting character property is set to false
        which is used to make sure that the player doesent move
        while the character select screen is up*/
        if (keyPressed === 'left' && this.x > 0 && this.isSelectingCharacter == false) {
            //move the player left
            this.x -= this.update(100);

            //log the key that was pressed to the console
            console.log(keyPressed);
        }

        /*if the up arrow key was pressed and if the players y pos is greater than 0
        as to prevent the player from moving off the top of the screen and
        if the is selecting character property is set to false
        which is used to make sure that the player doesent move
        while the character select screen is up*/
        if (keyPressed === 'up' && this.y > 0 && this.isSelectingCharacter == false) {
            //move the player up
            this.y -= this.update(100);

            //log the key that was pressed to the console
            console.log(keyPressed);
        }

        /*if the down arrow key was pressed and the players y pos is less than 400
        as to prevent the player from moving off the bottom of the screen and
        if the is selecting character property is set to false
        which is used to make sure that the player doesent move
        while the character select screen is up*/
        if (keyPressed === 'down' && this.y < 400 && this.isSelectingCharacter == false) {
            //move the player down
            this.y += this.update(100);

            //log the key that was pressed to the console
            console.log(keyPressed);
        }

        //rest the game when the player touchs the water
        if (this.y == 0) {
            //call reset player method
            this.resetPlayer(true, false);

            /*if game_won is false add 10 points to score and set game won to true
            to prevent extra points*/
            if (!this.game_won) {
                this.score += 10;
                this.game_won = true;
            }
        }

        /*When the player isn't touching the water
        set the game_won back to false,so the user can get points
        when they touch the water.*/
        if (this.y != 0) {
            this.game_won = false;
        }

    }

    /*the resetPlayer method has two parameters the first is used to check if the player won
    the second parameter is used to check if the player was in a collision*/
    resetPlayer(game_won, collision) {
        //if the game is won reset the player with a small delay
        if (game_won) {
            //sets the player to the starting position
            setTimeout(() => {
                this.y = 400;
                this.x = 200;
            }, 100);
        }
        //if the player was in a collision rest the player with out the delay
        if (collision) {
            //sets the player to the starting position
            this.y = 400;
            this.x = 200;
        }
    }

    /*This method handle dynamic content for the character selection screen*/
    characterSelect() {
        console.log('choose your character');

        /*setting the is selecting character property to true to prevent player
        movments while the character select screen is up*/
        this.isSelectingCharacter = true;

        /*create an array to store the playable character images
        this will be used to set the src of the image elements
        in the charater selection screen*/
        const CHARACTER_SPRITES = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ];

        /*create an array to store the alt text of the playable character images
        this will be used to set the alt of the image elements in the character select screen*/
        const CHARACTER_ALT_TEXT = [
            'A boy with black hair, beady black eyes, is wearing a orange shirt, black pants and a pair of antenna on his head',
            'A girl with brown hair, brown eyes, is wearing a green shirt, black pants and a hat with cats ears',
            'A girl with silver hair, blue eyes, is wearing a black shirt, black pants, and a hat with horns',
            'A girl with pink hair, green eyes, is wearing a blue shirt, black pants and a white flower pin in her hair '
        ];

        //create an array to store the names of the playable characters
        const CHARACTER_NAMES = [
            'the boy',
            'cat girl',
            'horn girl',
            'pink girl',
            'princess girl'
        ];

        //create a document $fragment to attach the cards to
        const $fragment = document.createDocumentFragment();

        /*cards, images, names and event listeners*/
        for (let c = 0; c < 5; c++) {
            //create a card for each playable character
            const $characterCard = document.createElement('li');

            //showing the player the playable characters names
            $characterCard.textContent = `${CHARACTER_NAMES[c]}`;

            /*style the card*/
            //adding a class to handle the cards styles
            $characterCard.className = 'character-card';

            /*if the user is hovering over the card raise it up*/
            $characterCard.addEventListener('mouseover', function() {
                console.log(`you are hovering over ${CHARACTER_NAMES[c]}`);

                //lifting the card
                $characterCard.style.boxShadow = '20px 20px 20px grey';
            });

            /*when the mouse isn't hovering over the card set it back down*/
            $characterCard.addEventListener('mouseleave', function() {
                console.log(`you stoped hovering over ${CHARACTER_NAMES[c]}`);

                //setting it back down
                $characterCard.style.boxShadow = '10px 10px 10px grey'
            });

            /*when the user clicks the cards or selects there character*/
            $characterCard.addEventListener('click', () => {
                console.log(`you selected ${CHARACTER_NAMES[c]}`);

                //set the player's sprite to the character selected
                this.sprite = `${CHARACTER_SPRITES[c]}`;

                /*setting the 'isselectingcharacter' property to false to allow
                for player movment now that character select screen is over*/
                this.isSelectingCharacter = false;

                /*take the selection screen off of page*/
                document.querySelector('.select-screen').style.display = 'none';

            });

            //img element for the character
            const $characterImage = document.createElement('img');

            //set the src of the character image
            $characterImage.src = CHARACTER_SPRITES[c];

            //set the alt of the character images
            $characterImage.alt = CHARACTER_ALT_TEXT[c];

            //add the image to the card
            $characterCard.appendChild($characterImage);

            //add the card to the $fragment
            $fragment.appendChild($characterCard);

        }

        //add the fragment to 'deck'
        document.querySelector('.characters-deck').appendChild($fragment);

    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

//the queen makes the enemy bugs
new Queen(allEnemies);

// Place the player object in a variable called player
const player = new Player();

//start the game with a character selection
player.characterSelect();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});