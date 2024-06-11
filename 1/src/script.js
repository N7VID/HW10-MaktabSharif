// Add some data for Tabs component
const recent = [
  {
    title: "Does drinking coffee make you smarter?",
    createTime: "5h ago",
    comments: "5",
    shares: "2",
  },
  {
    title: "So you've bought coffee... now what?",
    createTime: "2h ago",
    comments: "3",
    shares: "2",
  },
];
const popular = [
  {
    title: "Is tech making coffee better or worse?",
    createTime: "Jan 7",
    comments: "29",
    shares: "16",
  },
  {
    title: "The most innovative things happening in coffee",
    createTime: "Mar 19",
    comments: "24",
    shares: "12",
  },
];
const trending = [
  {
    title: "Ask Me Anything: 10 answers to your questions about coffee",
    createTime: "2d ago",
    comments: "9",
    shares: "5",
  },
  {
    title: "The worst advice we've ever heard about coffee",
    createTime: "4d ago",
    comments: "1",
    shares: "2",
  },
];
// Select some needed elements for List Box component
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".option-container");
const options = document.querySelectorAll(".option");
// Select some needed elements for Switch component
const switchBtn = document.getElementById("Switch");
const switchCir = document.getElementById("circle");
// Select some needed elements for Tabs component
const buttons = document.getElementById("btns");
const postContainer = document.getElementById("posts");
const recentBtn = document.getElementById("Recent");
const popularBtn = document.getElementById("Popular");
const trendingBtn = document.getElementById("Trending");
// Select some needed elements for Disclosure component
const answerOne = document.getElementById("ans-1");
const answerTwo = document.getElementById("ans-2");

// List Box component
// Show the list of options in List Box component
selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});
// Change innerHtml when one of options clicked in List Box component
options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = option.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

// Switch component
switchBtn.addEventListener("click", () => {
  switchCir.classList.toggle("translate-x-11");
});

// Tabs component
function renderData(data) {
  postContainer.innerText = "";
  data.forEach((item) => {
    const divCon = document.createElement("div");
    divCon.className =
      "hover:bg-[#4b5666] cursor-pointer rounded-md p-3 transition";
    const paragraph = document.createElement("p");
    paragraph.className = "font-semibold";
    paragraph.innerText = item.title;
    const divBtn = document.createElement("div");
    divBtn.className = "flex gap-8 text-gray-300";
    const divCreateTime = document.createElement("div");
    divCreateTime.innerText = item.createTime;
    const divComments = document.createElement("div");
    divComments.innerText = item.comments + " Comments";
    const divShares = document.createElement("div");
    divShares.innerText = item.shares + " Shares";

    divBtn.appendChild(divCreateTime);
    divBtn.appendChild(divComments);
    divBtn.appendChild(divShares);

    divCon.appendChild(paragraph);
    divCon.appendChild(divBtn);

    postContainer.appendChild(divCon);
  });
}

recentBtn.addEventListener("click", () => {
  renderData(recent);
  popularBtn.classList.remove("active");
  trendingBtn.classList.remove("active");
  recentBtn.classList.add("active");
  recentBtn.classList.remove("hover:bg-slate-300");
  trendingBtn.classList.add("hover:bg-slate-300");
  popularBtn.classList.add("hover:bg-slate-300");
});

popularBtn.addEventListener("click", () => {
  renderData(popular);
  recentBtn.classList.add("hover:bg-slate-300");
  trendingBtn.classList.add("hover:bg-slate-300");
  popularBtn.classList.remove("hover:bg-slate-300");
  popularBtn.classList.add("active");
  trendingBtn.classList.remove("active");
  recentBtn.classList.remove("active");
});

trendingBtn.addEventListener("click", () => {
  renderData(trending);
  popularBtn.classList.remove("active");
  trendingBtn.classList.add("active");
  recentBtn.classList.remove("active");
  recentBtn.classList.add("hover:bg-slate-300");
  trendingBtn.classList.remove("hover:bg-slate-300");
  popularBtn.classList.add("hover:bg-slate-300");
});

renderData(recent);

// Disclosure component
function showResult(answerDiv, arrowDown, arrowUp) {
  answerDiv.classList.toggle("hidden");
  document.getElementById(arrowDown).classList.toggle("hidden");
  document.getElementById(arrowUp).classList.toggle("hidden");
}
