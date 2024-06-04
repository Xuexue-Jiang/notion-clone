"use client"

import Image from "next/image"
import { useUser } from "@clerk/clerk-react"
import { PlusCircle, Router } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const DocumentPage = () => {

  const { user } = useUser()
  const router = useRouter()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/notion-parade.png"
        alt="notion parade"
        height={500}
        width={500}
        className="dark:hidden mb-5"
      />
      <Image
        src="/notion-parade-dark-mode.png"
        alt="notion parade dark mode"
        height={500}
        width={500}
        className="hidden dark:block mb-5"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentPage