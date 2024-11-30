"use client";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { ShoppingItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import ItemCarousel from "@/components/ItemCarousel";

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredItems = items.filter((item: ShoppingItem) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="px-52">
      <Nav />
      <div className="h-12"></div>
      <div>
        <div className="text-primary flex flex-row items-center text-sm font-thin mb-4">
          <div className="h-8 w-4 bg-primary rounded-sm mr-2" />
          <span>Featured</span>
        </div>
        <span className="relative">
          <Input
            placeholder="What are you looking for?"
            className="bg-secondary border-none w-64 my-4"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchOutline
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
            size={24}
          />
        </span>
        <h2 className="text-2xl font-bold">For Sale</h2>
        <div className="flex flex-row gap-8 mt-4">
          {items.length === 0 && (
            <div className="w-full">No items to display</div>
          )}
          <ItemCarousel items={filteredItems} getItems={getItems} />
        </div>
      </div>
    </div>
  );
}
