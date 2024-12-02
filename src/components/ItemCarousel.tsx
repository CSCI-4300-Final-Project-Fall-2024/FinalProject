import { ShoppingItem } from "@/lib/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Item from "./Item";
import Rand, { PRNG } from "rand-seed";

type ItemCarouselProps = {
  items: ShoppingItem[];
  getItems: () => void;
};

export default function ItemCarousel({ items, getItems }: ItemCarouselProps) {
  const [marginLeft, setMarginLeft] = useState(0);

  const style = {
    transition: "0.25s ease-in-out margin",
    marginLeft: `${marginLeft}rem`,
  };

  return (
    <div className="w-full h-fit overflow-clip">
      <div className="flex flex-row gap-4" style={style}>
        {items.map((item, index) => {
          const rand = new Rand(item._id); // [0, 1)
          return (
            <Item
              key={index}
              id={item._id}
              name={item.name}
              salePrice={item.price}
              originalPrice={item.price * (1 + rand.next())}
              ratingCount={Math.floor(rand.next() * 50)}
              ratingoo5={Math.floor(rand.next() * 51) / 10}
              imgSrc={item.picture}
              getItems={getItems}
            />
          );
        })}
      </div>
      <div className="px-4 py-8 flex flex-row gap-4">
        <Button
          onClick={() => setMarginLeft(Math.min(marginLeft + 28, 0))}
          variant={"secondary"}
          className="rounded-full w-10 h-10 border-2"
        >
          <FaArrowLeft />
        </Button>
        <Button
          onClick={() =>
            setMarginLeft(Math.max(marginLeft - 28, -1 * items.length * 28))
          }
          variant={"secondary"}
          className="rounded-full w-10 h-10 border-2"
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
