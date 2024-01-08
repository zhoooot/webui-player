import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Image0 from '/public/icons/Icon.png';
interface PlayerProps {
  name: string;
  onClick1: (index:number) => void;
  new_member:string;
  index:number;
}

const Player: React.FC<PlayerProps> = ({ name, onClick1,new_member, index  }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSimilar, setIsSimilar] = useState(new_member==name?true:false);
   console.log(isSimilar);
   useEffect(() => {
    
      setTimeout(() => {
        setIsVisible(true)
      }, 300);
    
  }, []);

  return (
    
    <div className={isSimilar? (isVisible?('transition-transform scale-100 duration-[1500ms] w-fit mx-5 rounded-lg bg-white'):('transform translate-y-[100vh] opacity-0')):('w-fit mx-5 rounded-lg')} 
    onClick={() => onClick1(index)}>
      <div className='flex flex-row justify-center items-center'>
        <Image src={Image0} alt='player count' className='bg-purple-200 rounded-tl-lg rounded-bl-lg' width={40} height={40} />
        <p className='text-black font-bold text-lg flex-1 px-2 hover:line-through hover:cursor-default'>{name}</p>
      </div>
      </div>
  );
}

export default Player;