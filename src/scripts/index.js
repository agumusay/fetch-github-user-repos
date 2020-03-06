import "regenerator-runtime/runtime";
import Widget from "./lib/reusable-widget";

import "../styles/main.scss";
import fontawesome from "@fortawesome/fontawesome-free";
import brands from "@fortawesome/fontawesome-free/js/brands";

document.addEventListener("DOMContentLoaded", () => {
  new Widget("main");
});
