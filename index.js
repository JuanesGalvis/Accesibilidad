window.onload = () => {
  document.querySelector(".arrow-right").addEventListener("click", clickRight);
  document.querySelector(".arrow-left").addEventListener("click", clickLeft);
  document
    .querySelector(".send-button")
    .addEventListener("click", (e) => Validacion(e));
  document.querySelectorAll(".project-button").forEach((element) => {
    element.addEventListener("click", (e) => ImgClick(e));
  });
  document.body.addEventListener("click", (e) => closeModal(e));
  document.body.addEventListener("keyup", (e) => CloseEsc(e));
};

/** Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft < -270) {
    //si el valor de izquierda es menor a -270, para de mover el contenido
    return;
  }
  let newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen mas sus margines
  document.querySelector(".project-container").style.left = `${newValue}px`;

  switch (newValue) {
    case -270:
      document.querySelector(".project1").setAttribute("tabindex", "-1");
      document
        .querySelector(".project1-container")
        .setAttribute("aria-hidden", true);

      document.querySelector(".project4").setAttribute("tabindex", "0");
      document
        .querySelector(".project4-container")
        .setAttribute("aria-hidden", false);

      break;
    case -540:
      document.querySelector(".project2").setAttribute("tabindex", "-1");
      document
        .querySelector(".project2-container")
        .setAttribute("aria-hidden", true);

      document.querySelector(".project5").setAttribute("tabindex", "0");
      document
        .querySelector(".project5-container")
        .setAttribute("aria-hidden", false);

      break;
    default:
      break;
  }
}

/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft === 0) {
    //si el valor de izquiera es 0, retornar para no seguir movierno el contenido
    return;
  }
  let newValue = currentLeft + 270;
  document.querySelector(".project-container").style.left = `${newValue}px`;

  switch (newValue) {
    case -270:
      document.querySelector(".project5").setAttribute("tabindex", "-1");
      document
        .querySelector(".project5-container")
        .setAttribute("aria-hidden", true);

      document.querySelector(".project2").setAttribute("tabindex", "0");
      document
        .querySelector(".project2-container")
        .setAttribute("aria-hidden", false);

      break;
    case 0:
      document.querySelector(".project4").setAttribute("tabindex", "-1");
      document
        .querySelector(".project4-container")
        .setAttribute("aria-hidden", true);

      document.querySelector(".project1").setAttribute("tabindex", "0");
      document
        .querySelector(".project1-container")
        .setAttribute("aria-hidden", false);

      break;
    default:
      break;
  }
}
// Validar el formulario de contacto antes de la notificación
function Validacion(e) {
  e.preventDefault();

  let Trues = 0;

  const Name = document.getElementById("Nombre").value;
  console.log(Name);

  if (Name === "") {
    document.querySelector("#Nombre__Error").innerHTML =
      "! Para enviar el formulario, debes poner tu nombre";
  } else {
    document.querySelector("#Nombre__Error").style.display = "none";
    Trues++;
  }

  const Correo = document.getElementById("Correo").value;
  console.log(Name);

  if (Correo === "") {
    document.querySelector("#Email__Error").innerHTML =
      "! Para enviar el formulario, debes poner tu correo";
  } else {
    document.querySelector("#Email__Error").style.display = "none";
    Trues++;
  }

  const Mensaje = document.getElementById("Mensaje").value;
  console.log(Name);

  if (Mensaje === "") {
    document.querySelector("#Mensaje__Error").innerHTML =
      "! Para enviar el formulario, debes poner tu Mensaje";
  } else {
    document.querySelector("#Mensaje__Error").style.display = "none";
    Trues++;
  }

  if (Trues === 3) {
    showNotification();
  }
}

/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
  document.querySelector(".form-container").reset();

  document.querySelector(".notification").innerHTML =
    "El formulario fue enviado sin errores";
  document.querySelector(".notification").style.display = "flex";
  setTimeout(function () {
    document.querySelector(".notification").style.display = "none";
  }, 3000);
}

function CloseEsc(e) {
  if (e.key === "Escape") {
    closeModal(e);
  }
}

/** Esta funcion se llama cuando la persona hace click en cualquier porjecto del carousel */
function ImgClick(e) {
  // VALIDAR SI FUE CON EL TECLADO O CON CLICK
  if (e.clientX === 0 && e.clientY === 0) {
    // TECLADO
    let IMG = e.srcElement.classList[0];
    document
      .querySelector("#img-modal")
      .setAttribute("src", `./images/${IMG}.png`);
  } else {
    // CLICK
    let IMG = e.srcElement.src;
    document.querySelector("#img-modal").setAttribute("src", IMG);
  }

  openModal();
}

function openModal() {
  document.querySelector(".modal-container").style.display = "flex";
  document.getElementById("modal-header").focus();
}

/** Esta funcion se llama para cerrar el modal */
function closeModal(e) {
  // si el click occurio dentro del las imagenes del carousel o dentro del modal, no se cierra el modal
  if (
    e.target.className.includes("project") ||
    e.target.className === "modal"
  ) {
    return;
  } else {
    document.querySelector(".modal-container").style.display = "none";
  }
}
