import { create } from "zustand";

export const useUploadImageStore = create((set,get)=>({
    dataImageFile:{},
    setDataImageFile:(p)=>{
        set({dataImageFile:p})
    },
    isUploadingImage:false,
    setIsUploadingImage:(p)=>{
        set({isUploadingImage:p})
    }
}))