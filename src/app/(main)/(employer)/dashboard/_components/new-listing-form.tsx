"use client";

import { experienceLevelEnum, remoteTypeEnum } from "@/server/db/schema";
import {
  createListingSchema,
  type CreateListingSchemaType,
} from "@/lib/schemas/listing-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxChips,
  ComboboxValue,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxEmpty,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { createListingAction } from "@/server/actions/listing";
import { useRouter } from "next/navigation";
import { Toast } from "@base-ui/react";

interface Props {
  skills: {
    id: number;
    name: string;
  }[];
}

export function NewListingForm({ skills }: Props) {
  const anchor = useComboboxAnchor();
  const router = useRouter();
  const toastManager = Toast.useToastManager();

  const form = useForm<CreateListingSchemaType>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      remote: remoteTypeEnum[0],
      salaryMin: "" as unknown as number,
      salaryMax: "" as unknown as number,
      currency: "",
      experienceLevel: experienceLevelEnum[0],
      expiresAt: undefined,
      saveAsDraft: false,
      skills: [],
    },
  });

  const { executeAsync, isPending, result, reset } = useAction(
    createListingAction,
    {
      onSuccess: () => {
        form.reset();
        form.setValue("skills", []);
        reset();
        toastManager.add({
          title: "New listing created",
        });
        router.push("/dashboard");
      },
    },
  );

  async function onSubmit(data: CreateListingSchemaType) {
    if (isPending) return;

    executeAsync(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-card mx-auto max-w-3xl space-y-8 rounded border p-6 shadow-md/5 dark:shadow-md/50"
    >
      {/* title */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title">Job Title</FieldLabel>
            <FieldDescription>
              The position title that will be displayed to job seekers
            </FieldDescription>
            <Input
              id="title"
              type="text"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Senior Frontend Developer"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* description */}
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">Job Description</FieldLabel>
            <FieldDescription>
              Provide a comprehensive overview of the role, responsibilities,
              and requirements
            </FieldDescription>
            <Textarea
              id="description"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Describe the role, team, and expectations..."
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* city */}
      <Controller
        name="city"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="city">Location</FieldLabel>
            <FieldDescription>
              The city where the primary office or work location is based
            </FieldDescription>
            <Input
              id="city"
              type="text"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. San Francisco"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* remote */}
      <Controller
        name="remote"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="remote">Work Arrangement</FieldLabel>
            <FieldDescription>
              Specify whether the position is remote, on-site, or hybrid
            </FieldDescription>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
            >
              <SelectTrigger id="remote" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {remoteTypeEnum.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* salary min/max */}
      <div>
        <FieldDescription className="mb-2">
          Provide a salary range in the currency specified below
        </FieldDescription>
        <div className="flex gap-4">
          <Controller
            name="salaryMin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel htmlFor="salaryMin">Minimum Salary</FieldLabel>
                <Input
                  id="salaryMin"
                  type="number"
                  required
                  value={field.value}
                  onChange={(e) => {
                    const num = Number(e.target.value);
                    if (num > 0) {
                      field.onChange(num);
                    } else {
                      field.onChange("");
                    }
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="10000"
                  min={0}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="salaryMax"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel htmlFor="salaryMax">Maximum Salary</FieldLabel>
                <Input
                  id="salaryMax"
                  type="number"
                  required
                  value={field.value}
                  onChange={(e) => {
                    const num = Number(e.target.value);
                    if (num > 0) {
                      field.onChange(num);
                    } else {
                      field.onChange("");
                    }
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="20000"
                  min={0}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* currency */}
      <Controller
        name="currency"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="currency">Currency</FieldLabel>
            <FieldDescription>
              The currency code for the salary range above (e.g., USD, EUR, GBP)
            </FieldDescription>
            <Input
              id="currency"
              type="text"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="USD"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* experience level */}
      <Controller
        name="experienceLevel"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="experienceLevel">
              Required Experience Level
            </FieldLabel>
            <FieldDescription>
              Select the minimum experience required for this position
            </FieldDescription>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
            >
              <SelectTrigger id="experienceLevel" className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevelEnum.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* skills */}
      <Controller
        name="skills"
        control={form.control}
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid} className="space-y-1">
              <FieldLabel>Required Skills</FieldLabel>
              <FieldDescription>
                Choose one or more skills that are relevant for this role
              </FieldDescription>

              <Combobox
                multiple
                autoHighlight
                items={skills}
                defaultValue={[]}
                onValueChange={(val) => field.onChange(val)}
              >
                <ComboboxChips ref={anchor} className="w-full">
                  <ComboboxValue>
                    {(values) => (
                      <>
                        {values.map((value: any) => (
                          <ComboboxChip key={value.id}>
                            {value.name}
                          </ComboboxChip>
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      {/* expires at */}
      <Controller
        name="expiresAt"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="expiresAt">Listing Expiration Date</FieldLabel>
            <FieldDescription>
              The date when this job listing will no longer be visible to
              candidates
            </FieldDescription>
            <Input
              id="expiresAt"
              type="date"
              value={
                field.value instanceof Date && !isNaN(field.value.getTime())
                  ? field.value.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                field.onChange(new Date(e.target.value));
              }}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* save as draft */}
      <Controller
        name="saveAsDraft"
        control={form.control}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel
              htmlFor="saveAsDraft"
              className="flex w-fit items-center gap-2"
            >
              <input
                id="saveAsDraft"
                type="checkbox"
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
              Save as draft
            </FieldLabel>
            <FieldDescription>
              Drafts are private and won&apos;t be visible to candidates until
              published
            </FieldDescription>
          </Field>
        )}
      />

      {result.serverError && (
        <p className="text-danger-text font-semibold">{result.serverError}</p>
      )}

      <Button isLoading={isPending} type="submit">
        Create listing
      </Button>
    </form>
  );
}
