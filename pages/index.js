import React from 'react'
import dynamic from 'next/dynamic'
import Preview from '@/components/Preview'

const Editor = dynamic(() => import('../components/Editor'), { ssr: false })

export default function Home() {
  return (
    <>
      <Editor />
      {/* <Preview markdown={"# hello"} /> */}
    </>
  )
}