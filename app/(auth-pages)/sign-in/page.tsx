import { signInAction } from "@/app/actions";
import { AuthForm } from "@/components/auth-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchParams } from "@/types/search-params";
import { parseMessage } from "@/utils/utils";
import Link from "next/link";

interface LoginPageProps {
  searchParams?: SearchParams;
}
export default function Login({ searchParams }: LoginPageProps) {
  const message = parseMessage(searchParams);

  return (
    <AuthForm
      title="Sign in"
      subtitle={
        <>
          Don't have an account?
          <Link className="text-primary underline" href="/sign-up">
            Sign up
          </Link>
        </>
      }
      action={signInAction}
      pendingText="Signing In..."
      buttonText="Sign in"
      message={message}
      fields={
        <>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />

          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
        </>
      }
    />
  );
}
