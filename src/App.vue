<template>
	<!-- application's header -->
	<header class="text-center bg-dark text-bg-dark p-3 container">
		<img alt="Vue logo"
			width="150"
			height="150"
			class="rounded-circle"
			src="./assets/logo.png">

		<h1 class="mb-0">A simple mine sweeper game - powered by VueJS</h1>

		<div class="dashboard d-flex justify-content-center w-50 mx-auto mt-3">
			<select class="form-select bg-secondary d-inline-block w-50"
					name="difficulty"
					v-model="currentGame.difficulty">
				<option value="0">Very easy</option>
				<option value="1">Easy</option>
				<option value="2">Medium</option>
				<option value="2">Hard</option>
				<option value="3">Very Hard</option>
			</select>
			<button class="btn btn-success ms-2 w-25 fw-bold"
					title="Start a new game"
					@click="newGame(true)">New game</button>

			<button class="btn btn-success ms-2 w-auto fw-bold"
					title="Save the current game"
					@click="saveGame()">
				<img title="save"
					width="20"
					height="20"
					src="./assets/floppy-disk.png">
			</button>
			<button class="btn btn-success ms-2 w-auto fw-bold"
					title="Load a previous saved game"
					@click="loadGame()"
					:disabled="!app.availableSavedGame">
				<img title="load"
					width="20"
					height="20"
					src="./assets/redo.png">
			</button>
		</div>

		<div class="scoresContainer d-flex w-50 mx-auto justify-content-between mt-3">
			<div class="hiScore fw-bold">Hi-score for the current difficulty: <span class="scoreText">{{ app.hiScore }}</span></div>
			<div class="currentScore fw-bold">Current Score: <span class="scoreText">{{ currentGame.currentScore }}</span></div>
		</div>
	</header>

	<!-- main container for the mine sweeper game-->
	<main>
		<section class="gridContainer mx-auto"
				:style="'width: '+currentGame.gridWidth+'px; height: '+currentGame.gridHeight+'px;'">

			<div class="mineSweeperGrid d-flex flex-wrap"
				:class="[ currentGame.gameOver ? 'gameOver' : '', currentGame.victory ? 'victory' : '' ]"
				ref="grid">
				<template v-for="(tile, i) in currentGame.tiles"
						:key="i">
					<div class="gridTile position-relative"
						:class="[ tile.hasBeenClicked ? 'clicked' : '' ]"
						:data-i="i"
						:style="'width: '+currentGame.tileSide+'px; height: '+currentGame.tileSide+'px;'"
						@click="tileClicked(i)">

						<div v-if="!tile.hasBomb && tile.hasBeenClicked"
							class="d-flex justify-content-center align-items-center safeTileValue h-100 fw-bold">
							<span :class="'tileValue-'+tile.value">
								{{ tile.value }}
							</span>
						</div>
						<div v-if="tile.hasBomb && !currentGame.initialized"
							class="position-absolute bombTileOverlay"
							:style="'width: '+((currentGame.tileSide * 3) - (currentGame.tileSide / 2))+'px; height: '+((currentGame.tileSide * 3) - (currentGame.tileSide / 2))+'px; '+
									'left: -'+ (currentGame.tileSide - 7)+'px; top: -'+(currentGame.tileSide - 7)+'px;'">

						</div>
						<div v-if="tile.hasBeenClicked && tile.hasExploded"
							class="bombHasExploded">
							<img title="boom"
								:width="(currentGame.tileSide - 3)"
								:height="(currentGame.tileSide - 3)"
								src="./assets/explosion.png">
						</div>
						<div v-if="tile.hasBomb && (currentGame.gameOver || currentGame.victory &&  !tile.hasExploded)"
							class="tileHasBomb">
							<img title="bomb"
								:width="(currentGame.tileSide - 3)"
								:height="(currentGame.tileSide - 3)"
								src="./assets/bomb.png">
						</div>
					</div>
				</template>
			</div>

		</section>
	</main>
	<footer class="fixed-bottom text-center text-bg-dark p-3 border-top border-primary bg-secondary">
		Icons designed by
		<a href="https://www.flaticon.com/free-icons/explosion"
			title="explosion icons"
			target="_blank">Freepik</a> -
		<a href="https://www.flaticon.com/free-icons/granade"
			title="granade icons"
			target="_blank">BabyCorn</a> -
		<a href="https://www.flaticon.com/free-icons/floppy-disk"
			title="floppy disk icons"
			target="_blank">DinosoftLabs</a> -
		<a href="https://www.flaticon.com/free-icons/try"
			title="try icons"
			target="_blank">IYIKON</a>
	</footer>
