export default function createGame(){ 

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const observers = []

    function subscribe (observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll (command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState (newState) {
        Object.assign(state, newState)
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
            notifyAll({
                type: 'move-player',
                keyPressed,
                player: command.player
            })
            action(player)
            verifyCollision(player)
        }
        

    }



    //adicionando e removendo players
    function addPlayer(command) {
        const playerId = command.playerId,
        playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width), 
        playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
        
        state.players[playerId] = { 
            x: playerX, 
            y: playerY 
        }

        notifyAll({
            type: 'add-player',
            playerId,
            playerX,
            playerY
        })

    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId
        })
    }


    //adicionando e removendo fruits
    function addFruit(command) {
        const fruitId = command.fruitId,
        fruitX = command.fruitX, 
        fruitY = command.fruitY;
        
        state.fruits[fruitId] = { 
            x: fruitX, 
            y: fruitY }

        notifyAll({
            type: 'add-fruit',
            fruitId,
            fruitX,
            fruitY
        })

    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]

        notifyAll({
            type: 'remove-fruit',
            fruitId
        })
    }

    return {
        subscribe,
        notifyAll,
        setState,
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state
    }
}        