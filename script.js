console.log("Don't paste anything into the console unless you know what you are doing.");

window.addEventListener("message", (event) => {
	if (event.data.action === "toggleTheme") {
		if (event.data.checked) {
			document.body.classList.add("light-mode");
      document.querySelector("header").classList.add("light-mode");
		} else {
			document.body.classList.remove("light-mode");
			document.querySelector("header").classList.remove("light-mode");
		}
	}
});
window.addEventListener("message", (event) => {
	if (event.data.action === "toggleTheme") {
		if (event.data.checked) {
			document.body.classList.add("light-mode");
		} else {
			document.body.classList.remove("light-mode");
		}

		// forward the theme setting back into the iframe
		const iframe = document.querySelector("iframe");
		if (iframe && iframe.contentWindow) {
			iframe.contentWindow.postMessage(event.data, "*");
		}
	}
});


window.onload = function () {
  OnLoad();
};
function OnLoad() {
  let counter = parseInt(getStorage("Visited Pages"), 10);
  if (isNaN(counter)) counter = 1;
  else counter++;
  setStorage("Visited Pages", counter, 7);

  const prefs = JSON.parse(getStorage("cookiePreferences") || "{}");
  if (!prefs || counter % 10 === 0 || !allCookiesAccepted(prefs)) {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "block";
  }
}
function setStorage(name, value, days) {
  localStorage.setItem(name, typeof value === "string" ? value : JSON.stringify(value));
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}
function getStorage(name) {
  let value = localStorage.getItem(name);
  if (value !== null) return value;
  const cname = name + "=";
  const ca = decodeURIComponent(document.cookie).split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length);
  }
  return "";
}
function allCookiesAccepted(prefs) {
  return (
    prefs &&
    prefs.qualityOfLife &&
    prefs.fun &&
    prefs.marketing &&
    prefs.analytical &&
    prefs.functional
  );
}
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("cookie-modal");
  const acceptBtn = document.getElementById("accept-cookies");
  const openSettingsBtn = document.getElementById("open-settings");
  const acceptAllBtn = document.getElementById("accept-all");
  const savePreferencesBtn = document.getElementById("save-preferences");
  const form = document.getElementById("cookie-form");

  acceptBtn.addEventListener("click", () => {
    const allPrefs = {
      qualityOfLife: true,
      fun: true,
      marketing: true,
      analytical: true,
      functional: true,
    };
    setStorage("cookiePreferences", allPrefs, 365);
    banner.style.display = "none";
    modal.style.display = "none";
  });

  openSettingsBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  acceptAllBtn.addEventListener("click", () => {
    const allPrefs = {
      qualityOfLife: true,
      fun: true,
      marketing: true,
      analytical: true,
      functional: true,
    };
    setStorage("cookiePreferences", allPrefs, 365);
    banner.style.display = "none";
    modal.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const prefs = {
      qualityOfLife: formData.get("qualityOfLife") === "on",
      fun: formData.get("fun") === "on",
      marketing: formData.get("marketing") === "on",
      analytical: formData.get("analytical") === "on",
      functional: true,
    };
    setStorage("cookiePreferences", prefs, 365);
    banner.style.display = "none";
    modal.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
	const toggle = document.getElementById("themeToggle");

	if (localStorage.getItem("theme") === "0") {
		document.body.classList.add("light-mode");
		toggle.checked = true;
	}

	toggle.addEventListener("change", () => {
		const prefs = JSON.parse(localStorage.getItem("cookiePreferences") || "{}");

		if (toggle.checked) {
			document.body.classList.add("light-mode");
			if (prefs.qualityOfLife) {
				localStorage.setItem("theme", "0");
			}
		} else {
			document.body.classList.remove("light-mode");
			if (prefs.qualityOfLife) {
				localStorage.setItem("theme", "1");
			}
		}
	});
});

/*
const prefs = JSON.parse(localStorage.getItem("cookiePreferences") || "{}");
prefs.analytical
prefs.fun
prefs.functional
prefs.marketing
prefs.qualityOfLife
*/