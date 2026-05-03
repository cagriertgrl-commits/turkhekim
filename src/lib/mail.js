/**
 * Mail gönderme yardımcısı.
 * Resend API kullanır. RESEND_API_KEY ortam değişkeni şart.
 *
 * RESEND_API_KEY yoksa mail göndermez ama hata atmaz (dev modda sessiz geçer).
 */

const RESEND_URL = "https://api.resend.com/emails";
const FROM = process.env.MAIL_FROM || "DoktorPusula <noreply@doktorpusula.com>";

export async function mailGonder({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY tanımlı değil — mail gönderilmedi:", { to, subject });
    return { gonderildi: false, sebep: "RESEND_API_KEY yok" };
  }

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text: text || subject,
      }),
    });

    if (!res.ok) {
      const hata = await res.text();
      console.error("Resend hatası:", hata);
      return { gonderildi: false, sebep: hata };
    }

    const data = await res.json();
    return { gonderildi: true, id: data.id };
  } catch (err) {
    console.error("Mail gönderme hatası:", err);
    return { gonderildi: false, sebep: err.message };
  }
}

// Şablonlar
export function sifreSifirlaSablon(ad, link) {
  return {
    subject: "DoktorPusula — Şifre Sıfırlama",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:linear-gradient(135deg,#0D2137,#0a3d62);padding:30px;border-radius:16px 16px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:24px">Doktor<span style="color:#C9A84C">Pusula</span></h1>
        </div>
        <div style="background:white;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px">
          <p>Merhaba${ad ? ` ${ad}` : ""},</p>
          <p>DoktorPusula hesabınız için şifre sıfırlama talebi aldık.</p>
          <p>Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz. <strong>Bu link 1 saat içinde sona erecektir.</strong></p>
          <div style="text-align:center;margin:28px 0">
            <a href="${link}" style="display:inline-block;background:#0E7C7B;color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:bold">Şifremi Sıfırla</a>
          </div>
          <p style="font-size:13px;color:#666">Bu talebi siz yapmadıysanız bu maili görmezden gelin. Şifreniz değişmeyecek.</p>
          <p style="font-size:13px;color:#666">Buton çalışmıyorsa: <a href="${link}" style="color:#0E7C7B;word-break:break-all">${link}</a></p>
        </div>
      </div>
    `,
  };
}

export function emailDogrulamaSablon(ad, link) {
  return {
    subject: "DoktorPusula — E-posta Adresinizi Doğrulayın",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:linear-gradient(135deg,#0D2137,#0a3d62);padding:30px;border-radius:16px 16px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:24px">Doktor<span style="color:#C9A84C">Pusula</span></h1>
        </div>
        <div style="background:white;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px">
          <p>Merhaba${ad ? ` ${ad}` : ""},</p>
          <p>DoktorPusula'ya hoş geldiniz! Hesabınızı aktif etmek için aşağıdaki butona tıklayarak e-posta adresinizi doğrulayın.</p>
          <div style="text-align:center;margin:28px 0">
            <a href="${link}" style="display:inline-block;background:#0E7C7B;color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:bold">E-postamı Doğrula</a>
          </div>
          <p style="font-size:13px;color:#666">Bu link 24 saat içinde sona erecektir.</p>
        </div>
      </div>
    `,
  };
}