</template>

<script>
/*import HelloWorld from './components/HelloWorld.vue'*/

// importing bootstrap
import 'bootstrap/dist/css/bootstrap.css';

export default
{
	data()
	{
		return {
			app:
			{
				availableSavedGame: false,
				hiScore: 0,
				savedGameId: '',
			},
			currentGame:
			{
				gameId: '',
				tilesCount: 100, // numbers of tiles
				tiles: [], // it will store grid's tiles informations
				gridWidth: 0, // width of the grid in px
				gridHeight: 440, // height of the grid in px
				tileSide: 40, // side of the cells in px
				padding: 20, // side of the cells in px
				difficulty: 0,
				currentBombs: 0,
				clickedTiles: 0,
				totalBombs: 0,
				currentScore: 0,
				gameOver: false,
				victory: false,
				initialized: false,
			}
		}
	},
	name: 'App',
	components: // loading components
	{
	},
	methods:
	{
		tileClicked(i)
		{
			// retrieving datas about clicked tile in out general tileset array
			const tile = this.currentGame.tiles[i];

			// if the game is already ended, or if tile is undefined or it's already clicked, we'll just skip the rest of the function
			if(this.currentGame.gameOver || this.currentGame.victory || typeof tile == 'undefined' || !tile || tile.hasBeenClicked)
			{
				return;
			}

			// setting the tile as clicked
			tile.hasBeenClicked = true;

			// if the clicked tile doesn't have a bomb
			if(!tile.hasBomb)
			{
				// incrementing the score by the tile's value + 1
				this.currentGame.currentScore += (tile.value + 1);

				// incrementing the clicked tiles counter
				this.currentGame.clickedTiles++;
				
				// if there aren't free tiles anymore
				if((this.currentGame.totalBombs + this.currentGame.clickedTiles) === this.currentGame.tilesCount)
				{
					// is this the new higher score?
					if(this.currentGame.currentScore > this.app.hiScore)
					{
						this.saveHiScore();
					}

					// the game is won!
					this.currentGame.victory = true;

					// if the current game was a previous saved game
					if(this.app.savedGameId && this.currentGame.gameId === this.app.savedGameId)
					{
						// clearning the saved game
						localStorage.removeItem('s9yk3rMineSweeper_savedGame');

						// there aren't saved games anymore
						this.app.savedGameId = '';
						this.app.availableSavedGame = false;
					}

					// if the current game's id is equal to the
				}

				// we'll skip the rest of the function
				return;
			}

			// notifying that this tile's bomb is exploded
			tile.hasExploded = true;

			// is this the new higher score?
			if(this.currentGame.currentScore > this.app.hiScore)
			{
				this.saveHiScore();
			}

			// the game is ended
			this.currentGame.gameOver = true;

			// if the current game was a previous saved game
			if(this.app.savedGameId && this.currentGame.gameId === this.app.savedGameId)
			{
				// clearning the saved game
				localStorage.removeItem('s9yk3rMineSweeper_savedGame');

				// there aren't saved games anymore
				this.app.savedGameId = '';
				this.app.availableSavedGame = false;
			}
		},
		saveHiScore()
		{
			// registering the new hiscore; it will be saved in the localstorage only at the end of the game.
			// starting a new game will not save the score, if you didn't won or lose
			this.app.hiScore = this.currentGame.currentScore;

			// saving the high score into the local storage
			localStorage.setItem(`s9yk3rMineSweeper_hiscoreDifficulty${this.currentGame.difficulty}`, this.app.hiScore);
		},
		newGame(showWarning = false)
		{
			let confirmed = true;

			// the user clicked on the "New game" button and he didn't won/lose a game;
			// if the user lost/won, there is no need to confirm to play another game
			if(showWarning && !this.currentGame.gameOver &&  !this.currentGame.victory)
			{
				confirmed = confirm('Warning! You\'ll lose all your progress on your current game. Click "Ok" if you want to proceed.');
			}

			// the user choose to not start a new game
			if(!confirmed)
			{
				return;
			}

			// generating a new ID for the game
			this.currentGame.gameId = Math.random().toString(36).slice(2, 12);

			// generating a new ID for the game
			this.currentGame.initialized = false;

			// resetting game's vars
			this.currentGame.tiles = [];
			this.currentGame.gridWidth = 0;
			this.currentGame.currentBombs = 0;
			this.currentGame.totalBombs = 0;
			this.currentGame.clickedTiles = 0;
			this.currentGame.currentScore = 0;
			this.currentGame.gameOver = false;
			this.currentGame.victory = false;

			// retrieving the score based on the selected difficulty
			this.app.hiScore = localStorage.getItem(`s9yk3rMineSweeper_hiscoreDifficulty${this.currentGame.difficulty}`);

			// if there isn't an hiscore for this difficulty yet
			if(!this.app.hiScore)
			{
				this.app.hiScore = 0; // setting a default hiscore of 0
			}

			// calculating how many rows the grid will have; the height of the grid is fixed
			const rows = (this.currentGame.gridHeight / this.currentGame.tileSide);

			let factor = 5;

			// defining bombs total count based on the currend difficulty
			switch(parseInt(this.currentGame.difficulty))
			{
				default: // very easy
				case 0:
					this.currentGame.tilesCount = (10 * 10);
					break;

				/*case 1: // easy
					this.currentGame.tilesCount = (10 * 25);
					factor = 4;
					break;

				case 2: // normal
					this.currentGame.tilesCount = (10 * 35);
					factor = 3;
					break;

				case 3: // hard
					this.currentGame.tilesCount = (10 * 45);
					factor = 2;
					break;

				case 4: // very hard
					this.currentGame.tilesCount = (10 * 55);
					factor = 1.5
					break;*/
			}

			// with this information, i can calculate how many columns my grid will need to print the needed amount of tiles
			const columns = (this.currentGame.tilesCount / rows);

			// now i can calculate the exact width of my grid
			this.currentGame.gridWidth = ((columns * this.currentGame.tileSide) + this.currentGame.tileSide + (this.currentGame.padding * 2));


			this.currentGame.totalBombs = Math.ceil(this.currentGame.tilesCount / factor);

			// setting the current bomb's counter
			this.currentGame.currentBombs = this.currentGame.totalBombs;

			// generating random numbers; this will define where bombs will be
			const bombsTiles = [];

			while(bombsTiles.length < this.currentGame.totalBombs)
			{
				// generating random number; this numer will define where the bomb will be.
				// Math.random() will generate numbers from 0 to 0.9999999999999999.
				// We'll multiply this number for the number of tiles minus one.
				// this way, if for example, if we have 100 tiles and our generated random number
				// is 0,9999999999999999, we'll multiply it for 100. The result
				// will be 99.99999999999999; the rounded number will be 99. We'll put a bomb in the 99#tile
				const random = Math.floor(Math.random() * this.currentGame.tilesCount);

				// if the random tile doesn't have a bomb yet
				if(!bombsTiles.includes(random))
				{
					bombsTiles.push(random); // we'll put a bomb into the tile
				}
			}

			// generating cells based on the selected grid size
			for(let i = 0; i < this.currentGame.tilesCount; i++)
			{
				// if the tile should have a bomb
				this.currentGame.tiles.push({
					id: i,
					hasBomb: (bombsTiles.includes(i)), // if the tile should have a bomb, register it
					hasBeenClicked: false, // the tile as been clicked
					hasExploded: false, // the tile is exploded
					value: 0, // number of points given by the tile on click (if it's not a bomb)
				});
			}

			// defining cells values; I'm doing this in another cycle so I can be sure that bombs was fully deployed
			// TODO find a better way to do this
			this.$nextTick(() =>
			{
				this.currentGame.tiles.forEach((tile) =>
				{
					// skipping tiles without bombs
					if(!tile.hasBomb)
					{
						return;
					}

					const i = tile.id;

					// recovering the tile's overlay
					const bombTile = this.$refs.grid.querySelector(`.gridTile[data-i="${i}"]`);
					const bombTileOverlay = bombTile.querySelector('.bombTileOverlay');

					// if it was possible to retrieve a tile overlay
					if(typeof bombTileOverlay !== 'undefined' && bombTileOverlay)
					{
						// cycling again through every existing tile that isn't a bomb to figure out if
						// the bomb tile overlay is overlapping it: the purpose of all these cycles is to establish
						// if a safe tile is near a bomb tile, so that i can assign points to it based on the number of near bombs.
						// TODO find a better way do to this; i could just do some maths for every bomb tile to calculate
						// the indexes of safe tiles and put numbers to them without cycling through them for every damn bomb;
						// it's a poor solution
						this.currentGame.tiles.forEach((tile) =>
						{
							// skipping tiles with bombs
							if(tile.hasBomb)
							{
								return;
							}
							const i = tile.id;
							const safeTile = this.$refs.grid.querySelector(`.gridTile[data-i="${i}"]`);

							// checking if the bombTileOverlay is overlapping the safe tile
							const isOverlapping = this.checkOverlapping(bombTileOverlay, safeTile);

							// if is overlapping
							if(isOverlapping)
							{
								// incrementing the free tile's value
								tile.value++;
							}
						});
					}
				});

				this.currentGame.initialized = true;
			})
		},
		saveGame()
		{
			// retrieving a previous saved game
			const savedGame = localStorage.getItem('s9yk3rMineSweeper_savedGame');

			let confirmed = true;

			// there was already a saved game
			if(typeof savedGame !== 'undefined' && savedGame)
			{
				// showing a confirmation request
				confirmed = confirm('Warning! There is already a saved game. If you proceed, the previous saved game will be overwritted. Click "Ok" if you want to proceed.');
			}

			// the user choose to not overwrite the previous saved game
			if(!confirmed)
			{
				return;
			}

			const gameData = this.currentGame;
			localStorage.setItem('s9yk3rMineSweeper_savedGame', JSON.stringify(gameData));

			// saving the saved game's id
			this.app.savedGameId = gameData.gameId;
			this.app.availableSavedGame = true;

			alert('The game as been saved');
		},
		loadGame()
		{
			// if there isn't a previous saved game
			if(!this.app.availableSavedGame)
			{
				// return a warning message and stop the execution
				alert('There are no saved games!');
				return;
			}

			let confirmed = true;

			confirmed = confirm('Warning! By loading this game, you\'ll lose all your current progress. Click "Ok" if you want to proceed.');

			// the user choose to not load a previous game
			if(!confirmed)
			{
				// stop the execution
				return;
			}
			// retrieving a previous saved game
			const savedGame = localStorage.getItem('s9yk3rMineSweeper_savedGame');

			// loading the saved game's data
			this.currentGame = JSON.parse(savedGame);

			// showing an alert message
			alert('The game as been loaded');
		},
		checkOverlapping(bombTileOverlay, tile)
		{
			const overlayRect = bombTileOverlay.getBoundingClientRect();
			const elementToCheckRect = tile.getBoundingClientRect();

			return !(overlayRect.top > elementToCheckRect.bottom || overlayRect.right < elementToCheckRect.left ||
					overlayRect.bottom < elementToCheckRect.top ||overlayRect.left > elementToCheckRect.right);
		}
	},
	mounted() {
		// generating random tiles
		this.newGame();

		// retrieving the hiscore
		this.app.hiScore = localStorage.getItem(`s9yk3rMineSweeper_hiscoreDifficulty${this.currentGame.difficulty}`);

		if(!this.app.hiScore)
		{
			this.app.hiScore = 0;
		}
		
		// retrieving a previous saved game
		const savedGame = localStorage.getItem('s9yk3rMineSweeper_savedGame');
		
		// if there is a previous saved game
		if(typeof savedGame !== 'undefined' && savedGame)
		{
			this.app.availableSavedGame = savedGame;
			const savedGameData = JSON.parse(savedGame);

			// saving the saved game's id
			this.app.savedGameId = savedGameData.gameId;
		}
	}
}
</script>

