import React from 'react';
import './Player.css';

const PlayerTwo = ({currentPlayer, playertwoEatTile}) => {
  return (
    <div className={currentPlayer === 2 ? 'player active' : "player"}>
      <p>Player Two</p>
      <div className='eat-list'>
        {
          playertwoEatTile.map((p, i) => <img key={i} src={p} alt=""/>)
        }
      </div>
    </div>
  )
}

export default PlayerTwo