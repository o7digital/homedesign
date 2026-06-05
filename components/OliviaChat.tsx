"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const COPY = {
  es: {
    title: "Olivia AI Assistant",
    status: "Asistente Home Design Marques",
    online: "En linea",
    teaser: "Olivia puede ayudarte",
    open: "Abrir chat",
    close: "Cerrar chat",
    welcome: "Hola, soy Olivia AI Assistant. Puedo ayudarte con casas de madera, muebles y cotizaciones.",
    leadIntro: "Si quieres que un asesor te contacte para una cotizacion, deja tus datos.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Email",
    phone: "Telefono",
    submitLead: "Enviar datos",
    leadThanks: "Gracias. Tus datos fueron enviados y un asesor podra darte seguimiento.",
    placeholder: "Escribe tu pregunta...",
    send: "Enviar",
    shareContact: "Quiero que me contacten",
    error: "No pude enviar el mensaje. Intenta de nuevo o usa el formulario de contacto.",
  },
  en: {
    title: "Olivia AI Assistant",
    status: "Home Design Marques Assistant",
    online: "Online",
    teaser: "Olivia can help",
    open: "Open chat",
    close: "Close chat",
    welcome: "Hello, I am Olivia AI Assistant. I can help with wooden houses, furniture, and quotes.",
    leadIntro: "If you want an advisor to contact you for a quote, leave your details.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    submitLead: "Send details",
    leadThanks: "Thanks. Your details were sent and an advisor can follow up.",
    placeholder: "Write your question...",
    send: "Send",
    shareContact: "I want to be contacted",
    error: "I could not send the message. Please try again or use the contact form.",
  },
};

type Language = keyof typeof COPY;
type ChatMessage = { role: "assistant" | "user"; content: string };

function getLanguage(pathname: string | null): Language {
  return pathname?.split("/").filter(Boolean)[0] === "en" ? "en" : "es";
}

export default function OliviaChat() {
  const pathname = usePathname();
  const language = getLanguage(pathname);
  const copy = COPY[language];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: copy.welcome }]);

  useEffect(() => {
    setInput("");
    setLeadSent(false);
    setShowLeadForm(false);
    setMessages([{ role: "assistant", content: copy.welcome }]);
  }, [language, copy.welcome]);

  const transcript = useMemo(
    () => messages.map((message) => `${message.role}: ${message.content}`).join("\n"),
    [messages]
  );

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lead.firstName.trim() || !lead.lastName.trim() || !lead.email.trim() || !lead.phone.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/o7-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          language,
          message: `Lead Chat Olivia AI Home Design Marques (${language})\n\n${transcript}`,
        }),
      });
      if (!response.ok) throw new Error("Lead delivery failed");
      setLeadSent(true);
      setShowLeadForm(false);
      setMessages((prev) => [...prev, { role: "assistant", content: copy.leadThanks }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    const message = input.trim();
    if (!message || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/o7-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language, siteCode: "homedesign", lead }),
      });
      const data = await response.json();
      setMessages((prev) => {
        const nextMessages: ChatMessage[] = [...prev, { role: "assistant", content: data.reply || copy.error }];
        const userMessages = nextMessages.filter((item) => item.role === "user").length;
        if (!leadSent && userMessages >= 2) setShowLeadForm(true);
        return nextMessages;
      });
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="olivia-chat">
      {isOpen && (
        <section className="olivia-panel" aria-label={copy.status}>
          <header className="olivia-header">
            <div>
              <p className="olivia-title">{copy.title}</p>
              <p className="olivia-status">
                {copy.status} · {copy.online}
              </p>
            </div>
            <button type="button" className="olivia-close" onClick={() => setIsOpen(false)} aria-label={copy.close}>
              x
            </button>
          </header>

          <div className="olivia-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`olivia-message ${message.role}`}>
                {message.content}
              </div>
            ))}
            {isLoading && <div className="olivia-message assistant">...</div>}
          </div>

          {!leadSent && !showLeadForm && (
            <div className="olivia-lead-prompt">
              <button type="button" onClick={() => setShowLeadForm(true)}>
                {copy.shareContact}
              </button>
            </div>
          )}

          {!leadSent && showLeadForm && (
            <form className="olivia-lead" onSubmit={handleLeadSubmit}>
              <p>{copy.leadIntro}</p>
              <input required placeholder={copy.firstName} value={lead.firstName} onChange={(event) => setLead((prev) => ({ ...prev, firstName: event.target.value }))} />
              <input required placeholder={copy.lastName} value={lead.lastName} onChange={(event) => setLead((prev) => ({ ...prev, lastName: event.target.value }))} />
              <input required type="email" placeholder={copy.email} value={lead.email} onChange={(event) => setLead((prev) => ({ ...prev, email: event.target.value }))} />
              <input required type="tel" placeholder={copy.phone} value={lead.phone} onChange={(event) => setLead((prev) => ({ ...prev, phone: event.target.value }))} />
              <button type="submit" disabled={isLoading}>
                {copy.submitLead}
              </button>
            </form>
          )}

          <div className="olivia-composer">
            <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") handleSend(); }} disabled={isLoading} placeholder={copy.placeholder} />
            <button type="button" onClick={handleSend} disabled={isLoading} aria-label={copy.send}>
              {">"}
            </button>
          </div>
        </section>
      )}

      <div className="olivia-closed">
        {!isOpen && (
          <button type="button" className="olivia-teaser" onClick={() => setIsOpen(true)}>
            {copy.teaser}
          </button>
        )}
        <button type="button" className="olivia-toggle" onClick={() => setIsOpen((value) => !value)} aria-label={isOpen ? copy.close : copy.open}>
          {isOpen ? "x" : "IA"}
        </button>
      </div>
    </div>
  );
}
