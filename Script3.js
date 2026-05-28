const quizQuestions = [
  {
    question: "Кто был первым царём из династии Романовых?",
    options: ["Иван IV", "Михаил Фёдорович", "Пётр I", "Александр I"],
    correct: 1
  },
  {
    question: "В каком году Россия была провозглашена империей?",
    options: ["1613", "1703", "1721", "1812"],
    correct: 2
  },
  {
    question: "Какой документ связан с отменой крепостного права?",
    options: ["Соборное уложение", "Манифест 1861 года", "Табель о рангах", "Манифест 17 октября"],
    correct: 1
  },
  {
    question: "С каким правителем связано прозвище «Освободитель»?",
    options: ["Александр II", "Александр III", "Николай I", "Павел I"],
    correct: 0
  },
  {
    question: "Чем закончилась история правления Романовых?",
    options: ["Северной войной", "Отречением Николая II в 1917 году", "Венским конгрессом", "Основанием Москвы"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const quizBox = document.querySelector("#quizBox");
const startButton = document.querySelector("#startQuiz");

function renderQuestion() {
  const item = quizQuestions[currentQuestion];

  quizBox.innerHTML = `
    <p class="quiz__question">Вопрос ${currentQuestion + 1} из ${quizQuestions.length}: ${item.question}</p>
    <div class="quiz__options">
      ${item.options
        .map((option, index) => `<button class="quiz__option" type="button" data-index="${index}">${option}</button>`)
        .join("")}
    </div>
    <p id="quizFeedback"></p>
  `;

  document.querySelectorAll(".quiz__option").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button, item));
  });
}

