"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateUserBioAction } from "@/server/actions/user";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toast } from "@base-ui/react";

interface Props {
  initialBio: string | null;
}

export default function BioForm({ initialBio }: Props) {
  const [currentBio, setCurrentBio] = useState(initialBio);
  const [bio, setBio] = useState(initialBio ?? "");
  const toastManager = Toast.useToastManager();

  const { executeAsync, isPending } = useAction(updateUserBioAction, {
    onSuccess: ({ input }) => {
      toastManager.add({
        title: "Bio updated",
        timeout: 2000,
      });
      setCurrentBio(input.bio);
    },
  });

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (bio === currentBio) return;
    await executeAsync({ bio });
  };

  const bioHasNotChanged = bio.trim() === currentBio?.trim();

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <Textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write a few lines about yourself…"
      />
      <Button type="submit" isLoading={isPending} disabled={bioHasNotChanged}>
        Save bio
      </Button>
    </form>
  );
}
