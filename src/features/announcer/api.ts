import type { ContactInfo } from "./types";
import { DEFAULT_CONTACT } from "./types";

const KNOWN_EMAIL = "angiegalvis@habi.co";

function wait(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

export async function searchClient(email: string): Promise<ContactInfo> {
  await wait(700);
  const value = email.trim().toLowerCase();
  if (!value) throw new Error("Ingresa un correo para buscar.");
  if (!/^\S+@\S+\.\S+$/.test(value)) throw new Error("El correo no tiene un formato válido.");
  if (value !== KNOWN_EMAIL) throw new Error("No encontramos un anunciante con ese correo.");
  return { ...DEFAULT_CONTACT, emailCuenta: value };
}

export async function saveContact(contact: ContactInfo): Promise<ContactInfo> {
  await wait(600);
  // Simulated validation
  if (!contact.nombre.trim() || !contact.apellido.trim()) {
    throw new Error("Nombre y apellido son obligatorios.");
  }
  if (!/^\S+@\S+\.\S+$/.test(contact.emailContacto)) {
    throw new Error("Email de contacto inválido.");
  }
  return contact;
}