// Importing create function from Zustand for creating a store
import { create } from "zustand";

// Defining the interface for the userLoginHook store
interface userRentHookStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Creating the userLoginHook store using Zustand
const userRentHook = create<userRentHookStore>((set) => ({
  isOpen: false, // Initial state: modal is closed
  onOpen: () => set({ isOpen: true }), // Function to open the modal
  onClose: () => set({ isOpen: false }), // Function to close the modal
}));

// Exporting the userLoginHook store
export default userRentHook;
