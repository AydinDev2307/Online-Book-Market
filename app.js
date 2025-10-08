const name = document.getElementById('name');
const img = document.getElementById('img');
const price = document.getElementById('price');
const count = document.getElementById('count');
const discount = document.getElementById('discount');
const discountSum = document.getElementById('discountSum');
const add = document.getElementById('add');
const bookBox = document.getElementById('bookBox');
const form = document.getElementById('form');
const isSale = document.getElementById('isSale');
let cards = [];
let updateId = null;
// window.addEventListener('DOMContentLoaded', () => {
//   // loadProdact();
//   renderProdacts();
// });
add.addEventListener('click', () => {
  if (name.value.trim() === '') {
    name.className =
      'border-2 border-red-500 w-[80%] h-[50px] rounded-[14px] pl-[20px] text-[20px]';
    name.setAttribute('placeholder', 'Nom kiritng!');
    return;
  }
});
add.addEventListener('click', () => {
  if (img.value.trim() === '') {
    img.className =
      'border-2 border-red-500 w-[80%] h-[50px] rounded-[14px] pl-[20px] text-[20px]';
    img.setAttribute('placeholder', 'Rasm Kiritng!');
    return;
  }
});
add.addEventListener('click', () => {
  if (price.value.trim() === '') {
    price.className =
      'border-2 border-red-500 w-[80%] h-[50px] rounded-[14px] pl-[20px] text-[20px] pr-[10px]';
    price.setAttribute('placeholder', 'Narx kiritng!');
    return;
  }
});
add.addEventListener('click', () => {
  if (count.value.trim() === '') {
    count.className =
      'border-2 border-red-500 w-[80%] h-[50px] rounded-[14px] pl-[20px] text-[20px] pr-[10px]';
    count.setAttribute('placeholder', 'Son kiritng!');
    return;
  }
});
const newProdact = {
  id: Date.now(),
  name: name.value,
  img: img.value,
  price: Number(price.value),
  count: Number(count.value),
  discount: discount.checked,
  discountSum: Number(discountSum) / 100,
};
cards.push(newProdact);
// renderProdacts();
// resetForm();

discount.addEventListener('change', () => {
  if (discount.checked) {
    isSale.style.display = 'flex';
    discount.focus();
  } else {
    discountSum.style.display = 'none';
  }
});
