"use client";
import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Axios from "../utils/axios";
import { Login } from "../interface/user";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
function Googleauth() {
  let [loading, setLoading] = useState<boolean>(false);

  let router = useRouter();
  let handleSignin = async () => {
    try {
      let googleProvider = new GoogleAuthProvider();
      let auth = getAuth(app);
      let result = await signInWithPopup(auth, googleProvider);
      if (result) {
        let login = async () => {
          try {
            setLoading(true);
            let { email }: { email: string | null } = result.user;
            await Axios.post<Login>("/login", { email })
              .then((data) => {
                if (data?.data.success) {
                  setLoading(false);
                  router.push("/");
                  toast({
                    description: data.data.message,
                  });
                } else {
                  setLoading(false);
                  toast({
                    variant: "destructive",
                    description: data.data.message,
                  });
                }
              })
              .catch((error: any) => {
                setLoading(false);
                console.log(error);
              });
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        login();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <Button
        disabled={loading}
        type="button"
        onClick={handleSignin}
        className=" w-full text-sm md:text-md font-medium flex items-center disabled:bg-opacity-35"
      >
        <p>Signin with </p>
        <Image
          src="/icons8-google-500.png"
          width={50}
          height={50}
          alt="ph"
          className="md:w-[37px] md:h-[37px] w-[30px] h-[30px]"
        />
      </Button>
    </div>
  );
}

export default Googleauth;
