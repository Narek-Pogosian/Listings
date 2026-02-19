import Link from "next/link";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-extrabold">Sign In</h1>
      <LoginForm />
      <p className="mt-10 text-center text-sm font-medium">
        Don&apos;t have an account,{" "}
        <Link href="/register" replace className="underline">
          register here
        </Link>
      </p>
    </>
  );
}