function checkAnswer(button, item) {
  const selectedIndex = Number(button.dataset.index);
  const buttons = document.querySelectorAll(".quiz__option");
  const feedback = document.querySelector("#quizFeedback");

  buttons.forEach((btn) => {
    btn.disabled = true;

    if (Number(btn.dataset.index) === item.correct) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === item.correct) {
    score += 1;
    feedback.textContent = "Верно!";
  } else {
    button.classList.add("wrong");
    feedback.textContent = `Неверно. Правильный ответ: ${item.options[item.correct]}.`;
  }

  const nextButton = document.createElement("button");
  nextButton.className = "button";
  nextButton.type = "button";

  nextButton.textContent =
    currentQuestion + 1 === quizQuestions.length
      ? "Показать результат"
      : "Следующий вопрос";

  nextButton.addEventListener("click", () => {
    currentQuestion += 1;

    if (currentQuestion < quizQuestions.length) {
      renderQuestion();
    } else {
      renderResult();
    }
  });

  quizBox.appendChild(nextButton);
}

function renderResult() {
  const percent = Math.round((score / quizQuestions.length) * 100);

  quizBox.innerHTML = `
    <p class="quiz__question">Результат: ${score} из ${quizQuestions.length} (${percent}%).</p>
    <p>${percent >= 80 ? "Отлично! Материал хорошо усвоен." : "Стоит ещё раз повторить хронологию и реформы."}</p>
    <button class="button" id="restartQuiz" type="button">Пройти заново</button>
  `;

  document.querySelector("#restartQuiz").addEventListener("click", startQuiz);
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  renderQuestion();
}

if (startButton) {
  startButton.addEventListener("click", startQuiz);
}

/* Подсветка активного пункта меню */
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

function setActiveNavLink() {
  const scrollPosition = window.scrollY + 130;
  let activeId = "home";

  for (const section of sections) {
    if (section.offsetTop <= scrollPosition) {
      activeId = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
}

window.addEventListener("scroll", setActiveNavLink);
setActiveNavLink();

/* Подробные карточки правителей */
const fallbackImage = "https://commons.wikimedia.org/wiki/Special:FilePath/House_of_Romanoff.svg";

const rulerInfo = {
  mikhail: {
    name: "Михаил Фёдорович",
    years: "1613–1645",
    life: "1596–1645",
    spouse: "Мария Долгорукова; Евдокия Стрешнева",
    children: "10 детей, среди них Алексей Михайлович",
    before: "Смутное время; новая династия была утверждена Земским собором",
    after: "Алексей Михайлович",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Michael-I-Romanov-Wedekind%20%28cropped%29.jpg",
    text: "Первый царь из династии Романовых. Его избрание в 1613 году стало важным шагом к восстановлению государства после Смуты."
  },
  alexei: {
    name: "Алексей Михайлович",
    years: "1645–1676",
    life: "1629–1676",
    spouse: "Мария Милославская; Наталья Нарышкина",
    children: "16 детей, среди них Фёдор III, Иван V, Софья Алексеевна и Пётр I",
    before: "Михаил Фёдорович",
    after: "Фёдор III Алексеевич",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alexis%20I%20of%20Russia%20%281670-1680s%2C%20GIM%29.jpg",
    text: "При нём было принято Соборное уложение 1649 года, усилилось крепостное право и произошёл церковный раскол."
  },
  fedor: {
    name: "Фёдор III Алексеевич",
    years: "1676–1682",
    life: "1661–1682",
    spouse: "Агафья Грушецкая; Марфа Апраксина",
    children: "Один сын, Илья, умер в младенчестве",
    before: "Алексей Михайлович",
    after: "Иван V и Пётр I",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Feodor%20III%20-%20parsuna%20near%201680.jpg",
    text: "Его правление было коротким, но важным: была отменена система местничества, мешавшая продвижению людей по службе."
  },
  peter1: {
    name: "Пётр I Великий",
    years: "1682–1725",
    life: "1672–1725",
    spouse: "Евдокия Лопухина; Екатерина I",
    children: "Среди детей — Алексей Петрович, Анна Петровна и Елизавета Петровна",
    before: "Фёдор III; в начале правления соправителем был Иван V",
    after: "Екатерина I",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Peter%20der-Grosse%201838.jpg",
    text: "Пётр I провёл крупные реформы армии, флота, государственного управления и культуры. В 1721 году Россия стала империей."
  },
  catherine1: {
    name: "Екатерина I",
    years: "1725–1727",
    life: "1684–1727",
    spouse: "Пётр I",
    children: "Анна Петровна и Елизавета Петровна; другие дети умерли в раннем возрасте",
    before: "Пётр I",
    after: "Пётр II",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Catherine%20I%20of%20Russia%20by%20Nattier.jpg",
    text: "После смерти Петра I стала первой женщиной, правившей Российской империей как императрица. При ней был создан Верховный тайный совет."
  },
  peter2: {
    name: "Пётр II",
    years: "1727–1730",
    life: "1715–1730",
    spouse: "Не был женат",
    children: "Детей не было",
    before: "Екатерина I",
    after: "Анна Иоанновна",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Portrait%20of%20Emperor%20Peter%20II%20Alexeyevich%20-%20Google%20Cultural%20Institute.jpg",
    text: "Внук Петра I. Правил недолго, и большую роль при дворе играли представители знатных семей."
  },
  anna: {
    name: "Анна Иоанновна",
    years: "1730–1740",
    life: "1693–1740",
    spouse: "Фридрих Вильгельм, герцог Курляндский",
    children: "Детей не было",
    before: "Пётр II",
    after: "Иван VI",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Louis%20Caravaque%2C%20Portrait%20of%20Empress%20Anna%20Ioannovna%20%281730%29.jpg",
    text: "Была приглашена на престол после смерти Петра II. Её правление часто связывают с усилением придворных группировок и бюрократии."
  },
  elizabeth: {
    name: "Елизавета Петровна",
    years: "1741–1762",
    life: "1709–1762",
    spouse: "Официального брака не было",
    children: "Официальных детей не было",
    before: "Иван VI",
    after: "Пётр III",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Elisabeth%20Petrovna%20by%20Heinrich%20Buchholz.jpeg",
    text: "Дочь Петра I и Екатерины I. При ней был основан Московский университет, развивались культура, искусство и дворцовая архитектура."
  },
  catherine2: {
    name: "Екатерина II Великая",
    years: "1762–1796",
    life: "1729–1796",
    spouse: "Пётр III",
    children: "Официально — Павел Петрович",
    before: "Пётр III",
    after: "Павел I",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Catherine%20II%20after%20Roslin%2C%20Rokotov%20%281780s%2C%20Kunsthistorisches%20Museum%29.jpg",
    text: "Её правление связано с расширением территории империи, присоединением Крыма, разделами Речи Посполитой и политикой просвещённого абсолютизма."
  },
  paul1: {
    name: "Павел I",
    years: "1796–1801",
    life: "1754–1801",
    spouse: "Наталья Алексеевна; Мария Фёдоровна",
    children: "10 детей, среди них Александр I и Николай I",
    before: "Екатерина II",
    after: "Александр I",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Borovikovsky%20Pavel%20IFXD.jpg",
    text: "Павел I стремился укрепить дисциплину в армии и управлении. В 1797 году издал манифест о трёхдневной барщине."
  },
  alexander1: {
    name: "Александр I",
    years: "1801–1825",
    life: "1777–1825",
    spouse: "Елизавета Алексеевна",
    children: "Две дочери умерли в детстве; наследника не осталось",
    before: "Павел I",
    after: "Николай I",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alexander%20I%20by%20Stepan%20Shchukin.jpg",
    text: "Его правление связано с Отечественной войной 1812 года, победой над Наполеоном и участием России в европейской политике после войны."
  },
  nicholas1: {
    name: "Николай I",
    years: "1825–1855",
    life: "1796–1855",
    spouse: "Александра Фёдоровна",
    children: "7 детей, среди них Александр II",
    before: "Александр I",
    after: "Александр II",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Botman%20-%20Emperor%20Nicholas%20I%20%28cropped%29.jpg",
    text: "При нём усилился контроль государства над обществом, была проведена кодификация законов и развивалась железнодорожная сеть."
  },
  alexander2: {
    name: "Александр II Освободитель",
    years: "1855–1881",
    life: "1818–1881",
    spouse: "Мария Александровна; Екатерина Долгорукова",
    children: "Среди детей — Александр III; также были дети от второго брака",
    before: "Николай I",
    after: "Александр III",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alexander%20II%20of%20Russia%20photo.jpg",
    text: "Главное событие его правления — отмена крепостного права в 1861 году. Также были проведены судебная, земская, городская и военная реформы."
  },
  alexander3: {
    name: "Александр III",
    years: "1881–1894",
    life: "1845–1894",
    spouse: "Мария Фёдоровна",
    children: "6 детей, среди них Николай II",
    before: "Александр II",
    after: "Николай II",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tsar%20Alexander%20III%20of%20Russia%202.jpg",
    text: "Проводил консервативную политику и укреплял самодержавие. Его часто называют Миротворцем, потому что Россия при нём не вела крупных войн."
  },
  nicholas2: {
    name: "Николай II",
    years: "1894–1917",
    life: "1868–1918",
    spouse: "Александра Фёдоровна",
    children: "Ольга, Татьяна, Мария, Анастасия и Алексей",
    before: "Александр III",
    after: "Монархия прекратилась после Февральской революции 1917 года",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mikola%20II%20%28cropped%29-2.jpg",
    text: "Последний российский император. Его правление завершилось отречением в 1917 году на фоне Первой мировой войны и революционного кризиса."
  }
};

const rulerModal = document.querySelector("#rulerModal");
const modalImage = document.querySelector("#modalImage");
const modalYears = document.querySelector("#modalYears");
const modalTitle = document.querySelector("#modalTitle");
const modalLife = document.querySelector("#modalLife");
const modalSpouse = document.querySelector("#modalSpouse");
const modalChildren = document.querySelector("#modalChildren");
const modalBefore = document.querySelector("#modalBefore");
const modalAfter = document.querySelector("#modalAfter");
const modalText = document.querySelector("#modalText");

function openRulerModal(key) {
  const info = rulerInfo[key];

  if (!info || !rulerModal) {
    return;
  }

  modalImage.onerror = () => {
    modalImage.src = fallbackImage;
  };

  modalImage.src = info.image;
  modalImage.alt = `Портрет: ${info.name}`;
  modalYears.textContent = info.years;
  modalTitle.textContent = info.name;
  modalLife.textContent = info.life;
  modalSpouse.textContent = info.spouse;
  modalChildren.textContent = info.children;
  modalBefore.textContent = info.before;
  modalAfter.textContent = info.after;
  modalText.textContent = info.text;

  rulerModal.classList.add("is-open");
  rulerModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeRulerModal() {
  if (!rulerModal) {
    return;
  }

  rulerModal.classList.remove("is-open");
  rulerModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-ruler]").forEach((card) => {
  card.addEventListener("click", () => {
    openRulerModal(card.dataset.ruler);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openRulerModal(card.dataset.ruler);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeRulerModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRulerModal();
  }
});