import React, { useState, useEffect } from 'react';
import Game from './app/containers/Game/Game';
import ListTopPlayers from './app/containers/ListTopPlayers/ListTopPlayers';
import Startscreen from './app/containers/SS/Startscreen';
import { getAllPlayers } from './app/utility/getAllPlayers';
import ListAllPlayers from './app/containers/ListAllPlayers/ListAllPlayers';
import { getOverallBest } from './app/utility/getOverallBest';
import './App.css';
import { updatePlayerPut } from './app/utility/updatePlayerPut';

function App() {
  const [displayGame, setdisplayGame] = useState(false);
  const [player, setPlayer] = useState('');
  const [playerID, setPlayerID] = useState(-1);
  const [score, setScore] = useState(0);
  const [maxPlayerScore, setMaxScore] = useState(0);
  const [renderListTop, setRenderListTop] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);
  const [showTop, setShowTop] = useState(true);
  const [overallBest, setOverallBest] = useState(0);

  const getFromSS = (name, iD, maxScore) => {
    setPlayer(name);
    setPlayerID(iD);
    setScore(0);
    setMaxScore(maxScore);
    setdisplayGame(true);
  };

  let updatePlayer = {
    id: playerID,
    name: player,
    points: score,
    maxpoints: maxPlayerScore,
  };

  useEffect(() => {
    updatePlayer = {
      id: playerID,
      name: player,
      points: score,
      maxpoints: Math.max(score, maxPlayerScore),
    };
    if (!(updatePlayer.id === -1)) {
      updatePlayerPut(updatePlayer);
    }
    getAllPlayers().then((response) => {
      setAllPlayers(response);
    });
    setMaxScore(updatePlayer.maxpoints);
    getOverallBest().then((response) => {
      setOverallBest(response[0].maxpoints);
    });
  }, [score, overallBest]);

  const getFromGame = (playerScore) => {
    setScore(playerScore);
  };

  const getFlagFromGame = (flag) => {
    setRenderListTop(flag);
  };

  const handleShowAll = () => {
    setShowTop(false);
  };
  const handleShowTop = () => {
    setShowTop(true);
  };

  const ScoreDisplay = () => (
    <div>
      <h1 id="end-congrats">
        Congratulations! You scored &nbsp;
        {score}
        &nbsp;points
      </h1>
      <div id="end-best">
        Your best score is &nbsp;
        {maxPlayerScore}
      </div>
      <div>
        Overall best score is &nbsp;
        { overallBest }
      </div>
      <button id="showall-btn" className="endBtn" onClick={handleShowAll} type="submit"> Show All Players </button>
      <button id="showtop-btn" className="endBtn" onClick={handleShowTop} type="submit"> Show Top Players </button>
    </div>
  );

  return (
    <div className="App">
      <Startscreen getFromSS={getFromSS} />
      { displayGame && <Game getFromGame={getFromGame} getFlagFromGame={getFlagFromGame} /> }
      {renderListTop && <ScoreDisplay />}
      {renderListTop && showTop && <ListTopPlayers showTop={showTop} />}
      {(!showTop) && <ListAllPlayers allPlayers={allPlayers} />}
    </div>
  );
}

export default App;
