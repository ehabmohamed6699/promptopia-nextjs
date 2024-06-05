'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

import Form from "@components/Form"

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const router = useRouter()
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })

    useEffect(()=>{
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) getPromptDetails()
    },[promptId])
    const editPrompt = async (e)=>{
        e.preventDefault()
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found')
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:"PATCH",
                body: JSON.stringify({
                    ...post,
                })
            })
            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally{
            setSubmitting(false)
        }
    }
  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt