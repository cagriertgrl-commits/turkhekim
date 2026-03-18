// IP başına istek sayısını takip eden basit rate limiter
const istekler = new Map();

export function rateLimit(ip, limit = 5, pencereDakika = 10) {
  const simdi = Date.now();
  const pencere = pencereDakika * 60 * 1000;

  if (!istekler.has(ip)) {
    istekler.set(ip, []);
  }

  // Pencere dışındaki eski istekleri temizle
  const ipIstekleri = istekler.get(ip).filter(t => simdi - t < pencere);
  ipIstekleri.push(simdi);
  istekler.set(ip, ipIstekleri);

  const kalan = limit - ipIstekleri.length;
  return {
    basarili: ipIstekleri.length <= limit,
    kalan: Math.max(0, kalan),
    toplamLimit: limit,
  };
}
