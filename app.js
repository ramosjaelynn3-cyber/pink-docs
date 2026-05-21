// ---------- EDITOR ----------
const quill = new Quill('#editor', {
  theme: 'snow'
});

// ---------- CHARACTER DATA ----------
const characters = {
  luna: {
    name: "🌙 Luna",
    info: "A soft moon goddess character.",
    fanart: ["https://placekitten.com/200/200"]
  },
  mika: {
    name: "💗 Mika",
    info: "A cheerful pink magical girl.",
    fanart: ["https://placekitten.com/201/201"]
  }
};

// ---------- POPUP ----------
function openCard(charId) {
  const char = characters[charId];

  document.getElementById("charName").innerText = char.name;
  document.getElementById("charInfo").innerText = char.info;

  const fanartDiv = document.getElementById("fanart");
  fanartDiv.innerHTML = "";

  char.fanart.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.style.width = "100px";
    image.style.margin = "5px";
    fanartDiv.appendChild(image);
  });

  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// ---------- LOGIN PLACEHOLDER ----------
function login() {
  alert("We will connect Supabase login next!");
}
