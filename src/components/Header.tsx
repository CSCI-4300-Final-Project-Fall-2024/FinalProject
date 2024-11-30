"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { IoSearchOutline } from "react-icons/io5";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  const sessionButton = user?.id ? (
    <Button variant={"ghost"} onClick={() => signOut()}>
      <p>Logout</p>
    </Button>
  ) : (
    <Button asChild variant={"ghost"} onClick={() => signIn()}>
      <p>Login</p>
    </Button>
  );

  return (
    <div className="border-b border-muted-foreground bg-background text-foreground fixed w-full top-0 h-24 flex justify-between items-end px-48 py-3 z-10">
      <Link className="mb-[-12px]" href="/">
        <Image src="/logo.png" alt="logo" width={180} height={100} />
      </Link>
      <div className="flex flex-row gap-6 items-center">
        <span className="relative">
          <Input
            placeholder="What are you looking for?"
            className="bg-secondary border-none w-64"
          />
          <IoSearchOutline
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
            size={24}
          />
        </span>
        {sessionButton}
      </div>
    </div>
  );
}
