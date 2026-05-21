"use client"

import { useState } from "react"
import { useForm, type UseFormRegisterReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { BrandMarkAnimated } from "@/components/brand"
import { WA_PHONE } from "@/lib/chat-flow"

export function ContactSection() {
  const t = useTranslations("contact")
  const tf = useTranslations("contact.form")
  const tErr = useTranslations("contact.form.errors")

  const schema = z.object({
    name: z.string().min(2, tErr("min2")),
    email: z.string().email(tErr("emailInvalid")),
    company: z.string().min(1, tErr("required")),
    website: z.string().optional(),
    billing: z.string().min(1, tErr("selectOne")),
    need: z.string().min(1, tErr("selectOne")),
    message: z.string().optional(),
  })
  type FormData = z.infer<typeof schema>

  const billingOptions = tf.raw("billingOptions") as string[]
  const needOptions = tf.raw("needOptions") as string[]
  const perks = t.raw("perks") as string[]

  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 900))
    console.log("Form submitted", data)
    setSuccess(true)
    toast.success(tf("toast"))
  }

  return (
    <section
      id="contacto"
      className="relative bg-gray-950 py-24 lg:py-40 border-t border-gray-800 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[720px] h-[720px] rounded-full bg-brand-green/[0.06] blur-[160px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:pt-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>

            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.02] tracking-[-0.02em] text-gray-100">
              {t("title")} <span className="text-brand-green">{t("accent")}</span>
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-[480px] leading-relaxed">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-3">
              {perks.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-brand-green flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-gray-100">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900 border border-gray-800">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("slotsBadge")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-6 lg:p-12 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.6)]">
              <div
                aria-hidden
                className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-green to-transparent"
              />

              {success ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <h3 className="font-display font-semibold text-2xl text-gray-100">
                      {tf("title")}
                    </h3>
                    <p className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
                      {tf("subtitle")}
                    </p>
                  </div>

                  <div className="h-px bg-gray-800 -mx-6 lg:-mx-12" />

                  <Field label={tf("name")} error={errors.name?.message}>
                    <input
                      type="text"
                      placeholder={tf("namePh")}
                      className={inputCls(!!errors.name)}
                      {...register("name")}
                    />
                  </Field>

                  <Field label={tf("email")} error={errors.email?.message}>
                    <input
                      type="email"
                      placeholder={tf("emailPh")}
                      className={inputCls(!!errors.email)}
                      {...register("email")}
                    />
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label={tf("company")} error={errors.company?.message}>
                      <input
                        type="text"
                        placeholder={tf("companyPh")}
                        className={inputCls(!!errors.company)}
                        {...register("company")}
                      />
                    </Field>
                    <Field label={tf("website")} optional optionalLabel={tf("optional")}>
                      <input
                        type="url"
                        placeholder={tf("websitePh")}
                        className={inputCls(false)}
                        {...register("website")}
                      />
                    </Field>
                  </div>

                  <Field label={tf("billing")} error={errors.billing?.message}>
                    <SelectField
                      register={register("billing")}
                      options={billingOptions}
                      placeholder={tf("select")}
                      error={!!errors.billing}
                    />
                  </Field>

                  <Field label={tf("need")} error={errors.need?.message}>
                    <SelectField
                      register={register("need")}
                      options={needOptions}
                      placeholder={tf("select")}
                      error={!!errors.need}
                    />
                  </Field>

                  <Field label={tf("message")} optional optionalLabel={tf("optional")}>
                    <textarea
                      rows={3}
                      placeholder={tf("messagePh")}
                      className={`${inputCls(false)} resize-none py-3 h-auto`}
                      {...register("message")}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-brand-green text-black font-display font-bold text-base hover:bg-green-hover hover:shadow-[0_0_32px_rgba(34,242,58,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {tf("submitting")}
                      </>
                    ) : (
                      <>
                        {tf("submit")}
                        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    {tf("terms")}{" "}
                    <a href="#" className="text-gray-300 hover:underline">
                      {tf("termsLink")}
                    </a>{" "}
                    {tf("and")}{" "}
                    <a href="#" className="text-gray-300 hover:underline">
                      {tf("privacyLink")}
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  optional,
  optionalLabel,
  error,
  children,
}: {
  label: string
  optional?: boolean
  optionalLabel?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="flex items-baseline gap-2 mb-2">
        <span className="text-sm font-medium text-gray-100">{label}</span>
        {optional && optionalLabel && (
          <span className="text-xs text-gray-500 font-normal">{optionalLabel}</span>
        )}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-error">{error}</span>}
    </label>
  )
}

function SelectField({
  register,
  options,
  placeholder,
  error,
}: {
  register: UseFormRegisterReturn
  options: string[]
  placeholder: string
  error: boolean
}) {
  return (
    <div className="relative">
      <select
        {...register}
        defaultValue=""
        className={`${inputCls(error)} appearance-none pr-10`}
      >
        <option value="" disabled className="bg-gray-900">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-gray-900">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  )
}

function inputCls(error: boolean) {
  return `w-full h-12 px-4 rounded-lg bg-gray-950 border ${
    error ? "border-error" : "border-gray-800"
  } text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:shadow-[0_0_16px_rgba(34,242,58,0.15)] transition-all`
}

function SuccessState() {
  const t = useTranslations("contact.form.success")
  return (
    <div className="text-center py-12">
      <div className="mx-auto mb-6 flex items-center justify-center">
        <BrandMarkAnimated size={88} />
      </div>
      <h3 className="font-display font-bold text-2xl text-gray-100 mb-3">{t("title")}</h3>
      <p className="text-base text-gray-300 max-w-sm mx-auto">{t("body")}</p>
      <a
        href={`https://wa.me/${WA_PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline underline-offset-4"
      >
        {t("altWhatsApp")}
      </a>
    </div>
  )
}
