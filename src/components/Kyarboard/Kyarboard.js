// import React, { useEffect, useState } from 'react';
// import './Kyarboard.css';
// import Tile from '../Tile/Tile';
// import PlayerOne from '../players/PlayerOne';
// import PlayerTwo from '../players/PlayerTwo';
// import { defaultBoard }from '../defaultBoard'

// const Kyarboard = () => {
//     let [board, setBoard] = useState(defaultBoard);
//     let [selectedTile, setSelectedTile] = useState(null);
//     let [currentPlayer, setCurrentPlayer] = useState(1);
//     let [eatTile, setEatTile] = useState(null);
    
//     let moveTile = (index) => {
        
//         if(!selectedTile) {
//            return alert("Please select first")
//         }

//         if(currentPlayer === 2 && index - selectedTile !== 7 && index - selectedTile !== 9) {
//             return alert("Invalid move")
            
//         } 

//         if(currentPlayer === 1 && index - selectedTile !== -7 && index - selectedTile !== -9) {
//             return alert("Invalid move")
//         } 

       
        


//         let image = currentPlayer === 1 ? 'assets/images/rook_w.png' : 'assets/images/pawn_w.png';
//         console.log(index)
//         board[index].player = currentPlayer;
//         board[index].image = image;
//         board[selectedTile].image = null;
//         board[selectedTile].selected = false;
//         setSelectedTile(null);

       
        
//         setBoard([...board]);
//         setCurrentPlayer(currentPlayer === 1 ? 2 : 1);

//     }



//     let selectTile = (index) => {
//         if(currentPlayer !== board[index].player) {
//             return alert("You can't select this!");
//         }
        
//         setSelectedTile(index);
//         board[index].selected = true;
//         setBoard([...board])
//     }

    

    

//   return (
//     <>
//         <PlayerTwo currentPlayer={currentPlayer} />
//         <div className='kyarboard'>{board.map((b, i) => <Tile 
//                 key={i}
//                 id={i}
//                 image={b.image} 
//                 number={b.number} 
//                 moveTile={moveTile} 
//                 selectedTile={selectedTile}
//                 selectTile={selectTile}
               
                
//                 />)}
//         </div>
//         <PlayerOne currentPlayer={currentPlayer} />
//     </>
//   )
// };

// export default Kyarboard;


import React, { useEffect, useState } from 'react';
import './Kyarboard.css';
import Tile from '../Tile/Tile';
import PlayerOne from '../players/PlayerOne';
import PlayerTwo from '../players/PlayerTwo';
import { defaultBoard } from '../defaultBoard';

const Kyarboard = () => {
  const [board, setBoard] = useState(defaultBoard);
  const [selectedTile, setSelectedTile] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const moveTile = (index) => {
    if (!selectedTile) {
      return alert("Please select a tile first");
    }

    const selectedTileIndex = selectedTile;
    const tileDifference = index - selectedTileIndex;

    if (
      (currentPlayer === 2 && tileDifference !== 7 && tileDifference !== 9) ||
      (currentPlayer === 1 && tileDifference !== -7 && tileDifference !== -9)
    ) {
      if (
        currentPlayer === 1 &&
        currentPlayer !== board[index].player &&
        (tileDifference !== 7 || tileDifference !== 9 || tileDifference !== 28 || tileDifference !== 36)
      ) {
        // Player 1 is eating Player 2
        const updatedBoard = [...board];
        updatedBoard[index].player = currentPlayer;
        updatedBoard[index].image = 'assets/images/rook_w.png';
        updatedBoard[selectedTile].image = null;
        updatedBoard[selectedTile].selected = false;

        // Removing Player 2's tile from the board
        updatedBoard[index - (tileDifference / 2)].image = null;
        updatedBoard[index - (tileDifference / 2)].player = null;

        setBoard(updatedBoard);
      } else if (
        currentPlayer === 2 &&
        currentPlayer !== board[index].player &&
        (tileDifference !== -7 || tileDifference !== -9)
      ) {
        // Player 2 is eating Player 1
        const updatedBoard = [...board];
        updatedBoard[index].player = currentPlayer;
        updatedBoard[index].image = 'assets/images/pawn_w.png';
        updatedBoard[selectedTile].image = null;
        updatedBoard[selectedTile].selected = false;

        // Removing Player 1's tile from the board
        updatedBoard[index - (tileDifference / 2)].image = null;
        updatedBoard[index - (tileDifference / 2)].player = null;

        setBoard(updatedBoard);
      } else {
        return alert("Invalid move");
      }
    } else {
      const image = currentPlayer === 1 ? 'assets/images/rook_w.png' : 'assets/images/pawn_w.png';

      const updatedBoard = [...board];
      updatedBoard[index].player = currentPlayer;
      updatedBoard[index].image = image;
      updatedBoard[selectedTile].image = null;
      updatedBoard[selectedTile].selected = false;

      setBoard(updatedBoard);
    }

    setSelectedTile(null);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const selectTile = (index) => {
    if (currentPlayer !== board[index].player) {
      return alert("You can't select this tile!");
    }

    const updatedBoard = [...board];
    updatedBoard[index].selected = true;

    setBoard(updatedBoard);
    setSelectedTile(index);
  };

  return (
    <>
      <PlayerTwo currentPlayer={currentPlayer} />
      <div className='kyarboard'>
        {board.map((tile, index) => (
          <Tile
            key={tile.key}
            id={index}
            image={tile.image}
            number={tile.number}
            moveTile={moveTile}
            selectedTile={selectedTile}
            selectTile={selectTile}
          />
        ))}
      </div>
      <PlayerOne currentPlayer={currentPlayer} />
    </>
  );
};

export default Kyarboard;
