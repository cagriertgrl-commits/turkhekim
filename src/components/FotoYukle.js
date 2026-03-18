"use client";

export default function FotoYukle({ fotoUrl, initials }) {
  function dosyaSecildi(e) {
    if (e.target.files?.[0]) {
      e.target.form.submit();
    }
  }

  return (
    <div className="text-center mb-4">
      {fotoUrl ? (
        <img
          src={fotoUrl}
          alt="Profil fotoğrafı"
          className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-4 border-gray-100"
        />
      ) : (
        <div
          style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }}
          className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2"
        >
          {initials}
        </div>
      )}
      <form action="/api/foto-yukle" method="POST" encType="multipart/form-data">
        <label className="cursor-pointer text-xs text-teal-600 hover:underline">
          {fotoUrl ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
          <input
            type="file"
            name="foto"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={dosyaSecildi}
          />
        </label>
      </form>
      <p className="text-xs text-gray-400 mt-0.5">Maks. 2MB · JPG/PNG/WEBP</p>
    </div>
  );
}
