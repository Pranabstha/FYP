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
//   const router = useRouter();
//   const loginModel = userLoginHook();

//   const hasfav = useMemo(() => {
//     const listing = currentUser?.favs || [];
//     return listing.includes(listingId);
//   }, [currentUser, listingId]);

//   const togglefav = useCallback(
//     async (event: React.MouseEvent<HTMLDivElement>) => {
//       event.stopPropagation();
//       if (!currentUser) {
//         return loginModel.onOpen();
//       }

//       try {
//         let request;

//         if (hasfav) {
//           request = () => axios.delete(`/api/Fav/${listingId}`);
//           toast.success("Removed Successfully");
//           console.log("0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-");
//         } else {
//           request = () => axios.post(`/api/Fav/${listingId}`);
//           toast.success("Removed Successfully");
//         }

//         await request();
//         router.refresh();
//       } catch (error) {
//         toast.error("Something went wrong.");
//       }
//     },
//     [currentUser, hasfav, loginModel, router, listingId]
//   );

//   return {
//     hasfav,
//     togglefav,
//   };
// };

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
