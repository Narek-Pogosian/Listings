"use client";

import { registerAction } from "@/server/actions/register";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/lib/schemas/auth-schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    shouldUnregister: true,
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  async function onSubmit(data: RegisterSchemaType) {
    if (isLoading) return;
    // @ts-expect-error just making sure it can't ever be admin
    if (data.role === "admin") return;

    setIsLoading(true);
    setError("");

    try {
      const {
        success,
        data: info,
        error: registerError,
      } = await registerAction(data);
      if (!success) {
        setError(registerError);
      }

      const res = await signIn("credentials", { ...info, redirect: false });
      if (res?.ok) {
        location.replace("/");
      } else if (res?.error) {
        setError("Something went wrong");
      }
    } catch (_) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const role = form.watch("role");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="role"
        defaultValue="user"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldSet>
            <FieldLegend variant="label">What brings you here</FieldLegend>
            <RadioGroup
              defaultValue="user"
              className="w-fit"
              {...field}
              aria-invalid={fieldState.invalid}
            >
              <Field orientation="horizontal" className="flex items-center">
                <RadioGroupItem value="user" id="desc-r1" />
                <FieldContent>
                  <FieldLabel htmlFor="desc-r1">
                    I&apos;m looking for a job
                  </FieldLabel>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="employer" id="desc-r2" />
                <FieldContent>
                  <FieldLabel htmlFor="desc-r2">I&apos;m hiring</FieldLabel>
                </FieldContent>
              </Field>
            </RadioGroup>
          </FieldSet>
        )}
      />

      {role === "employer" ? (
        <Controller
          name="company"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <Input
                id="company"
                type="text"
                {...field}
                aria-invalid={fieldState.invalid}
                required
                placeholder="Company name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ) : (
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                {...field}
                aria-invalid={fieldState.invalid}
                required
                placeholder="Your name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Your email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="**********"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="confirmPassword">Password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="**********"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {error && <p className="text-danger-text font-semibold">{error}</p>}

      <Button isLoading={isLoading} type="submit">
        Register
      </Button>
    </form>
  );
}
