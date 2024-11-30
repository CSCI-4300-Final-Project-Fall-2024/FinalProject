import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";

type ItemProps = {
  id: string;
  name: string;
  salePrice: number;
  originalPrice: number;
  ratingoo5: number;
  ratingCount: number;
  imgSrc: string;
  getItems: () => void;
};

export default function Item({
  id,
  name,
  salePrice,
  originalPrice,
  ratingoo5,
  ratingCount,
  imgSrc,
  getItems,
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
      getItems();
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
