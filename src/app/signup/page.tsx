"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { registerValidation } from "../lib/Validation";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function Signup() {
  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const onSubmit = (value: z.infer<typeof registerValidation>) => {
    console.log(value);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center  ">
      {/************************image******************************* */}
      <motion.div
        className=" hidden md:block md:w-[50%] h-full"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/NAC_Web-travel-holidays-image-2.png"
          alt="image"
          width={400}
          height={300}
          className="w-full h-full "
        />
      </motion.div>
      {/************************Forms******************************* */}

      <motion.div
        className="flex flex-col items-center justify-center w-[50%] "
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-4xl font-medium text-gray-950">Signup</p>
        <motion.div className="xl:w-[400px] w-[300px] h-full">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/************************Buttons******************************* */}
              <div className="w-full flex flex-col items-center gap-3 ">
                <Button type="submit" className="w-full lg:text-lg text-sm">
                  Submit
                </Button>
                <Button type="button" className="w-full lg:text-lg text-sm">
                  Signin with google
                </Button>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
