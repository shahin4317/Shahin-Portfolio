"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Send, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  botfield: string; // Honeypot spam protection
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    botfield: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const contacts = [
    {
      icon: <Phone className="w-5 h-5 text-cyan-400" />,
      label: "Call Me",
      value: "01850840896",
      href: "tel:01850840896",
    },
    {
      icon: <Mail className="w-5 h-5 text-violet-400" />,
      label: "Email Me",
      value: "shahinalam4317@gmail.com",
      href: "mailto:shahinalam4317@gmail.com",
    },
    {
      icon: <FaGithub className="w-5 h-5 text-slate-300" />,
      label: "GitHub Profile",
      value: "github.com/shahin4317",
      href: "https://github.com/shahin4317",
    },
    {
      icon: <FaLinkedin className="w-5 h-5 text-blue-400" />,
      label: "LinkedIn Connection",
      value: "in/md-shahin-alam-1b24aa321",
      href: "https://www.linkedin.com/in/md-shahin-alam-1b24aa321/",
    },
  ];

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    } else if (formData.subject.trim().length < 3) {
      tempErrors.subject = "Subject must be at least 3 characters";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "", botfield: "" });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setStatusMessage("Failed to reach server. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-28 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-cyan-400 font-outfit text-sm font-semibold uppercase tracking-wider mb-2">
            Get In Touch
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Contact Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-5 p-5 rounded-2xl glass-panel relative border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-white/10 light:border-slate-200">
                  {contact.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-slate-500 light:text-slate-400 uppercase tracking-widest mb-1">
                    {contact.label}
                  </span>
                  <span className="font-outfit text-sm sm:text-base font-bold text-white dark:text-white light:text-slate-900 break-all">
                    {contact.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 relative glow-border shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="botfield"
                  value={formData.botfield}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-outfit text-xs font-semibold text-slate-400 light:text-slate-500 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Md Shahin"
                      className={`px-4 py-3 rounded-xl bg-slate-950/40 light:bg-slate-50 border text-slate-200 light:text-slate-800 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all ${
                        errors.name ? "border-red-500" : "border-white/10 light:border-slate-200"
                      }`}
                    />
                    {errors.name && (
                      <span className="flex items-center gap-1 text-[11px] text-red-500 font-sans font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-outfit text-xs font-semibold text-slate-400 light:text-slate-500 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="shahin@example.com"
                      className={`px-4 py-3 rounded-xl bg-slate-950/40 light:bg-slate-50 border text-slate-200 light:text-slate-800 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all ${
                        errors.email ? "border-red-500" : "border-white/10 light:border-slate-200"
                      }`}
                    />
                    {errors.email && (
                      <span className="flex items-center gap-1 text-[11px] text-red-500 font-sans font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-xs font-semibold text-slate-400 light:text-slate-500 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Consultation"
                    className={`px-4 py-3 rounded-xl bg-slate-950/40 light:bg-slate-50 border text-slate-200 light:text-slate-800 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all ${
                      errors.subject ? "border-red-500" : "border-white/10 light:border-slate-200"
                    }`}
                  />
                  {errors.subject && (
                    <span className="flex items-center gap-1 text-[11px] text-red-500 font-sans font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-xs font-semibold text-slate-400 light:text-slate-500 uppercase tracking-wider">
                    Your Message
                    </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe your project, ideas, or questions here..."
                    className={`px-4 py-3 rounded-xl bg-slate-950/40 light:bg-slate-50 border text-slate-200 light:text-slate-800 placeholder-slate-600 light:placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all resize-none ${
                      errors.message ? "border-red-500" : "border-white/10 light:border-slate-200"
                    }`}
                  />
                  {errors.message && (
                    <span className="flex items-center gap-1 text-[11px] text-red-500 font-sans font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Form Status Notification Alerts */}
                <AnimatePresence>
                  {submitStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`flex items-center gap-3 p-4 rounded-xl text-sm ${
                        submitStatus === "success"
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {submitStatus === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>{statusMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 disabled:from-slate-800 disabled:to-slate-900 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-violet-500/35 hover:scale-[1.01] active:scale-100 disabled:scale-100 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      Sending Message... <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
