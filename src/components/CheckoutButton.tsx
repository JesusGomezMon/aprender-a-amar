"use client";

import { FormEvent, useState } from "react";

export function CheckoutButton() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Error al iniciar el pago");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setLoading(false);
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label className="checkout-label" htmlFor="email">
        Correo para tu comprobante
      </label>
      <input
        id="email"
        type="email"
        className="checkout-input"
        placeholder="tu@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Redirigiendo a Stripe…" : "Pagar con tarjeta · $400"}
      </button>
      {error && <p className="checkout-error">{error}</p>}
      <p className="checkout-note">Pago seguro procesado por Stripe.</p>
    </form>
  );
}
