
interface ChampionshipItemProps {
    name: string;
    position: number;
  }



  const ChampionshipItem1: React.FC<ChampionshipItemProps> = ({
    name,
    position,
  }) => {
    return (
      <div className="w-1/2  flex items-center p-2">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="rounded-full h-10 w-10 flex items-center justify-center ring-2 ring-black text-black mr-4">
            {position}
          </div>
          <h2 className="text-xl font-bold mr-14">{name}</h2>
        </div>
      </div>
    );
  };
  
  export default ChampionshipItem1;