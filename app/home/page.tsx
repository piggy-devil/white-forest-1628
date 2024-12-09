"use client";

import { SignOut } from "@/components/signout-button";
import { useSession } from "next-auth/react";
import Image from "next/image";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        {session?.user?.image && (
          <Image
            src={session.user.image!}
            alt="Image"
            width={48}
            height={48}
            className="rounded-full mb-2"
          />
        )}
        <SignOut />
      </div>
    </main>
  );
};

export default HomePage;
