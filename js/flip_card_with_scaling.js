/*

*/

// hold all content in the 3D array
const circlesContent = [
  // label, reveal text, xpos, ypos, feedback colours
  [
    "First Peoples",
    "This is an appropriate/acceptable term. It is a term that is gaining prominence. It is used to describe the original inhabitants of Australia before colonisation.  It recognises that Aboriginal and Torres Strait Islanders are the first peoples of Australia.",
    16,
    27,
    1,
  ],
  [
    "Aboriginal",
    "This is an acceptable term relating to the First Nations peoples of Australia.",
    34.7,
    32.4,
    1,
  ],
  [
    "Native",
    "The term native can be ambiguous and is derogatory.  It is often linked to colonialism and the dehumanisation of First Nation people. It reinforces the stereotype of First Nation Peoples are uncivilised and primitive.It is best to use a more respectful term.",
    58,
    14.2,
    2,
  ],
  [
    "First Nations",
    "This is an appropriate/acceptable term. It is a term that is gaining prominence. This is a term is used to describe the original inhabitants of Australia before colonisation",
    82.1,
    28.2,
    1,
  ],
  [
    "Black Fella",
    "Aboriginal and Torres Strait Islanders often use this word amongst themselves.  Non-First Nation peoples should not use this term.",
    24.2,
    62.8,
    1,
  ],
  [
    "Bruz/Sis",
    "Aboriginal and Torres Strait Islanders often use these words amongst themselves.  Non-First Nation peoples should not use these terms unless they have a conversation with the First Nation person involved.",
    50,
    52,
    2,
  ],
  [
    "ATSI",
    "This is an abbreviation of Aboriginal and Torres Strait Islander.  Do not abbreviate or use the acronym as it can cause offense.",
    70,
    58,
    2,
  ],
  [
    "Indigenous",
    "This term is outdated and not always the preferred or most respectful term.  The dictionary definition is native, an inappropriate and offensive term. It is not specific to our Aboriginal and Torres Strait Islanders as there are other Indigenous people in the world.",
    41.3,
    77.8,
    2,
  ],
  [
    "Aborigine",
    "Although it is grammatically correct, the term Aborigine has a negative connotations and should be avoided.  Remembering the Aborigines Act of 1905 inflicted injustices and detrimental impact upon Aboriginal and Torres Strait Islanders.",
    83,
    74,
    2,
  ],
];

const container = document.getElementById("circle-container");
const circleStates = new Map(); // Track the 'state' of each wrapper
const intervals = new Map(); // Track dot intervals

// --- Create nav buttons once ---
const navBtns = document.createElement("div");
navBtns.className = "nav_btns";

// Back button
const backBtn = document.createElement("button");
backBtn.id = "back_btn";

const backSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
backSvg.setAttribute("data-name", "Layer 2");
backSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
backSvg.setAttribute("viewBox", "0 0 49.31 49.31");

const backG1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
backG1.setAttribute("id", "navigation");

const backG2 = document.createElementNS("http://www.w3.org/2000/svg", "g");

const backCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
backCircle.classList.add("cls-2");
backCircle.setAttribute("cx", "24.65");
backCircle.setAttribute("cy", "24.65");
backCircle.setAttribute("r", "24.65");

const backPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
backPath.classList.add("arrow_path");
backPath.setAttribute(
  "d",
  "M19.67,24.49l12.15,12.94h-6.44s-12.06-12.94-12.06-12.94l12.15-12.94h6.35s-12.15,12.94-12.15,12.94Z"
);

backG2.appendChild(backCircle);
backG2.appendChild(backPath);
backG1.appendChild(backG2);
backSvg.appendChild(backG1);
backBtn.appendChild(backSvg);


// Forward button
const fwrdBtn = document.createElement("button");
fwrdBtn.id = "fwrd_btn";

const fwrdSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
fwrdSvg.setAttribute("data-name", "Layer 2");
fwrdSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
fwrdSvg.setAttribute("viewBox", "0 0 49.31 49.31");

const fwrdG1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
fwrdG1.setAttribute("id", "navigation");

const fwrdG2 = document.createElementNS("http://www.w3.org/2000/svg", "g");

const fwrdCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
fwrdCircle.classList.add("cls-2");
fwrdCircle.setAttribute("cx", "24.65");
fwrdCircle.setAttribute("cy", "24.65");
fwrdCircle.setAttribute("r", "24.65");

const fwrdPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
fwrdPath.classList.add("arrow_path");
fwrdPath.setAttribute(
  "d",
  "M17.49,11.56h6.35l12.15,12.94-12.06,12.94h-6.44l12.15-12.94-12.15-12.94Z"
);

fwrdG2.appendChild(fwrdCircle);
fwrdG2.appendChild(fwrdPath);
fwrdG1.appendChild(fwrdG2);
fwrdSvg.appendChild(fwrdG1);
fwrdBtn.appendChild(fwrdSvg);

