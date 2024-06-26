"use client"

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore"
import { useState } from "react"

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps ) => {
  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()
  const [blocks, setBlocks] = useState<Block[]>([])

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    })

    return response.url
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: 
    initialContent
        ? JSON.parse(initialContent) as PartialBlock[] 
        : undefined,
    uploadFile: handleUpload
  })

  const handleChange = () => {
    setBlocks(editor.document)
    onChange(JSON.stringify(editor.document))
  } 

  return (
    <div>
      <BlockNoteView 
        editor={editor} 
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => setBlocks(editor.document)}
      />
    </div>
  )
}

export default Editor