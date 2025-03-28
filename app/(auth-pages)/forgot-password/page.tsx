import { forgotPasswordAction } from "@/app/actions";
import { AuthForm } from "@/components/auth-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchParams } from "@/types/search-params";
import { parseMessage } from "@/utils/utils";
import Link from "next/link";

interface ForgotPasswordPageProps {
  searchParams?: SearchParams;
}

export default function ForgotPassword({
  searchParams,
}: ForgotPasswordPageProps) {
  const message = parseMessage(searchParams);

  return (
    <AuthForm
      title="Reset Password"
      subtitle={
        <>
          Remembered it?
          <Link className="text-primary underline ml-1" href="/sign-in">
            Sign in
          </Link>
        </>
      }
      action={forgotPasswordAction}
      pendingText="Sending..."
      buttonText="Send Reset Email"
      message={message}
      fields={
        <>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
        </>
      }
    />
  );
}
