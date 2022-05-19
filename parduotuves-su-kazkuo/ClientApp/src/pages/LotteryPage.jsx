import RoulettePro from "react-roulette-pro";
import { useState, useRef, useEffect } from "react";
import "react-roulette-pro/dist/index.css";

import axios from "../api/axios";
import { Button } from "reactstrap";

const prizes = [
  {
    id: "a44c728d-8a0e-48ca-a963-3d5ce6dd41b0--78333MHLC0BotmFCT5BRV",
    image: "https://i.ibb.co/ZLHZgKf/good-0.png",
    text: "Monoblock Apple iMac 27",
  },
  {
    id: "7d24b681-82d9-4fc0-b034-c82f9db11a59--4OJy7B9O7gH826fUeNjaQ",
    image: "https://i.ibb.co/6Z6Xm9d/good-1.png",
    text: "Apple MacBook Pro 13 Late 2020",
  },
  {
    id: "9da9a287-952f-41bd-8c7a-b488938d7c7a--gxjECiWlUdEVVjcKLAyj2",
    image: "https://i.ibb.co/T1M05LR/good-2.png",
    text: "Apple iPhone 13 Pro Max 512GB",
  },
  {
    id: "04106f3f-f99f-47e4-a62e-3c81fc8cf794--GpYrQ3UU865PaTXnAvGjk",
    image: "https://i.ibb.co/Qbm8cNL/good-3.png",
    text: "Apple MacBook Pro M1 13 256GB",
  },
  {
    id: "23c551bf-8425-4ffd-b7c2-77c87844f89d--Q3MaOe2mkbbjlhfSIpNz4",
    image: "https://i.ibb.co/5Tpfs6W/good-4.png",
    text: "MacBook Air 13",
  },
  {
    id: "e4060930-538f-4bf7-ab8e-8d2aa05fba43--WhlCJsma2bRjHCXxaAyGZ",
    image: "https://i.ibb.co/64k8D1c/good-5.png",
    text: "Apple iPad Pro 12.9",
  },
  {
    id: "fb121804-e4f6-4fce-bdd6-1e3189172f37--4rpJvwnG1l20F2Z68ZRM_",
    image: "https://i.ibb.co/TLjjsG3/good-6.png",
    text: "Apple AirPods Max",
  },
  {
    id: "c769c2b1-df6e-4e6e-8985-53b531527b35--CIS8g56oVl3zxsKsvSWFT",
    image: "https://i.ibb.co/HVpYpsH/good-8.png",
    text: "Apple Watch Series 6 44mm",
  },
];

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill("_")
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const prizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
];

export default function LotteryPage() {
  const [start, setStart] = useState(false);
  const [tickets, setTickets] = useState(0);
  const [wonPrize, setWonPrize] = useState();
  const prizeIndex = useRef(0);

  useEffect(() => {
    axios.get("accounts/tickets").then((r) => setTickets(r.data));
  }, []);

  const StartWheelSpin = () => {
    if (!start) {
      axios.delete("accounts/spin").then((r) => {
        prizeIndex.current =
          prizes.length * 4 + Math.floor(Math.random() * prizes.length);
        setTickets((prev) => prev - 1);
        setStart(true);
      });
    }
  };

  const handlePrizeDefined = () => {
    setStart(false);
    setWonPrize(prizeList[prizeIndex.current]);
    console.log("🥳 Prize defined! 🥳");
  };

  return (
    <>
      <div className="h-25">
        <h1 className="display-1">Lottery</h1>
        <h5>Tickets: {tickets}</h5>
        {wonPrize && <>🥳 You won {wonPrize.text} 🥳</>}
      </div>
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex.current}
        start={start}
        designOptions={{ withoutAnimation: true }}
        onPrizeDefined={handlePrizeDefined}
        // soundWhileSpinning={"/amogus.mp3"}
      />
      <Button
        className="mt-5"
        onClick={StartWheelSpin}
        disabled={tickets <= 0 || !!start}
        size="lg"
      >
        Spin
      </Button>
    </>
  );
}
