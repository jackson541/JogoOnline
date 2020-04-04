export default function createGame(){ 

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    //regras de negócio
    function movePlayer(command) {

        //os atributos recebem os mesmos nomes das funções e retornam a função em vez da sua operação
        const actions = {
            ArrowUp (player) {
                if (player.y > 0) {
                    player.y --
                }
            },

            ArrowDown (player) {
                if (player.y + 1 < state.screen.height) {
                    player.y ++
                }
            },

            ArrowLeft (player) {
                if (player.x > 0) {
                    player.x --
                }
            },

            ArrowRight (player) {
                if (player.x + 1 < state.screen.width) {
                    player.x ++
                }
            }
        }

        function verifyCollision(player){
            for (const fruitId in state.fruits) {
                const fruit = state.fruits[fruitId]

                if (fruit.x === player.x && fruit.y === player.y){
                    delete state.fruits[fruitId]
                }
            }
        }

        const player = state.players[command.player]
        const keyPressed = command.keyPressed

        const action = actions[keyPressed]


        //verifica se o player e a função para a tecla existem
        if (player && action){
            action(player)
            verifyCollision(player)
        }
        

    }



    //adicionando e removendo players
    function addPlayer(command) {
        const playerId = command.playerId,
        playerX = command.playerX, 
        playerY = command.playerY;
        
        state.players[playerId] = { 
            x: playerX, 
            y: playerY }

    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }


    //adicionando e removendo fruits
    function addFruit(command) {
        const fruitId = command.fruitId,
        fruitX = command.fruitX, 
        fruitY = command.fruitY;
        
        state.fruits[fruitId] = { 
            x: fruitX, 
            y: fruitY }

    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state
    }
}        