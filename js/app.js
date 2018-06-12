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

        //TODO: make the score look better
        //displays the player's current score
        ctx.font = '16px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(`Score:${this.score}`, 0, 500);
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
            }, 50);
        }
        //if the player was in a collision rest the player with out the delay
        if (collision) {
            //sets the player to the starting position
            this.y = 400;
            this.x = 200;
        }
    }

    /*This method is the character selection screen*/
    characterSelect() {
        console.log('choose your character');

        /*setting the is selecting character property to true to prevent player
        movments while the character select screen is up*/
        this.isSelectingCharacter = true;

        //create a html element that will sit on top of the game scene
        let selectScreen = document.createElement('section');

        //create the main heading element for the character select screen
        const SELECT_SCREEN_HEADING = document.createElement('h1');

        //creating text for the main heading of the select screen
        const SELECT_SCREEN_HEADING_TEXT = document.createTextNode('Select Your Character');

        //adding text to main heading element
        SELECT_SCREEN_HEADING.appendChild(SELECT_SCREEN_HEADING_TEXT);

        //add the heading to the select screen
        selectScreen.appendChild(SELECT_SCREEN_HEADING);

        /*setting styles for the character select screen*/
        //setting background color
        selectScreen.style.background = '#abc';
        //setting the height to be the same as the main game screen, so it covers it.
        selectScreen.style.height = '606px';
        //rounding out the corners
        selectScreen.style.borderRadius = '1%';
        //placing the character select screen on top of the gamee scene
        selectScreen.style.marginTop = '100px';
        selectScreen.style.marginBottom = '-600px';
        selectScreen.style.position = 'relative';
        selectScreen.style.zIndex = '1';

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

        //create an array to store the names of the playable characters
        const CHARACTER_NAMES = [
            'the boy',
            'cat girl',
            'horn girl',
            'pink girl',
            'princess girl'
        ];

        //creating a 'deck' for the 'cards'
        const CHARACTERS_DECK = document.createElement('ul');

        //will make the cards display horizontally
        CHARACTERS_DECK.style.display = 'flex';
        CHARACTERS_DECK.style.flexFlow = 'row wrap';

        //no dots on the cards
        CHARACTERS_DECK.style.listStyle = 'none';

        //adjusting the placement of the deck
        CHARACTERS_DECK.style.marginRight = '20px';
        CHARACTERS_DECK.style.marginLeft = '-20px';

        //create a document FRAGMENT to attach the cards to
        const FRAGMENT = document.createDocumentFragment();

        /*cards, images, names and event listeners*/
        for (let c = 0; c < 5; c++) {
            //create a card for each playable character
            const CHARACTER_CARD = document.createElement('li');

            //showing the player the playable characters names
            CHARACTER_CARD.textContent = `${CHARACTER_NAMES[c]}`;

            /*style the card element*/
            //background color of the cards
            CHARACTER_CARD.style.background = '#fff';
            //change the cursor to indicate the card is clickable
            CHARACTER_CARD.style.cursor = 'pointer';
            //round the corners
            CHARACTER_CARD.style.borderRadius = '7%';
            //add some space around each card
            CHARACTER_CARD.style.margin = '2%';
            //size of the cards
            CHARACTER_CARD.style.flex = '121px';
            //visual appeal
            CHARACTER_CARD.style.boxShadow = '10px 10px 10px grey'

            /*if the user is hovering over the card raise it up*/
            CHARACTER_CARD.addEventListener('mouseover', function() {
                console.log(`you are hovering over ${CHARACTER_NAMES[c]}`);
                //lifting the card
                CHARACTER_CARD.style.boxShadow = '20px 20px 20px grey';
            });

            /*when the mouse isn't hovering over the card set it back down*/
            CHARACTER_CARD.addEventListener('mouseleave', function() {
                console.log(`you stoped hovering over ${CHARACTER_NAMES[c]}`);
                //setting it back down
                CHARACTER_CARD.style.boxShadow = '10px 10px 10px grey'
            });

            /*when the user clicks the cards or selects there character*/
            CHARACTER_CARD.addEventListener('click',() => {
                console.log(`you selected ${CHARACTER_NAMES[c]}`);
                //set the player's sprite to the character selected
                this.sprite = `${CHARACTER_SPRITES[c]}`;

                /*setting the is selecting character property to false to allow
                for player movment now that character select screen is over*/
                this.isSelectingCharacter = false;

                /*take the selection screen off of the page and
                store into variable for later use,
                I might implement a button or that takes the player back to the
                character select screen*/
                selectScreen = document.body.removeChild(selectScreen);

            });

            //img element for the character
            const CHARACTER_IMAGE = document.createElement('img');

            //set the scr of the character image
            CHARACTER_IMAGE.src = CHARACTER_SPRITES[c];

            //add the image to the card
            CHARACTER_CARD.appendChild(CHARACTER_IMAGE);

            //add card to the deck
            CHARACTERS_DECK.appendChild(CHARACTER_CARD);

        }

        //add the deck to the FRAGMENT
        FRAGMENT.appendChild(CHARACTERS_DECK);

        //add the FRAGMENT to selectScreen
        selectScreen.appendChild(FRAGMENT);

        //add the character select screen to the body
        document.body.appendChild(selectScreen);

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