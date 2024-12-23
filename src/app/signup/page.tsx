"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { registerValidation } from "@/lib/Validation";
import Axios from "../utils/axios";
import { Response } from "../interface/user";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "../stores/currentUser";
import { useRouter } from "next/navigation";
import Googleauth from "../components/Googleauth";

function Signup() {
  let router = useRouter();
  let { setUser, user } = useUserStore();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  let { toast } = useToast();
  let [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  /***************Handle submit************************* */
  const onSubmit = (value: z.infer<typeof registerValidation>) => {
    setLoading(true);
    let { email, password } = value;
    Axios.post<Response>("/register", { email, password })
      .then((data) => {
        if (data?.data.success) {
          toast({
            description: data.data.message,
          });
          setUser(data.data.user);
          setLoading(false);
          router.push("/");
        } else {
          setLoading(false);
          toast({
            variant: "destructive",
            description: data.data.message,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
          className="w-full h-full"
        />
      </motion.div>
      {/************************Forms******************************* */}
      <motion.div
        className="flex flex-col items-center justify-center w-[50%] "
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="md:text-3xl text-xl font-medium">Register</p>
        <motion.div className="xl:w-[400px] w-auto  h-full">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/************************Buttons******************************* */}
              <div className="w-full flex flex-col items-center gap-3 ">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full lg:text-lg text-sm disabled:bg-opacity-30"
                >
                  Submit
                </Button>
                <p className="text-blue-600 text-sm">
                  Do you have an account ?
                </p>
                {/************************Signin with firebase******************************* */}
                <div className=" flex items-center gap-1 w-full">
                  <Googleauth />
                </div>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
