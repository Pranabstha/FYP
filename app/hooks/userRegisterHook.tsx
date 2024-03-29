// Importing create function from Zustand for creating a store
import { create } from "zustand";

// Defining the interface for the userRegisterHook store
interface UserRegisterHookStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Creating the userRegisterHook store using Zustand
const userRegisterHook = create<UserRegisterHookStore>((set) => ({
  isOpen: false, // Initial state: modal is closed
  onOpen: () => set({ isOpen: true }), // Function to open the modal
  onClose: () => set({ isOpen: false }), // Function to close the modal
}));

// Exporting the userRegisterHook store
export default userRegisterHook;
