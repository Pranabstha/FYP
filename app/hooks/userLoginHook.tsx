import {create} from 'zustand'

interface userLoginHookStore{
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const userLoginHook = create<userLoginHookStore>((set) =>({
    isOpen: false,
    onOpen: () =>set({isOpen: true}),
    onClose: () =>set({isOpen: false}),

}));

export default userLoginHook;