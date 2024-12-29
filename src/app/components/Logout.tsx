import { Button } from "@/components/ui/button";
import React from "react";
import Axios from "../utils/axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Logout } from "../interface/user";
import useUserStore from "../stores/currentUser";

function Logout() {
  let { setLoading, loading } = useUserStore();
  let { toast } = useToast();
  let router = useRouter();
  let handleLogout = async () => {
    try {
      setLoading(true);
      await Axios.get<Logout>("/logout")
        .then((data) => {
          console.log(data);
          if (data.data.success) {
            router.push("/signup");
            setLoading(false);
            toast({
              description: data.data.message,
            });
          } else {
            setLoading(false);
            toast({
              description: data.data.message,
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={handleLogout}
        disabled={loading}
        className="w-full disabled:bg-opacity-30 disabled:cursor-not-allowed"
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
