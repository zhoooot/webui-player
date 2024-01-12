// pages/index.js
import React, { useEffect } from 'react';
import Loading from './components/loading';
import { Player } from '../../logic/player';
import router from "next/router";
import { ClientPlayer } from '@/logic/client-player';
import { Socket } from 'socket.io-client';

interface ReadyProps{
  point: number;
  index: number;
}


const Home: React.FC<ReadyProps> = ({point, index}) => {

  // const [socket, setSocket] = React.useState<Socket | null>(null);

  // useEffect(() => {
  //   const newSocket = Player.getPlayerClient().socketClient;
  //   if (newSocket) { newSocket.emit("join", {
  //     room: localStorage.getItem("pin"),
  //     username: localStorage.getItem("username"),
  //   });}
   
    
  //   setSocket(newSocket);
  //   return () => {
  //     if (socket) socket.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   // socket?.on('start', (message: any) => {
  //   //   router.replace('../gameblock/player')
  //   // });
  //   socket?.on('kicked', (message: any) => {
  //     router.replace('../join/pinInput')
  //   });
    
  // })

  
  const name = localStorage.getItem("username") || "shut the fuk up";
  return (
    <div className="mx-auto  w-screen h-screen bg-gray-100">
      <Loading name={name} point={point} index={index} />
    </div>
  );
};

export default Home;