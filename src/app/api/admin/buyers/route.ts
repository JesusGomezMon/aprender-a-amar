import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { listBuyers } from "@/lib/db";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const buyers = await listBuyers();
    return NextResponse.json({ buyers });
  } catch (error) {
    console.error("[admin/buyers]", error);
    return NextResponse.json(
      { error: "No se pudo leer la base de datos" },
      { status: 500 },
    );
  }
}
