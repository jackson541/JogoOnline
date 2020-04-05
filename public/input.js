export default function createKeyboardListener(document){
    const state = {
        observers: [],
        player: null
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    function setPlayer (command) {
        state.player = command.playerId
    }

    document.addEventListener('keydown', handleKeydown)

    //obter todos os inputs necessários no jogo
    function handleKeydown(event){
        const keyPressed = event.key
        
        const command = {
            type: 'move-player',
            player: state.player,
            keyPressed
        }

        //realiza o movimento e alerta os demais jogadores sobre ele
        notifyAll(command)

    }

    return {
        subscribe,
        setPlayer
    }
}