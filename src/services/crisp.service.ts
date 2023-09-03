// @ts-nocheck

export default function loadCrisp() {
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = "9a70b14e-b8db-48b2-8773-95eb66b91cee";
  (function IIF() {
    const d = document;
    const s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    s.defer = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
    window.$crisp.push(["set", "session:segments", [["invoicehero"]]]);
    window.$crisp.push(["set", "session:data", ["storename", window.shopName]]);
  })();
}
