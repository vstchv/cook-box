"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage } from "@/components/form-message";
import { Message } from "@/components/form-message";
import { ReactNode } from "react";

interface AuthFormProps {
  title: string;
  subtitle?: ReactNode;
  fields: ReactNode;
  action: (formData: FormData) => Promise<Message | undefined>;
  pendingText: string;
  buttonText: string;
  message?: Message;
}

export function AuthForm({
  title,
  subtitle,
  fields,
  action,
  pendingText,
  buttonText,
  message,
}: AuthFormProps) {
  return (
    <form className="flex flex-col w-full min-w-64 max-w-96 mx-auto">
      <h1 className="text-2xl text-center font-medium mb-5">{title}</h1>
      {subtitle && (
        <div className="flex justify-between items-center text-sm text-secondary-foreground">
          {subtitle}
        </div>
      )}

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-5">
        {fields}

        <SubmitButton formAction={action} pendingText={pendingText}>
          {buttonText}
        </SubmitButton>

        {message && <FormMessage message={message} />}
      </div>
    </form>
  );
}
