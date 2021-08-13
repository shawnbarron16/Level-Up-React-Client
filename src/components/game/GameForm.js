import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider"
import { useHistory } from "react-router-dom"

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        numberOfPlayers: 1,
        name: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes()
    }, [])

    const changeGameNameState = (event) => {
        const newGameState = {...currentGame}
        newGameState.name = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.maker = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.numberOfPlayers = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.gameTypeId = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameNameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number-of-players">Number of Players</label>
                    <input type="text" name="number-of-players" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGamePlayersState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="game-type">Game Type</label>
                    <input type="text" name="type" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameTypeState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        name: currentGame.name,
                        numberOfPlayers: currentGame.numberOfPlayers,
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    createGame(game)
                    .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
 }