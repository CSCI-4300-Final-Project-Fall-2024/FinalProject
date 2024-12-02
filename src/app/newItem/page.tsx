"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewItem() {
  const defaultItem = {
    _id: "",
    name: "",
    description: "",
    price: 0.0,
    picture: "",
  };

  const router = useRouter();
  const [item, setItem] = useState<ShoppingItem>(defaultItem);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create item");
      }

      setItem(defaultItem);
      router.push("/");
      alert("Item Added");
      console.log(item);
    } catch (error) {
      console.error(error);
      alert("Failed to create item");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md ml-28 flex flex-col gap-6"
    >
      <h2 className="text-3xl font-semibold">Create Item</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          value={item.name}
          id="name"
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          value={item.description}
          id="description"
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          value={item.price}
          id="price"
          onChange={(e) =>
            setItem({
              ...item,
              price: Number.parseFloat(e.target.value) || 0.0,
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          type="text"
          id="image"
          value={item.picture}
          onChange={(e) => {
            setItem({
              ...item,
              picture: e.target.value,
            });
          }}
        />
      </div>
      <Button variant="outline">Create Item</Button>
    </form>
  );
}
