import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LuMail, LuMapPin, LuPhone, LuSend } from "react-icons/lu";
import { FadeIn } from "./animations/FadeIn.tsx";
import { springHover } from "./motion.js";

function Contact() {
  const { t } = useTranslation();
  const serviceOptions = t("contact.form.serviceOptions", { returnObjects: true });
  const contactCards = [
    { label: t("contact.phone"), value: "+212 600-748447", href: "tel:+212600748447", icon: LuPhone },
    { label: t("contact.email"), value: "contact@elboticlim.com", href: "mailto:contact@elboticlim.com", icon: LuMail },
    { label: t("contact.address"), value: t("contact.city"), href: null, icon: LuMapPin },
    { label: t("contact.whatsApp"), value: t("contact.chatOnWhatsApp"), href: "https://wa.me/212600748447", icon: LuSend },
  ];
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    serviceType: serviceOptions[0],
    message: "",
  });
  const [errors, setErrors] = React.useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = t("contact.form.errors.fullName");
    if (!/^\+?[0-9\s-]{8,}$/.test(formData.phone.trim())) nextErrors.phone = t("contact.form.errors.phone");
    if (!formData.message.trim()) nextErrors.message = t("contact.form.errors.message");
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = [
      t("contact.form.payloadGreeting"),
      `${t("contact.form.fullName")}: ${formData.fullName}`,
      `${t("contact.form.phone")}: ${formData.phone}`,
      `${t("contact.form.serviceType")}: ${formData.serviceType}`,
      `${t("contact.form.message")}: ${formData.message}`,
    ].join("\n");
    window.open(`https://wa.me/212600748447?text=${encodeURIComponent(payload)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative bg-white py-24 lg:py-32 dark:bg-[#0a0f1e]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn direction="right" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0d1526]">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">{t("contact.eyebrow")}</p>
          <h2 className="font-['Sora'] text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">{t("contact.title")}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("contact.description")}
          </p>
          <div className="mt-6 grid gap-3">
            {contactCards.map((item) => {
              const Icon = item.icon;
              const content = (
                <motion.div
                  className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#0099cc]/40 hover:shadow-[0_0_0_1px_rgba(0,153,204,0.2)] dark:border-white/10 dark:bg-[#111827] dark:hover:border-cyan-300/40 dark:hover:shadow-[0_0_0_1px_rgba(0,200,255,0.25)]"
                  whileHover={springHover}
                >
                  <Icon className="text-cyan-700 dark:text-cyan-300" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </motion.div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.2} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0d1526]">
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="font-['Sora'] text-xl font-bold text-gray-900 dark:text-white">{t("contact.form.title")}</h3>
          <div className="mt-5 grid gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("contact.form.fullName")}</label>
              <input name="fullName" value={formData.fullName} onChange={onChange} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0099cc] focus:ring-2 focus:ring-[#0099cc]/20 dark:border-white/10 dark:bg-[#111827] dark:text-slate-100 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/20" />
              {errors.fullName ? <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.fullName}</p> : null}
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("contact.form.phone")}</label>
              <input name="phone" value={formData.phone} onChange={onChange} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0099cc] focus:ring-2 focus:ring-[#0099cc]/20 dark:border-white/10 dark:bg-[#111827] dark:text-slate-100 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/20" />
              {errors.phone ? <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.phone}</p> : null}
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("contact.form.serviceType")}</label>
              <select name="serviceType" value={formData.serviceType} onChange={onChange} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0099cc] focus:ring-2 focus:ring-[#0099cc]/20 dark:border-white/10 dark:bg-[#111827] dark:text-slate-100 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/20">
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("contact.form.message")}</label>
              <textarea name="message" value={formData.message} onChange={onChange} rows={5} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0099cc] focus:ring-2 focus:ring-[#0099cc]/20 dark:border-white/10 dark:bg-[#111827] dark:text-slate-100 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/20" />
              {errors.message ? <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.message}</p> : null}
            </div>
            <motion.button type="submit" className="inline-flex min-h-[3.2rem] items-center justify-center rounded-full bg-[#0099cc] px-5 text-sm font-extrabold text-white shadow-[0_0_28px_rgba(0,153,204,0.25)] transition dark:bg-cyan-400 dark:text-slate-950 dark:shadow-[0_0_28px_rgba(0,200,255,0.35)]" whileHover={springHover} whileTap={{ scale: 0.98 }}>
              {t("contact.form.submit")}
            </motion.button>
          </div>
        </form>
        </FadeIn>
      </div>
    </section>
  );
}

export default Contact;
