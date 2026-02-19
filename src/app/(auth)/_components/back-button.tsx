"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      role="link"
      variant="ghost"
      className="absolute top-2 left-4 px-8"
      onClick={() => router.back()}
    >
      <MoveLeft />
      Back
    </Button>
  );
}
