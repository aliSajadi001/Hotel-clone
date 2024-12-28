"use client";
import React from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Axios from "@/app/utils/axios";
import { profileValidation } from "@/lib/Validation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import useUserStore from "@/app/stores/currentUser";
import { useRouter } from "next/navigation";

function Profile({ params }: { params: { id: string } }) {
  let { toast } = useToast();
let router =useRouter()
  let { user, setLoading, loading } = useUserStore();
  const form = useForm<z.infer<typeof profileValidation>>({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      password: "",
      email: user?.email,
    },
  });
  interface Update {
    success: boolean;
    message: string;
  }
  const onSubmit = (value: z.infer<typeof profileValidation>) => {
    setLoading(true);
    let { email, password } = value;
    Axios.post<Update>("/update", { email, password })
      .then((data) => {
        if (data.data.success) {
          router.push("/")
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
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className=" w-[90%] md:w-[50%] h-full flex flex-col items-center justify-center "
      >
        <p className="text-lg  font-medium md:text-3xl w-full text-center">
          My profile
        </p>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="disabled:cursor-not-allowed"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
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
                className="w-full lg:text-lg text-sm disabled:bg-opacity-30 disabled:cursor-not-allowed"
              >
                Save changes
              </Button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
}

export default Profile;
