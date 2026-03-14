"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import {
  addUserSkillAction,
  deleteUserSkillAction,
} from "@/server/actions/user";
import {
  Combobox,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  useComboboxAnchor,
  ComboboxChips,
  ComboboxValue,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Toast } from "@base-ui/react";

interface Skill {
  id: number;
  name: string;
}

interface Props {
  availableSkills: Skill[];
  initialSkills: Skill[];
}

export default function SkillsManager({
  availableSkills,
  initialSkills,
}: Props) {
  const anchor = useComboboxAnchor();
  const toastManager = Toast.useToastManager();

  const [selected, setSelected] = useState<Skill[]>(initialSkills);
  const [comboValue, setComboValue] = useState<Skill[]>([]);

  const { executeAsync: addSkills, isPending: adding } = useAction(
    addUserSkillAction,
    {
      onSuccess: ({ input }) => {
        const addedSkills = input.skillIds.map(
          (id) => availableSkills.find((s) => s.id === id)!,
        );

        toastManager.add({ title: "Skills updated" });
        setSelected((prev) => [...prev, ...addedSkills]);
      },
    },
  );

  const { executeAsync: removeSkill, isPending: removing } = useAction(
    deleteUserSkillAction,
    {
      onSuccess: ({ input }) => {
        toastManager.add({ title: "Skills updated" });
        setSelected((prev) => prev.filter((s) => s.id !== input.skillId));
      },
    },
  );

  async function handleAddSkills() {
    if (comboValue.length === 0 || adding) return;

    const skillIds = comboValue.map((skill) => skill.id);
    await addSkills({ skillIds });
    setComboValue([]);
  }

  const freeSkills = availableSkills.filter(
    (s) => !selected.find((u) => u.id === s.id),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selected.map((skill) => (
          <span
            key={skill.id}
            className="bg-muted inline-flex items-center rounded-full border px-2 py-1 text-sm"
          >
            {skill.name}
            <button
              type="button"
              className="hover:text-danger-text ml-1 cursor-pointer px-1"
              onClick={() => removeSkill({ skillId: skill.id })}
              disabled={removing}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Combobox
          multiple
          autoHighlight
          items={freeSkills}
          value={comboValue}
          onValueChange={setComboValue}
        >
          <ComboboxChips ref={anchor} className="w-full">
            <ComboboxValue>
              {(values) => (
                <>
                  {values.map((value: any) => (
                    <ComboboxChip key={value.id}>{value.name}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Choose skills" />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Button
          onClick={handleAddSkills}
          disabled={!comboValue || adding}
          isLoading={adding}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
