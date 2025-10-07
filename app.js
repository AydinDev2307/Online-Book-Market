const form = document.getElementById('bookForm');
const nameInput = document.getElementById('name');
const imgInput = document.getElementById('img');
const narxInput = document.getElementById('narx');
const soniInput = document.getElementById('soni');
const tableBody = document.getElementById('bookTable');
const emptyRow = document.getElementById('emptyRow');
let books = [];
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});
function addBook() {
  const newBook = {
    id: Date.now(),
    name: nameInput.value.trim(),
    img: imgInput.value.trim(),
    narx: narxInput.value.trim(),
    soni: soniInput.value.trim(),
  };

  books.push(newBook);
  renderBooks();
  form.reset();
}
function renderBooks() {
  if (books.length === 0) {
    tableBody.innerHTML = `
            <tr id="emptyRow">
              <td colspan="6" class="py-6 text-gray-500">
                Hozircha kitob yoʻq — forma orqali qoʻshing.
              </td>
            </tr>`;
    return;
  }
  tableBody.innerHTML = books
    .map((book, index) => {
      return `
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="py-2">${index + 1}</td>
              <td class="py-2 flex justify-center">
                <img src="${book.img}" alt="${
        book.name
      }" class="w-[50px] h-[60px] object-cover rounded" />
              </td>
              <td class="py-2 font-semibold">${book.name}</td>
              <td class="py-2">${Number(book.narx).toLocaleString()} so‘m</td>
              <td class="py-2">${book.soni}</td>
              <td class="py-2 flex justify-center gap-3">
                <button onclick="deleteBook(${
                  book.id
                })" class="text-red-500 hover:text-red-700">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>`;
    })
    .join('');
}
function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  renderBooks();
}
