export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/admin-giris/", "/panel/", "/firma-panel/", "/tercuman-panel/", "/hesabim/", "/giris/", "/firma-giris/", "/tercuman-giris/"],
    },
    sitemap: "https://doktorpusula.com/sitemap.xml",
  };
}
