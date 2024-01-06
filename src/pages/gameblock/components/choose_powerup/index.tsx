// pages/index.js
import React from 'react';
import Grid from './components/power_ups';
// const powerupID = [0, 1, 2, 3];
// const powerupUsed = [true, true, false, false];
interface ChoosePowerUpProps {
    powerupID: number[];
    powerupUsed: boolean[];
}
const ChoosePowerUp: React.FC<ChoosePowerUpProps> = ({powerupID, powerupUsed}) => {
    return (

        <div className="mx-auto pt-4 pb-1 pl-4 pr-4 w-full h-screen bg-gray-100">
            <div className='flex flex-col'><h1 className="text-4xl self-center font-bold align-middle justify-center grid bg-white mb-4 mt-16 p-4">Choose one power-ups</h1></div>
            <Grid powerupID={powerupID} powerupUsed={powerupUsed} />
        </div>
    );
};

export default ChoosePowerUp;