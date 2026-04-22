"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const contactSchema = z.object({
  name: z.string().min(2, "Ingresá al menos 2 caracteres."),
  email: z.string().email("Ingresá un email válido."),
  message: z.string().min(10, "Contanos un poco más (mín. 10 caracteres)."),
})

type ContactForm = z.infer<typeof contactSchema>

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 300))
    const subject = encodeURIComponent(`Consulta web — ${data.name}`)
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`
    )
    window.location.href = `mailto:contacto@potenciapp.com?subject=${subject}&body=${body}`
    toast.success("Abrimos tu correo para que envíes el mensaje.")
    reset()
  }

  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 py-24 lg:py-32 overflow-hidden border-t border-border"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#7CFF3A] tracking-wide uppercase mb-4">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Contanos sobre tu{" "}
            <span className="text-[#7CFF3A]">proyecto</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Completá el formulario y te respondemos a la brevedad. Se abrirá tu
            aplicación de correo con el mensaje listo para enviar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 sm:p-8 space-y-6 shadow-lg shadow-[#7CFF3A]/5"
        >
          <div className="space-y-2">
            <Label htmlFor="contact-name">Nombre</Label>
            <Input
              id="contact-name"
              autoComplete="name"
              placeholder="Tu nombre"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="vos@ejemplo.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Mensaje</Label>
            <Textarea
              id="contact-message"
              placeholder="¿En qué podemos ayudarte?"
              rows={5}
              className="resize-y min-h-[120px]"
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#7CFF3A] text-background hover:bg-[#6EE832] font-semibold h-12 px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar consulta
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
