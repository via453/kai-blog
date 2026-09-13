(function () {
  "use strict";

  var root = document.documentElement;
  var controls = document.querySelector("[data-kai-font-controls]");
  if (!controls) return;

  var sizes = {
    small: "0.98rem",
    default: "1.08rem",
    large: "1.22rem"
  };
  var storageKey = "kai-article-font-size";
  var storedSize = window.localStorage.getItem(storageKey) || "default";

  function applySize(size) {
    var nextSize = sizes[size] ? size : "default";
    root.style.setProperty("--kai-article-font-size", sizes[nextSize]);
    window.localStorage.setItem(storageKey, nextSize);

    controls.querySelectorAll("[data-font-size]").forEach(function (button) {
      button.dataset.fontSizeActive = String(button.dataset.fontSize === nextSize);
    });
  }

  controls.querySelectorAll("[data-font-size]").forEach(function (button) {
    button.addEventListener("click", function () {
      applySize(button.dataset.fontSize);
    });
  });

  applySize(storedSize);
})();

