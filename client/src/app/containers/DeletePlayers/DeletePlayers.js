import React, { useState } from 'react';
import { getPlayerIdByName } from '../../utility/getPlayerIdByName';
import { deletePlayerById } from '../../utility/deletePlayerById';
import DeleteSuccessful from './components/DeleteSuccessful';
import DeleteFail from './components/DeleteFail';

function DeletePlayers({ allPlayers }) {
  const [toDeletePlayer, setToDeletePlayer] = useState('');
  const [deleteSucc, setDeleteSucc] = useState(false);
  const [deleteFail, setDeleteFail] = useState(false);

  const handleDeletePlayerName = (e) => {
    e.preventDefault();
    setToDeletePlayer(e.target.value);
  };

  const handleDeletePlayer = (e) => {
    e.preventDefault();
    const pID = getPlayerIdByName(toDeletePlayer, allPlayers);
    if (pID.handle === 'OK') {
      deletePlayerById(pID.id);
      setDeleteSucc(true);
      setDeleteFail(false);
    } else {
      setDeleteFail(true);
      setDeleteSucc(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleDeletePlayer}>
        <h2>Enter Player Name to Delete</h2>
        <input id="delete-input" className="input-text" name="playerName" onChange={handleDeletePlayerName} type="text" value={toDeletePlayer} placeholder="Enter Player Name" />
        <button id="delete-button" type="submit"> Submit </button>
      </form>
      { deleteSucc && <DeleteSuccessful />}
      { deleteFail && <DeleteFail />}
    </div>
  );
}

export default DeletePlayers;
