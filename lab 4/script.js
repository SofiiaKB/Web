// нижче виконується запис та читання інформації з localStorage

localStorage.setItem(
  "navigator-info",
  JSON.stringify(window.navigator.userAgent)
);

const navigatorInfo = JSON.parse(localStorage.getItem("navigator-info"));

const p = document.createElement("p");
p.prepend(navigatorInfo);
document.getElementById("footer").prepend(p);

// нижче відображення списку коментарів отриманого з серверу

fetch("https://jsonplaceholder.typicode.com/posts/15/comments")
  .then((response) => response.json())
  .then((result) => {
    const container = document.getElementById("comments");

    result.forEach((comment, i) => {
      const newDiv = document.createElement("div");
      const name = document.createElement("p");
      const email = document.createElement("p");
      const body = document.createElement("p");

      name.prepend(`Username: ${comment.name}`);
      email.prepend(`Email: ${comment.email}`);
      body.prepend(`Comment: ${comment.body}`);
      newDiv.prepend(name, email, body);
      container.append(newDiv);

      if (i < result.length - 1)
        newDiv.style.borderBottom = "1px solid antiquewhite";
    });
  });

// нижче відкриття/закриття модального вікна з формою зворотного зв'язку

const modal = document.getElementById("modal");

setTimeout(() => (modal.style.display = "block"), 60000);

document.getElementById("contactForm").onsubmit = () =>
  (modal.style.display = "none");

// нижче переключення стилів в залежності від того, яку тему обирає користувач

const toggleBtn = document.getElementById("toggleTheme");

const toggleTheme = () => {
  const nightTheme = Array.from(toggleBtn.classList).includes("dayIcon");

  const headerStyles = document.getElementById("header").style;
  headerStyles.backgroundColor = nightTheme
    ? "rgb(163, 130, 100)"
    : "antiquewhite";

  const bodyStyles = document.body.style;
  bodyStyles.backgroundColor = nightTheme ? "rgba(30, 30, 30, 0.8)" : "unset";
  bodyStyles.color = nightTheme ? "white" : "black";

  const skillsBlocks = document.getElementsByClassName("flex-box");
  Array.from(skillsBlocks).forEach((elem) => {
    elem.style.backgroundColor = nightTheme ? "rgb(163, 130, 100)" : "#fff2e6";
  });

  const modalContent = document.getElementById("modal-content");
  modalContent.style.backgroundColor = nightTheme ? "rgb(30, 30, 30)" : "unset";
};

toggleBtn.onclick = () => {
  toggleBtn.classList.toggle("nightIcon");
  toggleBtn.classList.toggle("dayIcon");

  toggleTheme();
};

// нижче встановлення темної теми щовечора об 21:00

const current = new Date();
const targetEvening = new Date();

targetEvening.setHours(21, 0, 0, 0);

if (current > targetEvening) targetEvening.setDate(targetEvening.getDate() + 1);

const timeDiffEvening = targetEvening - current;

setTimeout(() => {
  toggleBtn.classList.remove("nightIcon");
  toggleBtn.classList.add("dayIcon");

  toggleTheme();

  setInterval(() => {
    toggleBtn.classList.remove("nightIcon");
    toggleBtn.classList.add("dayIcon");

    toggleTheme();
  }, 24 * 60 * 60 * 1000);
}, timeDiffEvening);

//нижче встановлення світлої теми щоранку об 07:00

const targetMorning = new Date();

targetMorning.setHours(7, 0, 0, 0);

if (current > targetMorning) targetMorning.setDate(targetMorning.getDate() + 1);

const timeDiffMorning = targetMorning - current;

setTimeout(() => {
  toggleBtn.classList.remove("dayIcon");
  toggleBtn.classList.add("nightIcon");

  toggleTheme();

  setInterval(() => {
    toggleBtn.classList.remove("dayIcon");
    toggleBtn.classList.add("nightIcon");

    toggleTheme();
  }, 24 * 60 * 60 * 1000);
}, timeDiffMorning);
