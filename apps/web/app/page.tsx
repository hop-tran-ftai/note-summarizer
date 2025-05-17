"use client";
import NoteForm from "../components/NoteForm"
import { useState } from "react";

export default function Page() {
  const [QA, setQA] = useState<{ question: string, answer: string }[]>([]);
  return (
    <div className="flex items-center justify-center min-h-svh p-4">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Note Summarizer</h1>
        <div className="flex flex-col w-full items-center justify-center gap-4">
          {QA.map((qa, index) => (
            <div key={index} className="flex flex-col w-full items-center justify-center gap-4">
              <h2 className="text-left p-4 mr-16 border-1 border-gray-300 rounded-md m-4 bg-[#323232d9]">{qa.question}</h2>
              <p className="p-4 ml-16 m-4">{qa.answer}</p>
            </div>
          ))}
        </div>
        <NoteForm onSubmit={(note: string, summary: string) => setQA([...QA, { question: note, answer: summary }])} />
      </div>
    </div>
  )
}
