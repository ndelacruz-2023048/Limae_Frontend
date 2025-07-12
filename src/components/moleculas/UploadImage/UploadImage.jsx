import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadImageBlank } from './UploadImageBlank';
import { UploadImageSuccess } from './UploadImageSuccess';
import { useUploadImageStore } from '../../../stores/UploadImageStore';

export const UploadImage = ({handleChange}) => {
    const {dataImageFile,setDataImageFile,setUrlImageFile} = useUploadImageStore()
    const [urlImage,setUrlImage] = useState(null)/*State para URL IMAGEN */
  const onDrop = useCallback(acceptedFiles => {
      setDataImageFile(acceptedFiles[0])
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setUrlImage(imageUrl)
      handleChange(imageUrl)
      setUrlImageFile(imageUrl)
    }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div {...getRootProps({className: 'dropzone'})} className='flex justify-center items-center h-full w-full'>
        <input {...getInputProps()}/>
        {
        urlImage===null ? (
            <>
            <UploadImageBlank />
            </>
        ):(
            <UploadImageSuccess dataFile={dataImageFile} imageURL={urlImage}/>
        )
        }
  </div>
  )
}



