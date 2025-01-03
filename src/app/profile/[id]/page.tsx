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
import { profileValidation } from "@/lib/Validation";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/stores/currentUser";
import Axios from "@/app/utils/axios";
import Logout from "@/app/components/Logout";
import { Response, User } from "@/app/interface/user";
import Link from "next/link";

function Profile({ params }: { params: { id: string } }) {
  let { setUser, setLoading, loading, user } = useUserStore();
  let { toast } = useToast();
  console.log(loading);
  let [userInfo, setUserInfo] = useState<User>({});
  console.log(userInfo);
  let router = useRouter();
  const form = useForm<z.infer<typeof profileValidation>>({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      password: "",
      email: user?.email,
      username: user?.username,
    },
  });
  /********************Onsubmit******************************/
  const onSubmit = (value: z.infer<typeof profileValidation>) => {
    let { email, username, password } = value;
    console.log(email, password);
    setLoading(true);
    Axios.post<Response>("/update", {
      email,
      username,
      password,
    }).then((data) => {
      if (data.data.success) {
        setUser(data.data.user);
        setLoading(false);
        toast({
          title: "Success",
          description: data.data.message,
        });
        router.push("/");
      } else {
        setLoading(false);
        toast({
          title: "Error",
          description: data.data.message,
        });
      }
    });
  };
  
    return (
      <div className="w-full h-screen flex items-center justify-center px-3 ">
        {/************************Forms******************************* */}
        <motion.div
          className="flex flex-col items-center justify-center w-[50%] "
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-4xl font-medium text-gray-950">Signup</p>
          <motion.div className="xl:w-[400px] w-[300px] h-full">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={user?.email}
                          disabled={true}
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={user?.username}
                          type="text"
                          placeholder="Username"
                          {...field}
                        />
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
                  <div className="flex items-center gap-2 w-full">
                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-full lg:text-lg text-sm disabled:bg-opacity-30"
                    >
                      Save
                    </Button>
                    <div className="w-full">
                      <Logout />
                    </div>
                  </div>

                  <Button type="button" className="w-full md:text-xl text-sm ">
                    <Link href="/createList">Crate list</Link>
                  </Button>
                </div>
              </form>
            </FormProvider>
          </motion.div>
        </motion.div>
      </div>
    );
  }


export default Profile;
