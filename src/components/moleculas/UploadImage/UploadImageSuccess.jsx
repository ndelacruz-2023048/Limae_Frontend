import React from 'react'

export const UploadImageSuccess = ({imageURL,isInteractionDisabled,isLoadingImage,dataFile}) => {
  return (
    <div className='h-full w-full'>
        <img src={imageURL} alt=""  className='h-full w-full object-cover'/>
    </div>
  )
}
