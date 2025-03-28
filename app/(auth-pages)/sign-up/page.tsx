import { signUpAction } from "@/app/actions";
import { AuthForm } from "@/components/auth-form";
import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchParams } from "@/types/search-params";
import { parseMessage } from "@/utils/utils";
import Link from "next/link";

interface SignUpPageProps {
  searchParams?: SearchParams;
}
export default function SignUp({ searchParams }: SignUpPageProps) {
  const message = parseMessage(searchParams);

  if (message && "message" in message) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <AuthForm
      title="Sign up"
      subtitle={
        <>
          Already have an account?
          <Link className="text-primary underline ml-1" href="/sign-in">
            Sign in
          </Link>
        </>
      }
      action={signUpAction}
      pendingText="Signing up..."
      buttonText="Sign up"
      message={message}
      fields={
        <>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
        </>
      }
    />
  );
}
