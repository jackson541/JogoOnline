import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

//subscribe genérico para todos os emits
game.subscribe((command) => {
    sockets.emit(command.type, command)
})

//players conectados ao server
sockets.on('connection', (socket) => {
    const playerId = socket.id
    game.addPlayer({playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId})
        
    })

    // comunica os players do movimento realizado por um jogador
    socket.on('move-player', (command) => {
        game.movePlayer(command)
        socket.emit('move-player', command)
        
    })

})


server.listen(3000)