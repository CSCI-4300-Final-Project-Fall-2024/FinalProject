"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingItem } from "@/lib/types";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewItem() {
  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const defaultItem = {
    _id: "",
    name: "",
    description: "",
    price: 0.0,
    picture: "",
  };

  const [item, setItem] = useState<ShoppingItem>(defaultItem);

  useEffect(() => {
    if (id) {
      fetch(`/api/items/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setItem(data.item);
        });
    }
  }, [id]);

  const updateItem = async (e: any) => {
    e.preventDefault();

    try {
      await fetch(`/api/items/${id}`, {
        method: "PUT",
        body: JSON.stringify(item),
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-md ml-28 flex flex-col gap-6"
    >
      <h2 className="text-3xl font-semibold">Update Item</h2>
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
      <Button variant="outline" onClick={(e) => updateItem(e)}>
        Update Item
      </Button>
    </form>
  );
}
