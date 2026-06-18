import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Acceso administración",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="admin-page">
      <div className="admin-login-card">
        <span className="eyebrow">Panel interno</span>
        <h1 className="admin-title">Seguimiento de compradores</h1>
        <p className="body">
          Acceso privado para ver quién se inscribió y dar seguimiento.
        </p>
        <AdminLoginForm />
        <Link href="/" className="admin-back">
          Volver a la landing
        </Link>
      </div>
    </main>
  );
}
