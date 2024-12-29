"use client";
import React from "react";
import { Bed } from "lucide-react";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { searchValidation } from "../../lib/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { House } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Moon, LaptopMinimal, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import useUserStore from "../stores/currentUser";

function Navbar() {
  let { user } = useUserStore();
  let path = usePathname();
  let { setTheme } = useTheme();
  const form = useForm<z.infer<typeof searchValidation>>({
    resolver: zodResolver(searchValidation),
    defaultValues: {
      text: "",
    },
  });
  const onSubmit = (value: z.infer<typeof searchValidation>) => {
    console.log(value);
  };
  return (
    <motion.div
      className="w-full h-[50px] flex items-center dark:bg-white dark:bg-opacity-10 dark:backdrop-blur-sm bg-slate-500 bg-opacity-15 backdrop-blur-sm px-4 fixed top-0 left-0 z-50"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full h-full flex items-center justify-between">
        <div>
          <Bed />
        </div>
        {/********************Search inpute*************************** */}
        {path === "/signup" ? (
          <></>
        ) : (
          <>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="hidden md:flex items-center gap-2 max-w-[500px]  "
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Search..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-[70px] h-[35px] font-medium">
                  Search
                </Button>
              </form>
            </FormProvider>
          </>
        )}

        {/******************** Profile Home...Icons****************** */}
        <div className="flex items-center gap-3 ">
          <Link href="/">
            <House className="text-xl hover:scale-105" />
          </Link>
          {user ? (
            <Link href={`/profile/${user?._id}`}>
              <Avatar>
                <AvatarFallback>{user?.username?.toString()[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <>
              <Link href="signup" className="font-medium">
                Signup
              </Link>
            </>
          )}
          {/*************************Goggle mode******************** */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[2px] w-[2px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[2px] w-[2px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="w-[30px] h-[30px] space-y-1 p-1" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="w-[30px] h-[350x] space-y-1 p-1" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <LaptopMinimal className="w-[30px] h-[30px] space-y-1 p-1" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
