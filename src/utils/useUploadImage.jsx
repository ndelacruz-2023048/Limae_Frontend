import { useState } from "react"
import { useUploadImageStore } from "../stores/UploadImageStore"

export const useUploadImage =()=>{
    const [dataImage,setDataImage] = useState({})
    const {isUploadingImage,setIsUploadingImage} = useUploadImageStore()
    const registerImage = async(file)=>{
        try {
            setIsUploadingImage(true)
            const data = new FormData()
            data.append("file",file)
            data.append("upload_preset","almacenadora_cloudinary")
            data.append("cloud_name","dtmwybty7")
            const response = await fetch("https://api.cloudinary.com/v1_1/dtmwybty7/image/upload",{
                method: "POST",
                body: data
            })
            const responseImage = await response.json()
            setIsUploadingImage(false)
            setDataImage(responseImage)
            return {
                responseImage
            }
        } catch (error) {
            console.error(error);
        }
    }
    return{
        dataImage:dataImage ,
        isLoadingImage:isUploadingImage,
        registerImage:registerImage
    }
}