console.log("app.js is connected successfully!");

// ------------------- VARIABLES -------------------
let iconcart = document.querySelector('.icon-cart');
let closecart = document.querySelector('.close');
let body = document.querySelector('body');
let listproductHTML = document.querySelector('.listproduct');
let cartListHTML = document.getElementById('cartitems');
let listProducts = [];
let cart = [];

// ------------------- CART OPEN / CLOSE -------------------
iconcart.addEventListener('click', () => {
    body.classList.toggle('showcart');
});

closecart.addEventListener('click', () => {
    body.classList.toggle('showcart');
});

// ------------------- ADD PRODUCTS TO PAGE -------------------
const addDataToHTML = () => {
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}">
                <h2>${product.name}</h2>
                <div class="price">${product.price}</div>
                <button class="addcart">ADD TO CART</button>
                <button class="buynow">BUY NOW</button>
            `;
            listproductHTML.appendChild(newProduct);
        });

        // add to cart button listener
        document.querySelectorAll('.addcart').forEach((button, index) => {
            button.addEventListener('click', () => {
                addToCart(listProducts[index]);
            });
        });
    }
};


// ------------------- ADD TO CART FUNCTION -------------------
function addToCart(product) {
    let newItem = document.createElement('div');
    newItem.classList.add('cart-item');
    newItem.innerHTML = `
        <img src="${product.image}" width="60">
        <div class="details">
            <h3>${product.name}</h3>
            
            <div class="quantity">
                <button class="minus">-</button>
                <span>1</span>
                <button class="plus">+</button>
            </div>
            <button class="remove">
            <i class="fa-solid fa-trash"></i>
            </button>
            
        </div>
    `;
    cartListHTML.appendChild(newItem);
    console.log(`${product.name} added to cart`);
}
document.addEventListener('click', function (e) {
  // Increase Quantity
  if (e.target.classList.contains('plus')) {
    const item = e.target.closest('.cart-item');
    const qtySpan = item.querySelector('.quantity span');
    let qty = parseInt(qtySpan.textContent);
    qty++;
    qtySpan.textContent = qty;
    updateItemPrice(item);
    updateTotal();
  }

  // Decrease Quantity
  if (e.target.classList.contains('minus')) {
    const item = e.target.closest('.cart-item');
    const qtySpan = item.querySelector('.quantity span');
    let qty = parseInt(qtySpan.textContent);
    if (qty > 1) qty--;
    qtySpan.textContent = qty;
    updateItemPrice(item);
    updateTotal();
  }

  
  // Remove Item
  if (e.target.classList.contains('remove') || e.target.closest('.remove')) {
    const item = e.target.closest('.cart-item');
    if (item) item.remove();
    updateTotal();
  }
});
// ------------------- INITIALIZE APP -------------------
const initApp = () => {
    console.log("initApp started");
    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            console.log('products loaded:', data);
            addDataToHTML();
        })
        .catch(err => console.error("Error loading products:", err));
       };
      

// REMOVE FROM CART FEATURE
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const cartItem = event.target.closest('.cart-item');
    if (cartItem) {
      cartItem.remove();
      console.log('Item removed from cart');
    }
  }
});

  initApp();

// ✅ Buy Now और Checkout बटन पर Popup दिखाने का कोड
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("successPopup");
  const closePopup = document.getElementById("closePopup");

  // Function to open popup
  function showSuccessPopup() {
    popup.style.display = "flex";
  }

  // Close button click
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // अगर Checkout बटन है
  const checkoutButton = document.querySelector(".checkout-btn");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      showSuccessPopup();
    });
  }

  // अगर सारे "Buy Now" बटन हैं
  const buyNowButtons = document.querySelectorAll(".buy-now");
  buyNowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showSuccessPopup();
    });
  });
});

