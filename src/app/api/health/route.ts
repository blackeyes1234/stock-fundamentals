import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "stock-fundamentals",
    timestamp: new Date().toISOString(),
  });
}
