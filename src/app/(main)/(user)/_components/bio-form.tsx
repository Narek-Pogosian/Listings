"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateUserBioAction } from "@/server/actions/user";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  initialBio: string | null;
}

export default function BioForm({ initialBio }: Props) {
  const [bio, setBio] = useState(initialBio ?? "");
  const { executeAsync, isPending } = useAction(updateUserBioAction);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bio === initialBio) return; // optional
    await executeAsync({ bio });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <Textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write a few lines about yourself…"
      />
      <Button type="submit" isLoading={isPending}>
        Save bio
      </Button>
    </form>
  );
}
