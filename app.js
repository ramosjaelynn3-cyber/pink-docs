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
function openCard(id) {
  const char = characters[id];

  document.getElementById("charName").innerText = char.name;
  document.getElementById("charInfo").innerText = char.info;

  const fanartDiv = document.getElementById("fanart");
  fanartDiv.innerHTML = "";

  char.fanart.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.style.width = "110px";
    image.style.borderRadius = "12px";
    image.style.margin = "6px";
    image.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
    fanartDiv.appendChild(image);
  });

  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
}

// ---------- LOGIN----------
const supabase = supabase.createClient(
  "https://hnvaddvdhmoigjosutnq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudmFkZHZkaG1vaWdqb3N1dG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNTczMTgsImV4cCI6MjA5NDkzMzMxOH0.kUk7dU4aAMXA7Mxizx6ak6IrJ04q4eVsufiBYNjGp6A"
);

async function login() {
  const email = prompt("Email:");
  const password = prompt("Password:");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) alert(error.message);
  else alert("Logged in!");
}
