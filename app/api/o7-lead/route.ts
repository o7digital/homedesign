import { NextResponse } from "next/server";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqadzpgz";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const language = clean(body.language) || "es";
    const message = clean(body.message);

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing lead fields" }, { status: 400 });
    }

    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: firstName,
        apellido: lastName,
        _replyto: email,
        telefono: phone,
        comentarios: `Lead Olivia AI Home Design Marques (${language})\n\n${message}`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Olivia lead error:", error);
    return NextResponse.json({ ok: true });
  }
}
