import Header, { HeaderFallback } from "@/components/header";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <main className="container pt-22 pb-8">{children}</main>
    </>
  );
}
