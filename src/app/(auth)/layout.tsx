import BackButton from "./_components/back-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-full content-center px-4 py-8 lg:col-span-2">
      <BackButton />
      <div className="bg-card mx-auto max-w-lg rounded border p-6 shadow-md/5 lg:px-8 dark:shadow-lg/45">
        {children}
      </div>
    </div>
  );
}
