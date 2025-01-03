"use client";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import useUserStore from "./stores/currentUser";
import useAuth from "./hooks/isAuth";
export default function Home() {
 let {loading } = useUserStore()
 console.log(new Date(1403 , 1 , 0).getDate())
 useAuth()
  if (loading) {
    return (
      <div className=" absolute flex flex-col items-center justify-center dark:bg-white dark:bg-opacity-10 inset-0">
        <motion.div
          animate={{ rotateY: 180 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        >
          <Image
            src="/9922103.png"
            alt="dp"
            width={100}
            height={100}
            className="md:w-[100px] md:h-[100px] w-[50px] h-[50px]"
          />
        </motion.div>
        <p className="md:text-2xl text-lg">Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
    </div>
  );
}
