import React, { useState, useEffect } from 'react';
import DeletePlayers from '../DeletePlayers/DeletePlayers';
import './Startscreen.css';
import { createPlayerPost } from '../../utility/createPlayerPost';
import ErrorMsg from './components/ErrorMsg';
import { getAllPlayers } from '../../utility/getAllPlayers';

function Startscreen({ getFromSS }) {
  const [player, setPlayerName] = useState('');
  const [valid, setValid] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);
  const [flag, setFlag] = useState(false);

  const handlePlayerName = (e) => {
    e.preventDefault();
    if (player.match(/[^0-9a-z]/i)) {
      e.target.value = '';
      setValid(false);
    }
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    setFlag(false);
    getAllPlayers().then((response) => {
      setAllPlayers(response);
    });
  }, [flag]);

  const createPlayer = async (e) => {
    e.preventDefault();
    setFlag(true);
    await createPlayerPost(player, allPlayers).then((postData) => {
      if (postData.handle === 'OK') {
        getFromSS(postData.name, postData.id, 0);
      } else if (postData.handle === 'Player Exist') {
        getFromSS(postData.name, postData.id, postData.maxpoints);
      } else {
        setValid(false);
      }
    });
    setFlag(true);
    const ss = document.getElementById('Startscreen');
    ss.style.display = 'none';
  };

  const handleDelete = () => {
    setShowDelete(!showDelete);
  };

  return (
    <div id="Startscreen">
      <form onSubmit={createPlayer}>
        <h2>Do you have what it takes to guess all celebrities ? </h2>
        <input id="player-input" className="input-text" name="playerName" key="input-player" onChange={handlePlayerName} type="text" value={player} placeholder="Enter your Name" />
        <button id="submit-button" type="submit"> Submit </button>
      </form>
      {(!valid) && <ErrorMsg />}
      <button id="delete-startscreen" onClick={handleDelete} type="submit"> Delete a player </button>
      {showDelete && <DeletePlayers allPlayers={allPlayers} />}
    </div>
  );
}

export default Startscreen;
