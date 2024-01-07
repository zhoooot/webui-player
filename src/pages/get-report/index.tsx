// create a dialog for asking user to yes or no to receive report 
import React, { useState } from 'react';
import Image from 'next/image';
import Image0 from '/public/images/background/background-classroom.svg';

const GetReportPage: React.FC = () => {
    return (
        <div className='w-screen h-screen'
            style={{
                backgroundImage: `url('/images/background/background-classroom.svg')`,
                backgroundSize: 'cover',
            }}>
            <div className='grid w-full h-full justify-items-center items-center self-center'>
                <div className='self-center align-middle grid justify-items-center items-center rounded-lg bg-white h-1/3 w-1/3'>
                    <div className='font-bold text-3xl align-middle text-center'>Wanna receive your report?
                    <div className='flex flex-row w-full align-middle self-center mt-10 justify-items-center items-center pl-10 pr-10'>
                        <button className='bg-green-500 hover:bg-green-700 text-2xl  text-white font-bold w-24 h-16 rounded-lg m-4 grow'>Yes</button>
                        <button className='bg-red-500 hover:bg-red-700 text-white text-2xl font-bold w-24 h-16 rounded-lg m-4 grow'>No</button>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default GetReportPage;