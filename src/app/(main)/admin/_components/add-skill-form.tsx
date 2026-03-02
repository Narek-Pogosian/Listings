"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { createSkillAction } from "@/server/actions/skills";

export default function AddSkillForm() {
  const nameRef = useRef<HTMLInputElement>(null);

  const { execute, isPending } = useAction(createSkillAction, {
    onSuccess: () => {
      if (nameRef.current) {
        nameRef.current.value = "";
      }
    },
  });

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;
    if (!name?.trim()) return;
    execute({ name });
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        id="skill-name"
        className="w-48"
        placeholder="Skill name"
        ref={nameRef}
      />
      <Button type="submit" isLoading={isPending}>
        Add
      </Button>
    </form>
  );
}
