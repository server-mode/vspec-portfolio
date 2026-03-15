"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

type ContactFormProps = {
  inverted?: boolean;
};

export function ContactForm({ inverted = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-2xl p-6 ${
        inverted ? "border border-white/25 bg-white/[0.02]" : "border border-border bg-white"
      }`}
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className={`w-full border px-3 py-2 text-sm outline-none transition-colors ${
            inverted
              ? "border-white/25 bg-transparent text-white focus:border-white"
              : "border-border bg-white text-black focus:border-black"
          }`}
          type="text"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          required
          className={`w-full border px-3 py-2 text-sm outline-none transition-colors ${
            inverted
              ? "border-white/25 bg-transparent text-white focus:border-white"
              : "border-border bg-white text-black focus:border-black"
          }`}
          type="email"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`w-full resize-y border px-3 py-2 text-sm outline-none transition-colors ${
            inverted
              ? "border-white/25 bg-transparent text-white focus:border-white"
              : "border-border bg-white text-black focus:border-black"
          }`}
        />
      </div>

      <button
        type="submit"
        className={`inline-flex items-center px-5 py-2.5 text-sm transition-opacity hover:opacity-85 ${
          inverted ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        Submit
      </button>

      {submitted ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-sm ${inverted ? "text-white/75" : "text-muted"}`}
        >
          Thanks! I will get back to you soon.
        </motion.p>
      ) : null}
    </form>
  );
}
