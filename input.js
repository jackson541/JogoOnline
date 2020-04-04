export default function createKeyboardListener(document){
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    //obter todos os inputs necessários no jogo
    function handleKeydown(event){
        const keyPressed = event.key
        
        const state = {
            player: 'player1',
            keyPressed
        }

        notifyAll(state)

    }

    return {
        subscribe
    }
}