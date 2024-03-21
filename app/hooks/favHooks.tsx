import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { safeUser } from "../Types";
import userLoginHook from "./UserLoginHook";

interface userFav {
  listingId: string;
  currentUser?: safeUser | null;
}

const usefav = ({ listingId, currentUser }: userFav) => {
  const router = useRouter();

  const loginModal = userLoginHook();

  const hasFav = useMemo(() => {
    const list = currentUser?.favs || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFav = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFav) {
          request = () => axios.delete(`/api/Fav/${listingId}`);
          toast.success("Removed Successfully");
        } else {
          request = () => axios.post(`/api/Fav/${listingId}`);
          toast.success("Added Successfully");
        }

        await request();
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong. Please try again later");
      }
    },
    [currentUser, hasFav, listingId, loginModal, router]
  );

  return {
    hasFav,
    toggleFav,
  };
};

export default usefav;
