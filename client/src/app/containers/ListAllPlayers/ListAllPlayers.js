import React from 'react';
import '../ListTopPlayers/ListTopPlayers.css';

function ListAllPlayers({ allPlayers }) {
  return (
    <div>
      <h2 id="head-all"> All Players </h2>
      <ul>
        <li>
          <h4> Player </h4>
          <h4> Score </h4>
        </li>
        {allPlayers.map((val) => (
          <li key={val._id}>
            <span>
              {val.name}
            </span>
            <span>
              {val.maxpoints}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListAllPlayers;
