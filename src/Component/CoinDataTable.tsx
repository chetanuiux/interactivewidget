import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
interface CoinData {
  id:string
  name: string;
  current_price: number;
  high_24h: number;
  low_24h: number;
  image:string
  price_change_percentage_24h:number
  symbol:string
}

const CoinDataTable: React.FC = () => {
  const navigate = useNavigate();
  const [coinTableData, setCoinTableData] = useState<CoinData[]>([]);
  const [search,setSearch]=useState<string>("")
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);

  const fetchCoins = async () => {
    try {
      const response = await fetch( CoinList());
      if (!response.ok) {
        throw new Error("Unable to fetch data from CoinList");
      }
      const data: CoinData[] = await response.json();
      setCoinTableData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = () => {
    return coinTableData.filter(
      (coinTableData) =>
      coinTableData.name.toLowerCase().includes(search.toLowerCase()) ||
      coinTableData.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    const intervalId = setInterval(fetchCoins,30000);
    return () => clearInterval(intervalId); 
  }, []);
  
  useEffect(() => {
    fetchCoins(); 
  }, []);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="text-2xl font-semibold text-center my-2">CryptoCurrency Prices by Market Cap</div>
      <input placeholder="Search Your CryptoCurrency here" className=" flex bg-transparent border-2 border-gray-500 w-[50%] p-2 outline-none mx-auto my-4" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <table className="table-auto w-[100%]">
        <thead>
          <tr>
            {[
              "Crypto Currency",
              "Price",
              "Profit",
              "Highest (24Hr)",
              "Lowest (24Hr)"
            ].map((heading, index) => (
              <th key={index} className="text-left font-bold text-2xl bg-orange-900 text-center py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {handleSearch().slice(indexOfFirstCoin, indexOfLastCoin).map((coinData, index) => {
            const lowest = coinData.low_24h.toFixed(2);
            return (
              <tr className="cursor-pointer" onClick={() => navigate(`coins/${coinData.id}`)} key={index}>
                <td className="flex flex-auto items-center font-bold text-xl py-4 gap-2 justify-center"><img width={50} src={coinData.image} alt="cryptiImg"/>{coinData.name}</td>
                <td className="text-center">Rs {coinData.current_price}</td>
                <td className={`${coinData.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"} text-center`}>

                  {coinData.price_change_percentage_24h>0
                  ?
                  `+${coinData.price_change_percentage_24h}`
                  :`${coinData.price_change_percentage_24h}`}%
                  </td>
                <td className="text-green-600 font-medium text-center">Rs {coinData.high_24h}</td>
                <td className="text-yellow-500 font-medium text-center">Rs {lowest}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastCoin >= coinTableData.length}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoinDataTable;

