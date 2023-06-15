import React from 'react';
import './Player.css';

const PlayerOne = ({currentPlayer, playeroneEatTile}) => {
  
  return (
    <div className={currentPlayer === 1 ? 'player active' : "player"}>
      <p>Player One</p>
      <div className='eat-list'>
        {
          playeroneEatTile.map((e, i) => <img key={i} src={e} alt=""/>)
        }
      </div>
    </div>
  )
}

export default PlayerOne
