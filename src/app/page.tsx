"use client";

import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { ShoppingItem } from "@/lib/types";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="px-52">
      <Nav />
      <div className="h-12"></div>
      <div>
        <div className="text-primary flex flex-row items-center text-sm font-thin mb-4">
          <div className="h-8 w-4 bg-primary rounded-sm mr-2" />
          <span>Featured</span>
        </div>
        <h2 className="text-2xl font-bold">For Sale</h2>
        <div className="flex flex-row gap-8 mt-4">
          {items.length === 0 && (
            <div className="w-full">No items to display</div>
          )}
          <ItemCarousel items={items} />
        </div>
      </div>
    </div>
  );
}

type ItemProps = {
  id: string;
  name: string;
  salePrice: number;
  originalPrice: number;
  ratingoo5: number;
  ratingCount: number;
  imgSrc: string;
};

function Item({
  id,
  name,
  salePrice,
  originalPrice,
  ratingoo5,
  ratingCount,
  imgSrc,
}: ItemProps) {
  const { data: session } = useSession();
  const user = session?.user;

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      alert("Item Deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="flex flex-col gap-2 relative hover:shadow-lg p-4 bg-white rounded-md group">
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={`Picture of ${name}`}
          width={200}
          height={200}
          className="min-w-52 h-52"
        />
      ) : (
        <div className="w-52 h-52 bg-secondary mb-2" />
      )}
      <div className="font-bold">{name}</div>
      <div className="inline-flex gap-4 font-bold">
        <span className="text-primary">${salePrice}</span>
        <span className="text-muted-foreground line-through font-light">
          ${originalPrice}
        </span>
      </div>
      <div className="inline-flex gap-1 items-center">
        {Array(Math.floor(ratingoo5))
          .fill(0)
          .map((_, index) => (
            <FaStar className="text-orange-300" key={index} />
          ))}
        <span className="text-muted-foreground ml-1">({ratingCount})</span>
      </div>
      {user?.id && (
        <div className="hidden group-hover:block">
          <Link href={`/editItem/${id}`}>
            <MdEdit className="text-gray-500 absolute top-60 right-12 cursor-pointer w-6 h-6" />
          </Link>
          <IoMdCloseCircle
            className="text-red-500 absolute top-60 right-4 cursor-pointer w-6 h-6"
            onClick={() => deleteItem(id)}
          />
        </div>
      )}
    </div>
  );
}

type ItemCarouselProps = {
  items: ShoppingItem[];
};

function ItemCarousel({ items }: ItemCarouselProps) {
  const [marginLeft, setMarginLeft] = useState(0);

  const style = {
    transition: "0.25s ease-in-out margin",
    marginLeft: `${marginLeft}rem`,
  };

  return (
    <div className="w-full h-fit overflow-clip">
      <div className="flex flex-row gap-4" style={style}>
        {items.map((item, index) => (
          <Item
            key={index}
            id={item._id}
            name={item.name}
            salePrice={item.price}
            originalPrice={100}
            ratingCount={150}
            ratingoo5={4.3}
            imgSrc={item.picture}
          />
        ))}
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
