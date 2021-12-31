import React, { useState, useEffect } from 'react';
import { getOverallBest } from '../../utility/getOverallBest';
import './ListTopPlayers.css';

function ListTopPlayers({ showTop }) {
  const [topPlayers, setTopPlayers] = useState([]);
  const [unmount, setUnmount] = useState(showTop);

  useEffect(() => {
    if (unmount) {
      getOverallBest().then((response) => {
        setTopPlayers(response);
      });
    }
    return () => {
      setUnmount(false);
    };
  }, [topPlayers]);

  return (
    <div>
      <h2 id="top-head"> Top 5 Players </h2>
      <ul>
        <li>
          <h4> Player </h4>
          <h4> Score </h4>
        </li>
        {topPlayers.map((val) => (
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

export default ListTopPlayers;
