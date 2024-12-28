"use client";
import { useEffect } from "react";
import Axios from "../utils/axios";
import useUserStore from "../stores/currentUser";
const useAuth = () => {
  let { setLoading, setUser } = useUserStore();
  try {
    useEffect(() => {
      let auth = async () => {
        try {
          setLoading(true);
          await Axios.get("/auth").then((data) => {
            if (data && !data.data.success) {
              setUser(null);
              setLoading(false);
            } else {
              setUser(data.data.user);
              setLoading(false);
            }
          });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      auth();
    }, []);
  } catch (err) {
    setLoading(true);
    console.log(err);
  }
};
export default useAuth;
