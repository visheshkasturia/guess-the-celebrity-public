import React, { useEffect, useState } from 'react';
import EmmaWatson from '../../../assets/images/EmmaWatson.jpeg';
import { celebs } from '../../utility/celebs';

import './Game.css';

function Game({ getFromGame, getFlagFromGame }) {
  const [question, setQuestion] = useState({
    imageURL: EmmaWatson,
    correct: 'Emma Watson',
    optionState: ['Emma Watson', 'Felicity Jones', 'Adam Driver', 'Kim Kardashian'],
  });

  const [chosen, setChosen] = useState('');
  const [counter, setCounter] = useState(1);
  const [gameBoxDisplay, setGameBoxDisplay] = useState(false);
  const [startButtonDisplay, setStartButtonDisplay] = useState(true);
  const [celebrities, setCelebrities] = useState(celebs);
  const [playerScore, setPlayerScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const celebNames = ['Emma Watson', 'Felicity Jones', 'Adam Driver', 'Scarlett Johansson', 'Rihanna', 'Tom Hiddleston', 'Beyonce', 'Kanye West', 'Tom Holland', 'Taylor Swift', 'Tom Hardy', 'John Cena'];

  useEffect(() => {
    getFromGame(playerScore);
    getFlagFromGame(finished);
  }, [playerScore, finished]);

  const handleEnd = () => {
    setGameBoxDisplay(false);
    setFinished(!finished);
  };

  const getOptions = (correct) => {
    const options = [correct];
    let n = 3;
    const i = celebNames.length - 1;
    while (n > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      if (!(options.includes(celebNames[j]))) {
        options.push(celebNames[j]);
        n -= 1;
      }
    }
    let k = 3;
    for (; k > 0; k -= 1) {
      const l = Math.floor(Math.random() * (3 + 1));
      const temp = options[k];
      options[k] = options[l];
      options[l] = temp;
    }
    return options;
  };

  const handleSubmit = (e) => {
    setPlayerScore(playerScore + 0);
    e.preventDefault();
    setCounter(counter + 1);
    if (chosen === question.correct) {
      setPlayerScore(playerScore + 1);
    }
    if (counter === celebrities.length) {
      handleEnd();
    } else {
      setQuestion({
        imageURL: celebrities[counter].image,
        correct: celebrities[counter].name,
        optionState: getOptions(celebrities[counter].name),
      });
      setChosen('');
    }
  };

  const shuffleCelebs = (array) => {
    const arr = array;
    let i = arr.length - 1;
    for (; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  const handleStart = () => {
    setCelebrities(shuffleCelebs(celebrities));
    setQuestion({
      imageURL: celebrities[0].image,
      correct: celebrities[0].name,
      optionState: getOptions(celebrities[0].name),
    });
    setGameBoxDisplay(true);
    setStartButtonDisplay(false);
  };

  const GameBox = () => (
    <div id="Gamebox">
      <h3>
        Question &nbsp;
        { counter }
        &nbsp; of &nbsp;
        { celebrities.length }
      </h3>
      <div id="celebImg">
        <img src={question.imageURL} alt="Question" />
      </div>
      <div className="options-container">
        <div className="radio-btn-container">
          <div className="radio-btn" onClick={() => { setChosen(question.optionState[0]); }} onKeyDown={() => { setChosen(question.optionState[0]); }} role="button" tabIndex={0}>
            <input className="input-radio" type="radio" value={question.optionState[0]} onChange={() => { setChosen(question.optionState[0]); }} name="options" checked={chosen === question.optionState[0]} />
            <div>{question.optionState[0]}</div>
          </div>
        </div>
        <div className="radio-btn-container">
          <div className="radio-btn" onClick={() => { setChosen(question.optionState[1]); }} onKeyDown={() => { setChosen(question.optionState[1]); }} role="button" tabIndex={0}>
            <input className="input-radio" type="radio" value={question.optionState[1]} onChange={() => { setChosen(question.optionState[1]); }} name="options" checked={chosen === question.optionState[1]} />
            <div>{question.optionState[1]}</div>
          </div>
        </div>
        <div className="radio-btn-container">
          <div className="radio-btn" onClick={() => { setChosen(question.optionState[2]); }} onKeyDown={() => { setChosen(question.optionState[2]); }} role="button" tabIndex={0}>
            <input className="input-radio" type="radio" value={question.optionState[2]} onChange={() => { setChosen(question.optionState[2]); }} name="options" checked={chosen === question.optionState[2]} />
            <div>{question.optionState[2]}</div>
          </div>
        </div>
        <div className="radio-btn-container">
          <div className="radio-btn" onClick={() => { setChosen(question.optionState[3]); }} onKeyDown={() => { setChosen(question.optionState[3]); }} role="button" tabIndex={0}>
            <input className="input-radio" type="radio" value={question.optionState[3]} onChange={() => { setChosen(question.optionState[3]); }} name="options" checked={chosen === question.optionState[3]} />
            <div>{question.optionState[3]}</div>
          </div>
        </div>
      </div>
      <button id="game-button" type="submit" onClick={handleSubmit}>Submit Answer</button>
    </div>
  );

  const StartButton = () => (
    <button id="start-button" type="submit" onClick={handleStart}>Start Game</button>
  );

  return (
    <div>
      {startButtonDisplay && <StartButton />}
      {gameBoxDisplay && <GameBox />}
    </div>
  );
}

export default Game;
