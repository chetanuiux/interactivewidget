import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Component/CoinInfo';

export type SingleCoinData = {
  name: string;
  id: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  description: {
    en: string;
  };
  market_cap_rank: string;
  market_data: {
    current_price: any;
    market_cap: any;
  };
};

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<SingleCoinData | null>(null);

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const fetchData = async () => {
    try {
      const response = await fetch(SingleCoin(id));
      if (!response.ok) {
        throw new Error('Coin Data is not working');
      }
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!coin ? (
        'Loading'
      ) : (
        <div className="grid md:grid-cols-[30%_70%] sm:grid-cols-1 gap-4">
          <div className="grid text-center ">
            <img className="grid justify-self-center"
              src={coin?.image.large}
              alt={coin?.name}
              height="200px"
              style={{ marginBottom: '20px' }}
            />  
            <h1 className="text-3xl font-bold">{coin?.name}</h1>
            <h1 className="text-xl font-md">{coin?.description.en.split('. ')[0]}.</h1>
            <div>
              <span>
                <h1 className="text-2xl font-bold">Position In Market: {coin?.market_cap_rank}</h1>
              </span>
              <span>
                <h1 className="text-2xl font-bold">
                  <span className="text-yellow-500">Current Price</span>: Rs{' '}
                  {numberWithCommas(coin?.market_data.current_price['inr'])}
                </h1>
              </span>
              <span>
                <h1 className="text-2xl font-bold">
                <span className="text-green-500">Market Cap</span>: Rs{' '}
                  {numberWithCommas(
                    coin?.market_data.market_cap['inr'].toString().slice(0, -6)
                  )}
                  M
                </h1>
              </span>
            </div>
          </div>
          <CoinInfo coin={coin} />
        </div>
      )}
    </div>
  );
};

export default CoinPage;
