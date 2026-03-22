import sql from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

const KATEGORILER = ["saglik-ipucu", "haber", "duyuru", "tedavi", "beslenme", "egzersiz"];

function slugUret(baslik) {
  const TR_MAP = { ğ: "g", ü: "u", ş: "s", ı: "i", ö: "o", ç: "c", â: "a", î: "i", û: "u" };
  return baslik
    .toLowerCase()
    .replace(/[ğüşıöçâîû]/g, (c) => TR_MAP[c] || c)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// GET /api/feed — Tüm yayındaki paylaşımlar
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
    const offset = parseInt(searchParams.get("offset") || "0");

    let paylasilar;
    if (kategori && KATEGORILER.includes(kategori)) {
      paylasilar = await sql`
        SELECT p.id, p.slug, p.baslik, p.icerik, p.kategori, p.okunma, p.created_at,
               d.ad, d.soyad, d.unvan, d.uzmanlik, d.sehir, d.slug as doktor_slug, d.foto_url
        FROM paylasilar p
        JOIN doktorlar d ON d.id = p.doktor_id
        WHERE p.yayinda = true AND d.onaylandi = true AND p.kategori = ${kategori}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      paylasilar = await sql`
        SELECT p.id, p.slug, p.baslik, p.icerik, p.kategori, p.okunma, p.created_at,
               d.ad, d.soyad, d.unvan, d.uzmanlik, d.sehir, d.slug as doktor_slug, d.foto_url
        FROM paylasilar p
        JOIN doktorlar d ON d.id = p.doktor_id
        WHERE p.yayinda = true AND d.onaylandi = true
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    return NextResponse.json({ paylasilar });
  } catch (err) {
    console.error("Feed GET hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası" }, { status: 500 });
  }
}

// POST /api/feed — Yeni paylaşım oluştur (doktor paneli)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ hata: "Giriş gerekli" }, { status: 401 });
    }

    const { baslik, icerik, kategori } = await request.json();

    if (!baslik || baslik.trim().length < 5) {
      return NextResponse.json({ hata: "Başlık en az 5 karakter olmalı" }, { status: 400 });
    }
    if (!icerik || icerik.trim().length < 50) {
      return NextResponse.json({ hata: "İçerik en az 50 karakter olmalı" }, { status: 400 });
    }
    if (!KATEGORILER.includes(kategori)) {
      return NextResponse.json({ hata: "Geçersiz kategori" }, { status: 400 });
    }

    const baseSlug = slugUret(baslik.trim());
    // Slug benzersizliği için timestamp ekle
    const slug = `${baseSlug}-${Date.now()}`;

    const [yeni] = await sql`
      INSERT INTO paylasilar (doktor_id, baslik, slug, icerik, kategori)
      VALUES (${session.user.id}, ${baslik.trim()}, ${slug}, ${icerik.trim()}, ${kategori})
      RETURNING id, slug, baslik, kategori, created_at
    `;

    return NextResponse.json({ basari: true, paylasilar: yeni });
  } catch (err) {
    console.error("Feed POST hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası" }, { status: 500 });
  }
}

// DELETE /api/feed — Paylaşımı sil (sadece sahibi)
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ hata: "Giriş gerekli" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) return NextResponse.json({ hata: "ID gerekli" }, { status: 400 });

    const sonuc = await sql`
      DELETE FROM paylasilar WHERE id = ${id} AND doktor_id = ${session.user.id}
      RETURNING id
    `;

    if (sonuc.length === 0) {
      return NextResponse.json({ hata: "Paylaşım bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ basari: true });
  } catch (err) {
    console.error("Feed DELETE hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası" }, { status: 500 });
  }
}
