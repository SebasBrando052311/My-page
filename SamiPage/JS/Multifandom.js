// Esta lista contiene toda la informacion que se mostrara en las tarjetas.
// Para agregar otro personaje, crea un nuevo objeto con esta misma estructura.
const ocs = [

];

// Buscamos el elemento <main> de Mha.html para insertar las tarjetas dentro.
const main = document.querySelector("main");

// Crea un elemento HTML, agrega texto y le asigna una clase CSS.
function createTextElement(tagName, text, className) {
  const element = document.createElement(tagName);
  element.textContent = text;
  element.className = className;
  return element;
}

let sectionCounter = 0;

// Crea una seccion que puede abrirse y cerrarse con su propio boton.
function createCollapsibleSection(title, content) {
  const section = document.createElement("section");
  section.className = "oc-card__section";

  sectionCounter += 1;
  const sectionId = `section-${sectionCounter}`;
  const sectionButton = createTextElement(
    "button",
    title,
    "oc-card__section-toggle",
  );
  sectionButton.type = "button";
  sectionButton.setAttribute("aria-expanded", "false");
  sectionButton.setAttribute("aria-controls", sectionId);

  const sectionContent = document.createElement("div");
  sectionContent.className = "oc-card__section-content";
  sectionContent.id = sectionId;
  sectionContent.hidden = true;
  sectionContent.append(content);

  sectionButton.addEventListener("click", () => {
    const isOpen = !sectionContent.hidden;
    sectionContent.hidden = isOpen;
    sectionButton.setAttribute("aria-expanded", String(!isOpen));
  });

  section.append(sectionButton, sectionContent);
  return section;
}

function createOcCard(oc) {
  // La tarjeta se construye desde cero para usar los datos del personaje.
  const card = document.createElement("article");
  card.className = "oc-card";

  const image = document.createElement("img");
  image.className = "oc-card__image";
  image.src = oc.imagen;
  image.alt = `Imagen de ${oc.nombre}`;

  const content = document.createElement("div");
  content.className = "oc-card__content";
  content.append(
    createTextElement("h2", oc.nombre, "oc-card__title"),
    createTextElement("p", `Categoria: ${oc.categoria}`, "oc-card__category"),
  );

  const details = document.createElement("div");
  details.className = "oc-card__details";
  // hidden oculta los detalles hasta que el usuario pulse el boton.
  details.hidden = true;
  details.append(
    createTextElement("h3", "Informacion personal", "oc-card__heading"),
    createTextElement(
      "p",
      `Genero: ${oc.genero} | Nacionalidad: ${oc.nacionalidad}`,
      "oc-card__text",
    ),
  );
  ;

  details.append(
    createCollapsibleSection(
      `Quirk: ${oc.quirk.nombre}`,
      createTextElement("p", oc.quirk.descripcion, "oc-card__text"),
    ),
    createCollapsibleSection(
      "Historia",
      createTextElement("p", oc.historia, "oc-card__text"),
    ),
    createCollapsibleSection("Curiosidades", curiosidades),
  );

  const toggleButton = document.createElement("button");
  toggleButton.className = "oc-card__toggle";
  toggleButton.type = "button";
  toggleButton.textContent = "Mostrar informacion";
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.addEventListener("click", () => {
    // Si los detalles estan ocultos, la tarjeta se abrira; si no, se cerrara.
    const isOpen = !details.hidden;

    if (!isOpen) {
      // Antes de abrir esta tarjeta, cerramos cualquier otra que este abierta.
      document.querySelectorAll(".oc-card__details").forEach((otherDetails) => {
        if (otherDetails !== details) {
          otherDetails.hidden = true;
          const otherButton =
            otherDetails.parentElement.querySelector(".oc-card__toggle");
          otherButton.textContent = "Mostrar informacion";
          otherButton.setAttribute("aria-expanded", "false");
        }
      });
    }

    details.hidden = isOpen;
    toggleButton.textContent = isOpen
      ? "Mostrar informacion"
      : "Ocultar informacion";
    toggleButton.setAttribute("aria-expanded", String(!isOpen));
  });

  // Orden visual de la tarjeta: imagen, contenido, detalles y boton.
  content.append(details, toggleButton);
  card.append(image, content);
  return card;
} 

// Repetimos el proceso para cada personaje de la lista.
ocs.forEach((oc) => main.append(createOcCard(oc)));
