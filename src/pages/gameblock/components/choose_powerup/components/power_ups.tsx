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

interface GridProps {
powerupID: number[];
powerupUsed: boolean[];    
}


const Grid: React.FC<GridProps>=({powerupID, powerupUsed})=> {
  const imageUrls = [Image0, Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];



  //get imageurl from on powerupused, if not used then add to a new array
  const imageUrlsNotUsed = [];
  const powerupIDNotUsed: number[] = [];
  
  for (let i = 0; i < powerupUsed.length; ++i) {
    if (!powerupUsed[i]) {
      imageUrlsNotUsed.push(imageUrls[powerupID[i]]);
      powerupIDNotUsed.push(powerupID[i]);
    }
  }
  console.log(powerupIDNotUsed);
  // onClick changed the value for powerupUsed
  const onClick = () => {
    for (let i=0; i<clickedButtons.length; ++i)
    {
      if (clickedButtons[i])
      {
        for (let j=0; j<powerupUsed.length; ++j)
        {
          if (powerupIDNotUsed[i]===powerupID[j])
          {
            powerupUsed[j]=true;
            break;
          }
        }
        break;
      }
    }
  }

  // State to track the clicked status of each button
  const [clickedButtons, setClickedButtons] = useState(Array(imageUrlsNotUsed.length).fill(false));
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
    if (getNumbPowerUp(updatedClickedButtons)<=1)
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

        <div className={`flex justify-between gap-4 align-middle justify-items-center items-center`}>
        {imageUrlsNotUsed.map((imageUrl, index) => (
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
    <PlayerBar index={getNumbPowerUp(clickedButtons)} name={name} onClick={onClick}/>
    </div>
  );
};

export default Grid;