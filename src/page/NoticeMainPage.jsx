import React from 'react'
import { NoticeMain } from '../components/organismos/Notice/NoticeMain'

export const NoticeMainPage = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Notices</h1>
      <NoticeMain />
    </div>
  )
}