<style lang="scss">
* {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
html,
body { height: 100%; }
#app
{
	.gridContainer {
		background: $gray-100;
		padding: 20px;
	}
	.gridTile {
		background: $gray-100;
		border-style: solid;
		box-shadow: inset -2px -2px 3px 0px rgba(0, 0, 0, 0.4), inset 2px 2px 3px 0px rgba(255, 255, 255, 0.4);
		border-width: 4px 4px 4px 4px;
		border-color: #fff $gray-400 $gray-400 #fff;
	}
	.mineSweeperGrid:not(.gameOver):not(.victory) .gridTile:hover {
		background: $gray-300;
		cursor: pointer;
	}
	.mineSweeperGrid:not(.gameOver):not(.victory) .gridTile:active,
	.gridTile.clicked {
		background: $gray-200;
		border-color: #747474;
		box-shadow: none;
	}
	.mineSweeperGrid.gameOver,
	.mineSweeperGrid.victory {
		cursor: not-allowed;
	}
	.bombTileOverlay {
		background: rgba(0,0,0,.75);
		z-index: 1;
	}
	.safeTileValue {}
	.tileValue-0 { color: #000000; }
	.tileValue-1 { color: #0101ff; }
	.tileValue-2 { color: #007b00; }
	.tileValue-3 { color: #ff0101; }
	.tileValue-4 { color: #00007b; }
	.tileValue-5 { color: #7b0000; }
}
</style>