// Add buttons to nav
navBtns.appendChild(backBtn);
navBtns.appendChild(fwrdBtn);

// Insert nav buttons at the top of container
container.prepend(navBtns);

function createCircle(index, [label, description, x, y, feedbackcolours]) {
  /*set up circles*/
  const wrapper =
    document.createElement(
      "div"
    ); /*create circle wrappers and their positioning*/
  wrapper.className = `circle-wrapper circle-wrapper-${index}`;
  // wrapper.className = ;
  wrapper.style.left = `${x}%`;
  wrapper.style.top = `${y}%`;

  const flipper =
    document.createElement(
      "div"
    ); /*create the container element that soes the rotating after scaling up*/
  flipper.className = "flipper";

  const front =
    document.createElement("div"); /*create the circle front and its label*/
  front.className = "circle front";
  const labelDiv = document.createElement("div");
  labelDiv.className = "circle-label";
  labelDiv.textContent = label;
  const ellipsis = document.createElement("span");
  ellipsis.className = "ellipsis";
  front.appendChild(labelDiv);
  front.appendChild(ellipsis);

  const back =
    document.createElement(
      "div"
    ); /*create the circle back class and description text*/
  back.className = "circle back";
  back.textContent = description;
  back.style.borderColor = `var(--outline-${feedbackcolours})`; /*make the styling of the feedback dynamic*/
  back.style.backgroundColor = `var(--bgcolor-${feedbackcolours})`; /*make the styling of the feedback dynamic*/

  flipper.appendChild(front); /*add the elements to the page*/
  flipper.appendChild(back);
  wrapper.appendChild(flipper);
  container.appendChild(wrapper);

  circleStates.set(
    wrapper,
    "ready"
  ); /*set the initial stare of the circle wrappers*/

  wrapper.addEventListener("click", () => {
    /*click functionality of the circles in different states*/
    const currentState = circleStates.get(wrapper);

    if (currentState === "expanded") {
      /*when state is 'expanded', rotate and set state to 'revealed'*/
      // Rotate to revealed
      flipper.style.transform = "rotateY(180deg)";
      clearInterval(intervals.get(wrapper));
      circleStates.set(wrapper, "revealed");
      return;
    }

    if (currentState === "revealed") {
      /*if state is 'revealed', collapse it*/
      collapseCircle(wrapper);
      return;
    }

    // In all other cases, including collapsing or ready — expand this one and collapse all others
    resetAllCirclesExcept(wrapper);
    expandCircle(wrapper);
  });

  animatePulse(
    wrapper
  ); /*call the pulsing of the wrapper (when it's not expanded*/
}

function expandCircle(wrapper) {
  /*expand wrapper function*/
  const flipper = wrapper.querySelector(".flipper");
  const ellipsis = wrapper.querySelector(".ellipsis");

  wrapper.style.transform = "translate(-50%, -50%) scale(2.5)";
  flipper.style.transform = "rotateY(0deg)";
  ellipsis.textContent = ".";
  let dotCount = 1;
  const interval = setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    ellipsis.textContent = ".".repeat(dotCount);
  }, 500);

  intervals.set(wrapper, interval);
  circleStates.set(wrapper, "expanded");
}

function collapseCircle(wrapper) {
  /*collpapse wrapper function*/
  const flipper = wrapper.querySelector(".flipper");
  const ellipsis = wrapper.querySelector(".ellipsis");

  wrapper.style.transform = "translate(-50%, -50%) scale(1)";
  flipper.style.transform = "rotateY(0deg)";
  ellipsis.textContent = "";
  clearInterval(intervals.get(wrapper));
  circleStates.set(wrapper, "ready");
}

function resetAllCirclesExcept(targetWrapper) {
  /*reseat all wrappers funciton (happens when a circle is clicked to expand)*/
  for (const [wrapper, state] of circleStates.entries()) {
    if (wrapper !== targetWrapper) {
      collapseCircle(wrapper);
    }
  }
}

function animatePulse(wrapper) {
  /*arapper pulse animaiton function*/
  let scale = 1;
  let direction = 1;
  let pulseSpeed = 0.0008;

  function pulse() {
    if (circleStates.get(wrapper) === "ready") {
      //scale += 0.002 * direction;
      scale += pulseSpeed * direction;
      //if (scale >= 1.05) direction = -1;
      //if (scale <= 0.95) direction = 1;
      if (scale >= 1.1) direction = -1;
      if (scale <= 0.9) direction = 1;
      wrapper.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(
        3
      )})`;
    }
    requestAnimationFrame(pulse);
  }

  setTimeout(pulse, Math.random() * 900); /*desync the pulse animations*/
}

circlesContent.forEach((circle, i) =>
  createCircle(i, circle)
); /*create the circles on the page*/
