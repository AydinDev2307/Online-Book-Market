const name = document.getElementById('name');
const img = document.getElementById('img');
const price = document.getElementById('price');
const count = document.getElementById('count');
const discount = document.getElementById('discount');
const discountSum = document.getElementById('discountSum');
const add = document.getElementById('add');
const bookBox = document.getElementById('bookBox');
const isSale = document.getElementById('isSale');
const filtrSelect = document.getElementById('filtr');

let cards = JSON.parse(localStorage.getItem('books')) || [];
let updateId = null;

// Checkbox boshqaruvi
discount.addEventListener('change', () => {
  if (discount.checked) {
    isSale.style.display = 'flex';
    discountSum.removeAttribute('disabled');
    discountSum.focus();
  } else {
    isSale.style.display = 'none';
    discountSum.value = '';
    discountSum.setAttribute('disabled', true);
  }
});

// Local storage saqlash
function saveToLocal() {
  localStorage.setItem('books', JSON.stringify(cards));
}

// Formani tozalash
function clearForm() {
  name.value = '';
  img.value = '';
  price.value = '';
  count.value = '';
  discount.checked = false;
  discountSum.value = '';
  isSale.style.display = 'none';
  add.textContent = 'Qo‘shish';
  updateId = null;
}

// Mahsulotlarni chiqarish
function render() {
  bookBox.innerHTML = '';

  if (cards.length === 0) {
    bookBox.innerHTML = `<p class="text-center text-white italic mt-4">Hozircha hech qanday mahsulot yo‘q</p>`;
    return;
  }

  cards.forEach((card) => {
    const div = document.createElement('div');
    div.className =
      'w-[95%] h-[110px] bg-white/20 backdrop-blur-sm flex items-center justify-around rounded-[14px] mb-[10px] text-white font-[500] hover:bg-white/30 transition-all duration-300';

    // chegirma narxini hisoblash
    const discountedPrice = card.discount
      ? card.price - (card.price * card.discountSum) / 100
      : card.price;

    div.innerHTML = `
      <img src="${card.img}" alt="${
      card.name
    }" class="w-[110px] h-[110px] object-cover rounded-[14px] border border-white shadow-md">
      
      <h2 class="w-[140px] text-center text-[18px]">${card.name}</h2>
      
      <div class="w-[150px] text-center">
        ${
          card.discount
            ? `
              <p class="line-through text-gray-300">${card.price.toLocaleString()} so'm</p>
              <p class="text-green-300 font-semibold">${discountedPrice.toLocaleString()} so'm</p>
            `
            : `<p class="text-[16px]">${card.price.toLocaleString()} so'm</p>`
        }
      </div>

      <p class="w-[80px] text-center text-[16px]">${card.count}</p>

      ${
        card.discount
          ? `<p class="w-[100px] text-center text-green-300 text-[16px]">${card.discountSum}%</p>`
          : `<p class="w-[100px] text-center text-gray-300 text-[16px]">Yo‘q</p>`
      }

      <div class="flex gap-2 w-[200px] justify-center">
        <button onclick="editCard(${
          card.id
        })" class="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm">Tahrirlash</button>
        <button onclick="deleteCard(${
          card.id
        })" class="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm">O‘chirish</button>
      </div>
    `;

    bookBox.appendChild(div);
  });
}

// Yangi mahsulot qo‘shish
add.addEventListener('click', () => {
  if (updateId) {
    updateCard();
    return;
  }

  if (
    name.value.trim() === '' ||
    img.value.trim() === '' ||
    price.value.trim() === '' ||
    count.value.trim() === ''
  ) {
    alert('Iltimos, barcha maydonlarni to‘ldiring!');
    return;
  }

  if (discount.checked && discountSum.value.trim() === '') {
    alert('Chegirma tanlangan, ammo qiymat kiritilmagan!');
    return;
  }

  const newProduct = {
    id: Date.now(),
    name: name.value.trim(),
    img: img.value.trim(),
    price: Number(price.value),
    count: Number(count.value),
    discount: discount.checked,
    discountSum: discount.checked ? Number(discountSum.value) : 0,
  };

  cards.push(newProduct);
  saveToLocal();
  render();
  clearForm();
});

// O‘chirish funksiyasi
function deleteCard(id) {
  cards = cards.filter((card) => card.id !== id);
  saveToLocal();
  render();
}

// Tahrirlash funksiyasi
function editCard(id) {
  const card = cards.find((c) => c.id === id);
  if (!card) return;

  name.value = card.name;
  img.value = card.img;
  price.value = card.price;
  count.value = card.count;
  discount.checked = card.discount;

  if (card.discount) {
    isSale.style.display = 'flex';
    discountSum.value = card.discountSum;
  } else {
    isSale.style.display = 'none';
  }

  updateId = id;
  add.textContent = 'Yangilash';
}

// Yangilash funksiyasi
function updateCard() {
  const index = cards.findIndex((c) => c.id === updateId);
  if (index === -1) return;

  cards[index] = {
    ...cards[index],
    name: name.value.trim(),
    img: img.value.trim(),
    price: Number(price.value),
    count: Number(count.value),
    discount: discount.checked,
    discountSum: discount.checked ? Number(discountSum.value) : 0,
  };

  saveToLocal();
  render();
  clearForm();
}

// Sahifa yuklanganda render qilish
render();

// LocalStorage'dan ma'lumotni olish
let books = JSON.parse(localStorage.getItem('books')) || [];

// Saqlash funksiyasi
function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Kitoblarni chiqarish funksiyasi
function renderBooks() {
  bookBox.innerHTML = ''; // Avval tozalaymiz

  books.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.className =
      'w-[96%] flex items-center justify-between bg-white rounded-[15px] shadow-md p-[10px] mb-[15px]';

    // Rasm
    const img = document.createElement('img');
    img.src = book.img;
    img.alt = book.name;
    img.className = 'w-[140px] h-[140px] object-cover rounded-[10px]';

    // Ma’lumotlar
    const info = document.createElement('div');
    info.className = 'flex flex-col gap-[5px] w-[300px]';

    const name = document.createElement('h2');
    name.textContent = book.name;
    name.className = 'text-[22px] font-[600]';

    // Narx
    const priceBox = document.createElement('div');
    priceBox.className = 'flex items-center gap-[10px]';

    const price = document.createElement('p');
    price.textContent = `$${book.price}`;
    price.className = 'text-[18px] text-gray-700';

    if (book.discount && book.discount > 0) {
      price.classList.add('line-through', 'text-gray-400');
      const discountPrice = document.createElement('p');
      const discountedValue = book.price - (book.price * book.discount) / 100;
      discountPrice.textContent = `$${discountedValue.toFixed(2)}`;
      discountPrice.className = 'text-[18px] text-green-600 font-[600]';
      priceBox.append(price, discountPrice);
    } else {
      priceBox.append(price);
    }

    // Soni
    const count = document.createElement('p');
    count.textContent = `Soni: ${book.count}`;
    count.className = 'text-[16px] text-gray-600';

    info.append(name, priceBox, count);

    // Tugmalar
    const btnBox = document.createElement('div');
    btnBox.className = 'flex gap-[10px]';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Tahrirlash';
    editBtn.className =
      'bg-blue-500 hover:bg-blue-600 text-white px-[15px] py-[5px] rounded';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'O‘chirish';
    deleteBtn.className =
      'bg-red-500 hover:bg-red-600 text-white px-[15px] py-[5px] rounded';

    // O‘chirish tugmasi ishlashi
    deleteBtn.addEventListener('click', () => {
      books.splice(index, 1);
      saveBooks();
      renderBooks();
    });

    btnBox.append(editBtn, deleteBtn);
    bookCard.append(img, info, btnBox);
    bookBox.append(bookCard);
  });
}

// 🔹 Filtrni qo‘llash funksiyasi
function applyFilter() {
  const value = filtrSelect.value;

  if (value === 'az') {
    books.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === 'za') {
    books.sort((a, b) => b.name.localeCompare(a.name));
  } else if (value === 'price-high-low') {
    books.sort((a, b) => b.price - a.price);
  } else if (value === 'price-low-high') {
    books.sort((a, b) => a.price - b.price);
  }

  // Tanlangan filtrni saqlaymiz
  localStorage.setItem('selectedFilter', value);

  renderBooks();
}

// Filtr o‘zgarganda ishlaydi
filtrSelect.addEventListener('change', applyFilter);

// Sahifa yangilanganda oxirgi filtrni tiklash
window.addEventListener('load', () => {
  const savedFilter = localStorage.getItem('selectedFilter');
  if (savedFilter) {
    filtrSelect.value = savedFilter;
    applyFilter(); // shu filtr bo‘yicha chiqaradi
  } else {
    renderBooks(); // filtr tanlanmagan bo‘lsa oddiy chiqaradi
  }
});
