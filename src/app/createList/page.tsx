"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useUserStore from "../stores/currentUser";
import { UploadButton } from "../utils/uploadthing";
import Image from "next/image";
import Axios from "../utils/axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
function CrateListing() {

  let router = useRouter();
  let { toast } = useToast();
  let { setLoading, loading , user} = useUserStore();
  let [name, setName] = useState<string>("");
  let [description, setDescription] = useState<string>("");
  let [address, setAddress] = useState<string>("");
  let [images, setImages] = useState<string[]>([]) 
  let [parcking, setParcking] = useState<boolean>(false);
  let [type, setType] = useState<string>("");
  let [furnished, setFurnished] = useState<boolean>(false);
  let [bedrooms, setBedrooms] = useState<number>(1);
  let [bathrooms, setBathrooms] = useState<number>(1);
  let [offer, setOffer] = useState<boolean>(false);
  let [regularPrice, setRegularPrice] = useState<number>(0);
  let [discountPrice, setDiscountPrice] = useState<number>(0);


  let handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { id, checked } = e.target;
    if (checked) {
      setType(id);
    } else {
      setType("");
    }
  };
  let handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await Axios.post("/addList", {
        name,
        description,
        furnished,
        offer,
        type,
        parcking,
        address,
        bedrooms,
        bathrooms,
        regularPrice,
        images,
        discountPrice,
        userRef : user?._id
      }).then((data) => {
        if (data?.data.success) {
          toast({
            title: "Success",
            description: data.data.message,
          });
          router.push("/");
          setLoading(false);
        } else {
          toast({
            title: "Error",
            description: "Error in crate list",
          });
          setLoading(false);
        }
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
         <div className="overflow-y-auto">
      <div className=" px-5 ">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/************************Forms*********************** */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-10 items-center "
          >
            {/************************************* */}
            <div className=" h-full flex flex-col lg:flex-row gap-10 items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-5 w-full h-full lg:w-1/2">
                <p className="flexitems-center justify-center text-xl font-medium">
                  Create listing
                </p>
                {/********************Name inputr********************* */}
                <Input
                  className="w-auto placeholder:text-sm md:placeholder:text-lg md:w-full h-[30px] "
                  placeholder="name"
                  type="text"
                  value={name}                  onChange={(e) => setName(e.target.value)}
                />
                {/*************************Textarea ************************* */}
                <Textarea
                  className="w-auto placeholder:text-sm md:placeholder:text-lg md:w-full h-[30px] "
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/********************************Address input***************** */}
                <Input
                  className="w-auto placeholder:text-sm md:placeholder:text-lg md:w-full h-[30px] "
                  placeholder="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {/*********************************Checboxs********************* */}
                <div className="flex items-center justify-center w-full gap-6 flex-wrap ">
                  <div className="flex items-center gap-1">
                    <Input
                      type="checkbox"
                      id="terms"
                      checked={furnished}
                      onChange={(e) => setFurnished(e.target.checked)}
                    />
                    <span className="text-xs md:text-md">Furnished</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="checkbox"
                      id="sell"
                      checked={type === "sell"}
                      onChange={handleCheck}
                    />
                    <span className="text-xs md:text-md">Sell</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="checkbox"
                      id="rent"
                      checked={type === "rent"}
                      onChange={handleCheck}
                    />
                    <span className="text-xs md:text-md">Rent</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="checkbox"
                      id="terms"
                      checked={parcking}
                      onChange={(e) => setParcking(e.target.checked)}
                    />
                    <span className="text-xs md:text-md">Parking</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="checkbox"
                      id="terms"
                      checked={offer}
                      onChange={(e) => setOffer(e.target.checked)}
                    />
                    <span className="text-xs md:text-md">Offer</span>
                  </div>
                </div>
                {/**************************Number inputs******************************* */}
                <div className="flex items-center gap-5 flex-wrap ">
                   <div className="flex items-center gap-1">
                    <Input
                      className="w-[80px] text-sm md:text-lg md:w-full h-[25px] "
                      defaultValue={1}
                      min={0}
                      type="number"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                    />
                    <span className="text-xs md:w-md">Price</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      className="w-[80px] text-sm md:text-lg md:w-full h-[25px] "
                      defaultValue={1}
                      min={0}
                      type="number"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                    />
                    <span className="text-xs md:w-md">Discount</span>
                  </div>
                 
                  <div className="flex items-center gap-1">
                    <Input
                      className="w-[80px] text-sm md:text-lg md:w-full h-[25px] "
                      defaultValue={1}
                      min={0}
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                    />
                    <span className="text-xs md:w-md">Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      className="w-[80px] text-sm md:text-lg md:w-full h-[25px] "
                      defaultValue={0}
                      min={0}
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    />
                    <span className="text-xs md:w-md">Bedrooms</span>
                  </div>
                </div>
              </div>
              {/********************************Inser images************************** */}
              <div className="  flex flex-col items-center justify-center h-full gap-5 w-full overflow-y-auto">
                <p className="text-sm lg:text-md">
                  Upload yor images , up to 10.
                </p>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      for (let i = 0; i < res.length; i++) {
                        setImages((prev) => [...prev, res[i].url]);
                      }
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <div className="grid grid-cols-5 gap-2">
                  {images.length > 0 &&
                    images.map((img, i) => (
                      <Image
                        className="w-[80px] h-[70px]"
                        src={img}
                        key={i}
                        width={100}
                        height={100}
                        alt="image"
                      />
                    ))}
                </div>
              </div>
            </div>
            {/****************Submit button*************** */}
            <Button
              type="submit"
              disabled={loading}
              className=" p-2 rounded-md w-[50%] disabled:cursor-not-allowed"
            >
              Crate
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
    </div>
 
  );
}

export default CrateListing;
