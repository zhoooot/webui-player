// components/Grid.js
import React, { useState } from 'react';
import Image from 'next/image';
import GridItem from './power_up';

// Import images from the public/images folder
import Image0 from '/public/images/powerups/0.png';
import Image1 from '/public/images/powerups/1.png';
import Image2 from '/public/images/powerups/2.png';
import Image3 from '/public/images/powerups/3.png';
import Image4 from '/public/images/powerups/4.png';
import Image5 from '/public/images/powerups/5.png';
import Image6 from '/public/images/powerups/6.png';
import Image7 from '/public/images/powerups/7.png';
import Image8 from '/public/images/powerups/8.png';
import PlayerBar from './player_bar';

const Grid = () => {
  const imageUrls = [Image0, Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];

  // State to track the clicked status of each button
  const [clickedButtons, setClickedButtons] = useState(Array(imageUrls.length).fill(false));
  // if name is not set, then set to shut the fuk up
  
  const name = 
  // localStorage.getItem("username") || 
  "shut the fuk up"; 
  
  const handleClick = (index: number) => {
    const updatedClickedButtons = clickedButtons.map((value, ind) => {
      if (index === ind) {
        value = !value;
      }
      return value;
    });
    if (getNumbPowerUp(updatedClickedButtons)<=4)
    {
      setClickedButtons(updatedClickedButtons);

    }
  };

  const getNumbPowerUp = (clickedButtons: boolean[]): number => {
    let count = 0;
  
    for (let i = 0; i < clickedButtons.length; ++i) {
      if (clickedButtons[i]) {
        count++;
      }
    }
  
    return count;
  };
  
  return (
    <div>
      <div className="w-full grid justify-items-center">
      <div className="inline-grid grid-cols-3 gap-4 align-middle justify-items-center items-center">
        {imageUrls.map((imageUrl, index) => (
          <GridItem
            key={index}
            imageUrl={imageUrl}
            index={index}
            onClick={handleClick}
            clicked={clickedButtons[index]}
          />
        ))}
      </div>
    </div>
    <PlayerBar index={getNumbPowerUp(clickedButtons)} name={name}/>
    </div>
  );
};

export default Grid;