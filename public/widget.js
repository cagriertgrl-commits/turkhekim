/**
 * DoktorPusula Widget Loader
 *
 * Kullanım:
 *   <div data-doktorpusula="doktor-slug" data-tema="acik"></div>
 *   <script src="https://doktorpusula.com/widget.js" async></script>
 *
 * Tema: "acik" (varsayılan) | "koyu"
 */
(function () {
  if (window.__DOKTORPUSULA_WIDGET_YUKLENDI__) return;
  window.__DOKTORPUSULA_WIDGET_YUKLENDI__ = true;

  var BASE = "https://doktorpusula.com";

  function widgetOlustur() {
    var hedefler = document.querySelectorAll("[data-doktorpusula]:not([data-dp-yuklendi])");
    for (var i = 0; i < hedefler.length; i++) {
      var el = hedefler[i];
      var slug = el.getAttribute("data-doktorpusula");
      if (!slug) continue;
      var tema = el.getAttribute("data-tema") || "acik";

      var iframe = document.createElement("iframe");
      iframe.src = BASE + "/embed/" + encodeURIComponent(slug) + "?tema=" + encodeURIComponent(tema);
      iframe.style.cssText = "border:0;width:100%;max-width:400px;height:340px;display:block;";
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("title", "DoktorPusula Profili");
      iframe.setAttribute("scrolling", "no");

      el.innerHTML = "";
      el.appendChild(iframe);
      el.setAttribute("data-dp-yuklendi", "1");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", widgetOlustur);
  } else {
    widgetOlustur();
  }

  // Dinamik içerik için MutationObserver
  if (typeof MutationObserver !== "undefined") {
    var observer = new MutationObserver(function () {
      widgetOlustur();
    });
    observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
  }
})();
