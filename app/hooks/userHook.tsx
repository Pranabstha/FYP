import {create} from 'zustand'

interface userHookStore{
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const userHook = create<userHookStore>((set) =>({
    isOpen: false,
    onOpen: () =>set({isOpen: true}),
    onClose: () =>set({isOpen: false}),

}));

export default userHook