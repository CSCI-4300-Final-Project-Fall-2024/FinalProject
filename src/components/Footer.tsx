import {
  RiFacebookLine,
  RiTwitterXFill,
  RiInstagramLine,
  RiLinkedinLine,
} from "react-icons/ri";
import "./footer.css";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background bottom-0 w-full h-64 px-48 mt-24">
      <div className="w-fit h-fit relative top-1/2 -translate-y-1/2 flex justify-between items-center">
        <div>
          <Image src="/white logo.png" alt="logo" width={180} height={100} />
        </div>
        <div>
          <Button variant="ghost" className="p-2 w-6 h-6 rounded-full">
            <RiFacebookLine />
          </Button>
          <Button variant="ghost" className="p-2 w-6 h-6 rounded-full">
            <RiTwitterXFill />
          </Button>
          <Button variant="ghost" className="p-2 w-6 h-6 rounded-full">
            <RiInstagramLine />
          </Button>
          <Button variant="ghost" className="p-2 w-6 h-6 rounded-full">
            <RiLinkedinLine />
          </Button>
        </div>
      </div>
    </footer>
  );
}
