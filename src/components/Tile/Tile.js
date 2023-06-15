import React from 'react';
import './Tile.css';

const Tile = ({number, image, moveTile, selectTile, id, selectedTile, movable}) => {
  
  let onTileClick = () => {
    //check whether tile is with image or not
    
    if(image) {
      selectTile(id)
    } else{
      moveTile(id)
    }
    
  }

  if( number % 2 === 0){
      return (
        <div className={id === selectedTile ? 'tile gold-tile' : 'tile black-tile'} onClick={onTileClick}>
          {
            image ? <img src={image} alt='' />: null
          }
          <span className='id'>{id}</span>
        </div>
      )
    } else {
      return (
      <div className='tile white-tile'>
        {
          image ? <img src={image} alt="" />: null
        }
          
      </div>
      )
    }
}

export default Tile
