let editor = document.getElementById("editor");
let title = document.getElementById("title");

/* FILE MENU */
function toggleMenu() {
    document.getElementById("menuDrop").classList.toggle("hidden");
}

/* DOC STORAGE */
function saveDoc() {
    localStorage.setItem("lessyDoc", JSON.stringify({
        title: title.value,
        content: editor.innerHTML
    }));
}

function loadDoc() {
    let data = JSON.parse(localStorage.getItem("lessyDoc"));
    if (!data) return;

    title.value = data.title;
    editor.innerHTML = data.content;
}

/* NEW DOC */
function createDoc() {
    editor.innerHTML = "";
    title.value = "Untitled";
    saveDoc();
}

/* DELETE */
function deleteDoc() {
    localStorage.removeItem("lessyDoc");
    editor.innerHTML = "";
    title.value = "";
}

/* FORMATTING COMMANDS */
function cmd(command) {
    document.execCommand(command);
}

/* ALIGN */
function align(type) {
    document.execCommand("justify" + type);
}

/* HIGHLIGHT */
function highlight() {
    document.execCommand("hiliteColor", false, "#ffb6d9");
}

/* FONT */
function changeFont(font) {
    document.execCommand("fontName", false, font);
}

/* PDF */
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(14);
    pdf.text(title.value || "document", 10, 10);

    pdf.setFontSize(11);
    pdf.text(editor.innerText, 10, 20);

    pdf.save((title.value || "document") + ".pdf");
}

/* AUTO SAVE */
editor.addEventListener("input", saveDoc);
title.addEventListener("input", saveDoc);

/* INIT */
loadDoc();
