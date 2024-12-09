"use client";

import { SignOut } from "@/components/signout-button";
import MyImage from "@/lib/MyImage";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();

  console.log("session : ", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <MyImage
          src={session?.user?.image!}
          alt="User Image"
          width={48}
          height={48}
          className="rounded-full"
        />
        <SignOut />
      </div>
    </main>
  );
};

export default HomePage;
