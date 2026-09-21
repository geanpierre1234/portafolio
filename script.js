// Reemplaza el texto y los proyectos en index.html con tu información real.
// Añade aquí tu correo para activar los botones de contacto.
const profile = {
  email: "ledesmatorresgeanpierre@gmail.com",
  linkedin: "https://www.linkedin.com/in/carlos-torres-developer/",
  github: "https://github.com/geanpierre1234",
  cv: "", // Ruta de tu PDF, por ejemplo: "assets/Charles-Ledesma-CV.pdf".
};

const profileLinks = [
  { id: "linkedin-link", value: profile.linkedin, label: "LinkedIn" },
  { id: "github-link", value: profile.github, label: "GitHub" },
  { id: "cv-link", value: profile.cv, label: "CV" },
];
const pendingLinks = [];
for (const { id, value, label } of profileLinks) {
  const link = document.getElementById(id);
  const destination = value.trim();
  let url;
  try {
    url = new URL(destination, document.baseURI);
  } catch {
    url = null;
  }
  const allowed = url && (url.protocol === "https:" ||
    (id === "cv-link" && ["http:", "file:"].includes(url.protocol)));
  if (!destination || !allowed) {
    pendingLinks.push(label);
    continue;
  }
  link.href = url.href;
  link.removeAttribute("aria-disabled");
  link.removeAttribute("aria-describedby");
  if (id === "cv-link") {
    link.setAttribute("download", "Charles-Ledesma-CV.pdf");
  } else {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
}
const linksStatus = document.getElementById("profile-links-status");
linksStatus.textContent = pendingLinks.length ? `Pendiente de agregar: ${pendingLinks.join(", ")}.` : "";
linksStatus.hidden = pendingLinks.length === 0;

// Imagen de perfil guardada en IMAGEN/image.png.
// Las iniciales se mantienen visibles mientras el archivo no esté disponible.
document.querySelectorAll("[data-profile-image]").forEach((portrait) => {
  portrait.addEventListener("load", () => {
    portrait.hidden = false;
    portrait.parentElement.querySelector(".portrait-fallback").hidden = true;
  });
  portrait.src = portrait.dataset.profileImage;
});

document.getElementById("year").textContent = new Date().getFullYear();

const emailLink = document.getElementById("email-link");
const copyButton = document.getElementById("copy-email");
const contactStatus = document.getElementById("contact-status");
const email = profile.email.trim();

if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  emailLink.href = `mailto:${encodeURIComponent(email)}`;
  emailLink.hidden = false;
  copyButton.hidden = false;
  contactStatus.textContent = email;
  contactStatus.hidden = false;

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      contactStatus.textContent = "¡Correo copiado! Puedes pegarlo en tu aplicación de correo.";
    } catch {
      contactStatus.textContent = `Copia el correo manualmente: ${email}`;
    }
  });
}
