export type ContactInfo = {
  id: string;
  nombre: string;
  apellido: string;
  emailContacto: string;
  emailContactoOtp: boolean;
  emailCuenta: string;
  emailCuentaOtp: boolean;
  telContacto: string;
  telContactoOtp: boolean;
  whatsapp: string;
  whatsappOtp: boolean;
  nombreFeed: string;
  tipoBroker: string;
  gestorComercial: string;
};

export type PcomRow = {
  mes: string;
  destacados: number | null;
  elite: "activo" | "no";
  prime: number | null;
  oi: "activo" | "no";
  estado: "adquirido" | "proximo" | "no_aplica";
};

export const DEFAULT_CONTACT: ContactInfo = {
  id: "#1342345324",
  nombre: "Paola",
  apellido: "Galvis",
  emailContacto: "paola.galvis@propiedades.com",
  emailContactoOtp: true,
  emailCuenta: "angiegalvis@habi.co",
  emailCuentaOtp: true,
  telContacto: "3108605038",
  telContactoOtp: true,
  whatsapp: "3108605038",
  whatsappOtp: true,
  nombreFeed: "EasyBroker",
  tipoBroker: "Medium broker",
  gestorComercial: "lizzett.benitez@propiedades.com",
};

export const PCOM_ROWS: PcomRow[] = [
  { mes: "Mayo 2025", destacados: null, elite: "no", prime: null, oi: "no", estado: "no_aplica" },
  { mes: "Junio 2025", destacados: 5, elite: "activo", prime: 3, oi: "activo", estado: "adquirido" },
  { mes: "Julio 2025", destacados: 8, elite: "no", prime: 2, oi: "activo", estado: "proximo" },
  { mes: "Agosto 2025", destacados: 4, elite: "no", prime: null, oi: "activo", estado: "adquirido" },
  { mes: "Septiembre 2025", destacados: 2, elite: "no", prime: 1, oi: "no", estado: "proximo" },
  { mes: "Octubre 2025", destacados: null, elite: "no", prime: null, oi: "no", estado: "no_aplica" },
];