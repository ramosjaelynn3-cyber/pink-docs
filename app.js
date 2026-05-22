let docs = JSON.parse(localStorage.getItem("pinkDocs")) || [];
let currentDocId = null;

const editor = document.getElementById("editor");
const titleInput = document.getElementById("titleInput");
const docList = document.getElementById("docList");
const wordCount = document.getElementById("wordCount");

function toggleFileMenu() {
    document.getElementById("fileDropdown").classList.toggle("hidden");
}

function saveDocs() {
    localStorage.setItem("pinkDocs", JSON.stringify(docs));
}

function manualSave() {
    updateDoc();
    saveDocs();
    alert("Saved ✨");
}

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

function deleteDoc() {
    docs = docs.filter(d => d.id !== currentDocId);

    if (!docs.length) {
        createDoc();
        return;
    }

    currentDocId = docs[0].id;
    saveDocs();
    renderDocs();
    loadDoc();
}

function loadDoc() {
    const doc = docs.find(d => d.id === currentDocId);
    if (!doc) return;

    titleInput.value = doc.title;
    editor.value = doc.content;
    updateWordCount();
}

function updateDoc() {
    const doc = docs.find(d => d.id === currentDocId);
    if (!doc) return;

    doc.title = titleInput.value;
    doc.content = editor.value;
}

function renderDocs() {
    docList.innerHTML = "";

    docs.forEach(doc => {
        const div = document.createElement("div");
        div.className = "doc-item";

        div.innerHTML = `<b>${doc.title}</b>`;

        div.onclick = () => {
            currentDocId = doc.id;
            loadDoc();
        };

        docList.appendChild(div);
    });
}

function updateWordCount() {
    const words = editor.value.trim().split(/\s+/).filter(Boolean).length;
    wordCount.textContent = words;
}

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
let history = [];
let redoStack = [];

/* SAVE STATE FOR UNDO */
function pushState() {
    history.push(editor.value);
    if (history.length > 50) history.shift();
    redoStack = [];
}

/* UNDO / REDO */
function undo() {
    if (!history.length) return;
    redoStack.push(editor.value);
    editor.value = history.pop();
    updateDoc();
    updateWordCount();
}

function redo() {
    if (!redoStack.length) return;
    history.push(editor.value);
    editor.value = redoStack.pop();
    updateDoc();
    updateWordCount();
}

/* TEXT STYLE SIMULATION (textarea limitation workaround) */
function toggleItalic() {
    editor.style.fontStyle =
        editor.style.fontStyle === "italic" ? "normal" : "italic";
}

function toggleUnderline() {
    editor.style.textDecoration =
        editor.style.textDecoration === "underline" ? "none" : "underline";
}

function alignText(dir) {
    editor.style.textAlign = dir;
}

/* track changes for undo */
editor.addEventListener("input", () => {
    pushState();
    updateDoc();
    saveDocs();
    updateWordCount();
});
