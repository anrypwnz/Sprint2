import './styles/styles.less'

const modal = document.querySelector(".modal");
const menuBtn = document.querySelector(".info-panel__menu-btn");
const editChatMenu = document.querySelector(".info-panel__menu");
const addFileMenu = document.querySelector(".modal-options");
const addFileBtn = document.querySelector(".msg-panel__add-file");
const msgPanel = document.forms.msgPanel;
const registerForm = document.forms.register;

if (msgPanel) addFormListener(msgPanel);
if (registerForm) addFormListener(registerForm);

if (modal) {
  modal.addEventListener("mousedown", (e) => {
    console.log("###### e.target:", e.target);
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

if (menuBtn) {
  menuBtn.addEventListener("mousedown", () => {
    editChatMenu.classList.toggle("info-panel__menu_show");
  });
}

if (addFileBtn) {
  addFileBtn.addEventListener("mousedown", () => {
    addFileMenu.classList.toggle("modal-options_show");
  });
}

function addFormListener(form) {
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = {};
      for (let i = 0; i < form.elements.length; i++) {
        data[form.elements[i].name] = form.elements[i].value;
      }
      console.log(`send message form data: `, data);
    });
  } else {
    console.log("###### no-form:", form);
  }
}
