"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const API = "https://suitesmine-kni3rmip5-olivier-steineur.vercel.app/api";
const CLIENT = "homedesignmarques";
type Message = { role: "assistant" | "user"; content: string };
type Contact = { name?: string; email?: string; phone?: string };

export default function VanessaAI() {
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const visitorId = useRef("");
  const contact = useRef<Contact>({});

  useEffect(() => {
    const english = window.location.pathname.startsWith("/en");
    setIsEnglish(english);
    const consent = localStorage.getItem(`vanessaConsent:${CLIENT}`) === "accepted";
    setAccepted(consent);
    visitorId.current = localStorage.getItem(`vanessaVisitor:${CLIENT}`) || crypto.randomUUID();
    localStorage.setItem(`vanessaVisitor:${CLIENT}`, visitorId.current);
    try { contact.current = JSON.parse(localStorage.getItem(`vanessaContact:${visitorId.current}`) || "{}"); } catch { contact.current = {}; }
    setMessages([
      { role: "assistant", content: english ? "Hello, I am Vanessa AI." : "Hola, soy Vanessa AI." },
      { role: "assistant", content: english ? "I am Home Design Marques’ digital advisor. How can I help with your project?" : "Soy la asesora digital de Home Design Marques. ¿Cómo puedo ayudarle con su proyecto?" },
    ]);
  }, []);

  const rememberContact = (text: string) => {
    const email = text.match(/[^\s@]+@[^\s@]+\.[^\s@,.;]+/)?.[0] || contact.current.email;
    const phone = text.match(/(?:\+?\d[\d\s().-]{6,}\d)/)?.[0] || contact.current.phone;
    let name = contact.current.name;
    if (!name && email) {
      const candidate = text.slice(0, text.indexOf(email)).replace(/\b(hola|hello|soy|i am|me llamo|my name is)\b/gi, " ").replace(/[,:;|]+/g, " ").replace(/\s+/g, " ").trim();
      if (/^[\p{L}' -]{2,80}$/u.test(candidate)) name = candidate;
    }
    contact.current = { name, email, phone };
    localStorage.setItem(`vanessaContact:${visitorId.current}`, JSON.stringify(contact.current));
  };

  const send = async (event?: FormEvent, preset?: string) => {
    event?.preventDefault();
    if (!accepted) { setPrivacy(true); return; }
    const content = (preset || input).trim();
    if (!content || loading) return;
    setInput(""); setLoading(true); rememberContact(content);
    setMessages((items) => [...items, { role: "user", content }]);
    const metadata = { pageUrl: location.href, pageTitle: document.title, pageContent: document.body.innerText.replace(/\s+/g, " ").slice(0, 5000), dataConsent: true, privacyVersion: "hdm-vanessa-2026-07-01", bookingDraft: contact.current, ...contact.current };
    try {
      await fetch(`${API}/widget/conversations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientCode: CLIENT, visitorId: visitorId.current, content, source: "website", language: isEnglish ? "en" : "es", metadata }) });
      const response = await fetch(`${API}/olivia/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientCode: CLIENT, message: content, language: isEnglish ? "en" : "es", metadata }) });
      const data = await response.json();
      const reply = data.reply || (isEnglish ? "Thank you. An advisor will follow up shortly." : "Gracias. Un asesor dará seguimiento en breve.");
      setMessages((items) => [...items, { role: "assistant", content: reply }]);
      await fetch(`${API}/widget/conversations`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientCode: CLIENT, visitorId: visitorId.current, content: reply, model: data.model }) });
    } catch {
      setMessages((items) => [...items, { role: "assistant", content: isEnglish ? "Please contact info@homedesignmarques.com." : "Por favor contacte a info@homedesignmarques.com." }]);
    } finally { setLoading(false); }
  };

  const actions = isEnglish ? [["Wooden homes", "I am interested in a wooden home"], ["Furniture", "I am interested in custom furniture"], ["Quote", "I would like a quote"], ["Contact", "I need contact information"]] : [["Casas", "Me interesa una casa de madera"], ["Muebles", "Me interesan muebles a medida"], ["Cotizar", "Quiero solicitar una cotización"], ["Contacto", "Necesito información de contacto"]];

  return <div className="fixed bottom-5 right-5 z-[9998] font-sans text-[#2b211d]">
    {open && <section className="mb-3 flex h-[590px] max-h-[calc(100vh-100px)] w-[390px] max-w-[calc(100vw-28px)] flex-col overflow-hidden rounded-2xl border border-[#d7a928] bg-[#fef7e7] shadow-2xl">
      <header className="flex items-center justify-between bg-[#5d3b2d] px-5 py-4 text-white"><div><strong className="block text-xl text-[#f2cf68]">Vanessa AI</strong><small>{isEnglish ? "Digital advisor · Online" : "Asesora digital · En línea"}</small></div><button onClick={() => setOpen(false)} className="text-3xl">×</button></header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">{messages.map((message, index) => <p key={index} className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 shadow-sm ${message.role === "user" ? "ml-auto bg-[#5d3b2d] text-white" : "bg-white"}`}>{message.content}</p>)}</div>
      <div className="flex gap-2 overflow-x-auto border-t border-[#eadcb8] p-2">{actions.map(([label, message]) => <button key={label} onClick={() => send(undefined, message)} className="shrink-0 rounded-full border border-[#d7a928] bg-white px-3 py-2 text-xs font-semibold">{label}</button>)}</div>
      {!accepted && <button onClick={() => setPrivacy(true)} className="bg-white px-4 py-2 text-left text-xs underline">{isEnglish ? "Read and accept the Privacy Notice" : "Leer y aceptar el Aviso de Privacidad"}</button>}
      <form onSubmit={send} className="flex gap-2 bg-[#5d3b2d] p-3"><input value={input} onChange={(e) => setInput(e.target.value)} disabled={!accepted || loading} placeholder={isEnglish ? "Write your message…" : "Escriba su mensaje…"} className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3"/><button disabled={!accepted || loading} className="rounded-xl bg-[#d7a928] px-4 font-bold disabled:opacity-50">{isEnglish ? "Send" : "Enviar"}</button></form>
    </section>}
    <button onClick={() => { setOpen(true); if (!accepted) setPrivacy(true); }} className="ml-auto flex items-center gap-2 rounded-full border border-[#d7a928] bg-[#5d3b2d] px-4 py-3 text-white shadow-xl"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#d7a928] font-bold text-[#5d3b2d]">V</span>{isEnglish ? "Need help?" : "¿Necesita ayuda?"}</button>
    {privacy && <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-5"><div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl bg-white p-7"><h2 className="mb-4 text-2xl font-bold text-[#5d3b2d]">{isEnglish ? "Vanessa AI Privacy Notice" : "Aviso de Privacidad de Vanessa AI"}</h2><p className="mb-4 leading-relaxed">{isEnglish ? "Home Design Marques will process the name, email, phone, messages and visited page you share with Vanessa AI to answer your request, prepare follow-up and contact you electronically." : "Home Design Marques tratará el nombre, correo, teléfono, mensajes y página visitada que comparta con Vanessa AI para atender su solicitud, preparar el seguimiento y contactarle por medios electrónicos."}</p><a className="text-[#5d3b2d] underline" href={isEnglish ? "/en/privacy" : "/aviso-privacidad"} target="_blank">{isEnglish ? "Read the full Privacy Notice" : "Consultar el Aviso de Privacidad completo"}</a><label className="my-5 flex gap-2"><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)}/>{isEnglish ? "I have read and accept the Privacy Notice." : "He leído y acepto el Aviso de Privacidad."}</label><div className="flex justify-end gap-3"><button onClick={() => setPrivacy(false)} className="rounded-lg bg-gray-200 px-4 py-2">{isEnglish ? "Cancel" : "Cancelar"}</button><button disabled={!checked} onClick={() => { localStorage.setItem(`vanessaConsent:${CLIENT}`, "accepted"); setAccepted(true); setPrivacy(false); }} className="rounded-lg bg-[#d7a928] px-4 py-2 font-bold disabled:opacity-50">{isEnglish ? "Accept" : "Aceptar"}</button></div></div></div>}
  </div>;
}
