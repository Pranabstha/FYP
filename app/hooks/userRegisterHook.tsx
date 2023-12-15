import {create} from 'zustand'

interface userRegisterHookStore{
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const userRegisterHook = create<userRegisterHookStore>((set) =>({
    isOpen: false,
    onOpen: () =>set({isOpen: true}),
    onClose: () =>set({isOpen: false}),

}));

export default userRegisterHook;