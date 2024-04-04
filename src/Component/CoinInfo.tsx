import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import {chartDays} from  "../config/chartData"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import CustomButton from "./CustomButton";
import { SingleCoinData } from "../pages/CoinPage";
type Props = {
  coin: SingleCoinData;
}
type PriceData = [number, number][]
ChartJS.register(...registerables);

const CoinInfo = (props:Props) => {
  const { coin } = props;
  const [historicalData, setHistoricalData] = useState<PriceData>([]);
  const [days, setDays] = useState(1);
  const fetchData = async () => {
    const res = await fetch(HistoricalChart(coin.id, days, "INR"));
    if (!res.ok) throw new Error("Historical Chart is not working");
    const data = await res.json();
    setHistoricalData(data.prices);
    console.log(historicalData,"historicalData")
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (

      <div >
        {!historicalData ? 
         <h1>Loading....</h1>
         : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${"INR"}`,
                    borderColor: "orangered",
                  },
                ],
              }}
              options={
                {
                    elements:{
                        point:{
                            radius:1,

                        }
                    }
                }
              }
            />
            <div style={{
                display:"flex",
                marginTop:"20px",
                justifyContent:"space-around",
                width:"100%",
            }}>
                {chartDays.map((day)=>(
                    <CustomButton
                    key={day.value}
                    onClick={()=>setDays(day.value)}
                    selected={day.value===days}
                    >{day.label}</CustomButton>
                ))}
            </div>
          </>
        )}
      </div>
 
  );
};

export default CoinInfo;
