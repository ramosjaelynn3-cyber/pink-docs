let docs = JSON.parse(localStorage.getItem("pinkDocs")) || [];
let currentDocId = null;

const editor = document.getElementById("editor");
const titleInput = document.getElementById("titleInput");
const docList = document.getElementById("docList");
const wordCount = document.getElementById("wordCount");

/* FILE MENU */
function toggleFileMenu() {
    document.getElementById("fileDropdown").classList.toggle("hidden");
}

/* SAVE */
function saveDocs() {
    localStorage.setItem("pinkDocs", JSON.stringify(docs));
}

function manualSave() {
    updateDoc();
    saveDocs();
    alert("Saved ✨");
}

/* CREATE */
function createDoc() {
    const doc = {
        id: Date.now(),
        title: "Untitled",
        content: ""
    };

    docs.unshift(doc);
    currentDocId = doc.id;

    saveDocs();
    renderDocs();
    loadDoc();
}

/* DELETE */
function deleteDoc() {
    docs = docs.filter(d => d.id !== currentDocId);

    if (docs.length === 0) {
        createDoc();
        return;
    }

    currentDocId = docs[0].id;
    saveDocs();
    renderDocs();
    loadDoc();
}

/* LOAD */
function loadDoc() {
    const doc = docs.find(d => d.id === currentDocId);
    if (!doc) return;

    titleInput.value = doc.title;
    editor.value = doc.content;
    updateWordCount();
}

/* UPDATE */
function updateDoc() {
    const doc = docs.find(d => d.id === currentDocId);
    if (!doc) return;

    doc.title = titleInput.value;
    doc.content = editor.value;
}

/* RENDER */
function renderDocs() {
    docList.innerHTML = "";

    docs.forEach(doc => {
        const div = document.createElement("div");
        div.className = "doc-item";

        div.innerHTML = `
            <b>${doc.title}</b>
            <div style="font-size:12px;opacity:0.6">
                ${doc.content.slice(0,40)}
            </div>
        `;

        div.onclick = () => {
            currentDocId = doc.id;
            loadDoc();
        };

        docList.appendChild(div);
    });
}

/* WORD COUNT */
function updateWordCount() {
    const words = editor.value.trim().split(/\s+/).filter(Boolean).length;
    wordCount.textContent = words;
}

/* PDF */
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text(titleInput.value || "document", 10, 10);

    pdf.setFontSize(12);
    pdf.text(pdf.splitTextToSize(editor.value, 180), 10, 20);

    pdf.save((titleInput.value || "document") + ".pdf");
}

/* STYLE */
function changeFont(font) {
    const map = {
        Cute: "Nunito",
        Y2K: "Quicksand",
        Typewriter: "Courier New",
        Diary: "Georgia",
        Elegant: "Playfair Display",
        Cyber: "Space Grotesk",
        Handwritten: "Caveat",
        "Retro Terminal": "VT323"
    };

    document.documentElement.style.setProperty("--font", map[font]);
}

function changeSize(size) {
    document.documentElement.style.setProperty("--size", size);
}

function toggleBold() {
    const current = getComputedStyle(document.documentElement)
        .getPropertyValue("--weight").trim();

    document.documentElement.style.setProperty(
        "--weight",
        current === "bold" ? "normal" : "bold"
    );
}

/* EVENTS */
editor.addEventListener("input", () => {
    updateDoc();
    saveDocs();
    updateWordCount();
});

titleInput.addEventListener("input", () => {
    updateDoc();
    saveDocs();
});

/* INIT */
if (!docs.length) {
    createDoc();
} else {
    currentDocId = docs[0].id;
    renderDocs();
    loadDoc();
}
