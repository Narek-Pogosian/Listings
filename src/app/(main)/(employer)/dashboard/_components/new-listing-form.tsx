"use client";

import { experienceLevelEnum, remoteTypeEnum } from "@/server/db/schema";
import {
  listingSchema,
  type NewListingSchemaType,
} from "@/lib/schemas/listing-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export function NewListingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<NewListingSchemaType>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      remote: remoteTypeEnum[0],
      salaryMin: 0,
      salaryMax: 0,
      currency: "",
      experienceLevel: experienceLevelEnum[0],
      expiresAt: undefined,
      saveAsDraft: false,
    },
  });

  async function onSubmit(data: NewListingSchemaType) {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      // stub: replace with real action later
      console.log("submit listing", data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  aria-invalid={fieldState.invalid}
                  placeholder="50000"
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
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  aria-invalid={fieldState.invalid}
                  placeholder="120000"
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

      {error && <p className="text-danger-text font-semibold">{error}</p>}
      <Button isLoading={isLoading} aria-disabled={isLoading} type="submit">
        Create listing
      </Button>
    </form>
  );
}
