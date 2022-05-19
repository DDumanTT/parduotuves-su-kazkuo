import RoulettePro from "react-roulette-pro";
import { useState, useRef } from "react";
import "react-roulette-pro/dist/index.css";

const prizes = [
  {
    id: "7d24b681-82d9-4fc0-b034-c82f9db11a59",
    image: "https://i.ibb.co/6Z6Xm9d/good-1.png",
  },
  {
    id: "9da9a287-952f-41bd-8c7a-b488938d7c7a",
    image: "https://i.ibb.co/T1M05LR/good-2.png",
  },
  {
    id: "04106f3f-f99f-47e4-a62e-3c81fc8cf794",
    image: "https://i.ibb.co/Qbm8cNL/good-3.png",
  },
  {
    id: "23c551bf-8425-4ffd-b7c2-77c87844f89d",
    image: "https://i.ibb.co/5Tpfs6W/good-4.png",
  },
  {
    id: "e4060930-538f-4bf7-ab8e-8d2aa05fba43",
    image: "https://i.ibb.co/64k8D1c/good-5.png",
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
  const prizeIndex = useRef();

  const handleStart = () => {
    if (!start) {
      prizeIndex.current =
        prizes.length * 4 + Math.floor(Math.random() * prizes.length);
      console.log(prizeIndex.current);
      setStart(true);
    }
  };

  const handlePrizeDefined = () => {
    setStart(false);
    console.log("🥳 Prize defined! 🥳");
    console.log(prizeList[prizeIndex.current]);
  };

  return (
    <>
      <div className="h-25">
        <h1 className="display-1">Lottery</h1>
      </div>
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex.current}
        start={start}
        // design="GracefulLines"
        designOptions={{ withoutAnimation: true }}
        onPrizeDefined={handlePrizeDefined}
        soundWhileSpinning={"/amogus.mp3"}
      />
      <button onClick={handleStart}>Start</button>
    </>
  );
}
