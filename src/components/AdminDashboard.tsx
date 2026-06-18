"use client";

import { useCallback, useEffect, useState } from "react";
import type { Buyer } from "@/lib/db";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminDashboard() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/buyers");
    if (!res.ok) {
      setError("No se pudieron cargar los compradores");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setBuyers(data.buyers ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  function exportCsv() {
    const headers = [
      "id",
      "nombre",
      "email",
      "telefono",
      "monto",
      "moneda",
      "estado",
      "correo_enviado",
      "whatsapp_enviado",
      "fecha",
      "stripe_session",
    ];
    const rows = buyers.map((b) =>
      [
        b.id,
        b.name ?? "",
        b.email,
        b.phone ?? "",
        (b.amount / 100).toFixed(2),
        b.currency,
        b.status,
        b.email_sent ? "si" : "no",
        b.whatsapp_sent ? "si" : "no",
        b.created_at,
        b.stripe_session_id,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compradores-aprender-a-amar-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Compradores</h1>
          <p className="admin-sub">
            {loading ? "Cargando…" : `${buyers.length} inscripción(es) registrada(s)`}
          </p>
        </div>
        <div className="admin-actions">
          <button type="button" className="btn btn-cream" onClick={load} disabled={loading}>
            Actualizar
          </button>
          <button
            type="button"
            className="btn btn-cream"
            onClick={exportCsv}
            disabled={!buyers.length}
          >
            Exportar CSV
          </button>
          <button type="button" className="btn btn-outline-dark" onClick={logout}>
            Salir
          </button>
        </div>
      </div>

      {error && <p className="checkout-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Pago</th>
              <th>Correo</th>
              <th>WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {!loading && buyers.length === 0 ? (
              <tr>
                <td colSpan={7} className="admin-empty">
                  Aún no hay compradores. Cuando alguien pague con Stripe, aparecerá aquí.
                </td>
              </tr>
            ) : (
              buyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td>{formatDate(buyer.created_at)}</td>
                  <td>{buyer.name ?? "—"}</td>
                  <td>
                    <a href={`mailto:${buyer.email}`}>{buyer.email}</a>
                  </td>
                  <td>
                    {buyer.phone ? (
                      <a
                        href={`https://wa.me/${buyer.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {buyer.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{formatMoney(buyer.amount, buyer.currency)}</td>
                  <td>{buyer.email_sent ? "✓" : "—"}</td>
                  <td>{buyer.whatsapp_sent ? "✓" : "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
