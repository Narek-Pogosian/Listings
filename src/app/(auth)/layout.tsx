import BackButton from "./_components/back-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-full content-center px-4 lg:col-span-2">
      <BackButton />
      <div className="bg-card mx-auto max-w-lg rounded border p-8 shadow-md/5 lg:p-10 dark:shadow-lg/45">
        {children}
      </div>
    </div>
  );
}
