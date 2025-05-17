"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, NoteFormValues } from "@workspace/ui/lib/noteSchema";
import { useTranslation } from "react-i18next";
import {

  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@workspace/ui/components/form";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import axios from "axios";

export default function NoteForm({ onSubmit }: { onSubmit?: (note: string, summary: string) => void }) {
  const { t } = useTranslation();
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema.extend({
      note: noteSchema.shape.note.min(1, t("note_required")),
    })),
    defaultValues: { note: "" },
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  async function submitNote(note: string) {
    try {
      const res = await axios.post(`${apiUrl}/note/summarize`, { note });
      console.log(res.data);
      onSubmit?.(note, res.data.summary);
      form.reset();
    } catch (err: any) {
      alert(t("note_submit_error") + ": " + (err?.message || err));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => await submitNote(values.note))}
        className="flex flex-col gap-2 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">{t("note_label")}</FormLabel>
              <FormControl className="max-h-[25dvh] max-h-52">
                <Textarea {...field} placeholder={t("note_placeholder")} className="mb-2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} className="mt-2">
          Gửi
        </Button>
      </form>
    </Form>
  );
} 