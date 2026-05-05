// ========== PRODUCT MANAGEMENT SYSTEM ==========

// 1. Khai báo mảng sản phẩm
const productList = [
    { id: "01", name: "Ảnh phong cảnh 1", price: 150000, image: "../assets/images/anh.jpg", description: "Hình ảnh phong cảnh đẹp, chất lượng cao" },
    { id: "02", name: "Ảnh phong cảnh 2", price: 170000, image: "../assets/images/canh.jpg", description: "Bộ sưu tập ảnh phong cảnh tự nhiên" },
    { id: "03", name: "Cánh đồng", price: 140000, image: "../assets/images/canhdong.jpg", description: "Hình ảnh cánh đồng xanh mướt" },
    { id: "04", name: "Chọn nhất", price: 220000, image: "../assets/images/chonhat.jpg", description: "Bộ ảnh được chọn lọc kỹ càng" },
    { id: "05", name: "Ảnh đẹp", price: 130000, image: "../assets/images/dep.jpg", description: "Hình ảnh đẹp mắt, sáng tạo" },
    { id: "06", name: "Cô gái", price: 160000, image: "../assets/images/girl.jpg", description: "Chân dung cô gái xinh đẹp" },
    { id: "07", name: "Xanh mát", price: 145000, image: "../assets/images/xanh.jpg", description: "Hình ảnh màu xanh dịu mắt" }
];

// 2. Hàm thêm sản phẩm vào giỏ hàng
let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

function addToCart(product) {
    // Thêm vào giỏ
    cartData.push(product);
    localStorage.setItem('cartData', JSON.stringify(cartData));
    
    // Hiển thị thông báo
    alert(`Đã thêm "${product.name}" vào giỏ hàng!\nGiá: ${product.price.toLocaleString()}₫`);
    
    // Cập nhật số lượng
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cartData.length;
    }
}

// 3. Hàm render gallery từ productList
function renderGallery(containerId) {
    const gallery = document.getElementById(containerId);
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    productList.forEach(product => {
        const figure = document.createElement('figure');
        figure.setAttribute('class', 'gallery-item');
        
        const img = document.createElement('img');
        img.setAttribute('src', product.image);
        img.setAttribute('alt', product.name);
        
        const figcaption = document.createElement('figcaption');
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = product.name;
        
        const priceSpan = document.createElement('span');
        priceSpan.setAttribute('class', 'price');
        priceSpan.textContent = `Giá: ${product.price.toLocaleString()}₫`;
        
        const buyBtn = document.createElement('button');
        buyBtn.setAttribute('class', 'buy-btn');
        buyBtn.textContent = 'Mua ngay';
        buyBtn.onclick = function() {
            addToCart(product);
        };
        
        figcaption.appendChild(nameSpan);
        figcaption.appendChild(priceSpan);
        figcaption.appendChild(buyBtn);
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        
        gallery.appendChild(figure);
    });
}

// 4. Hàm render bảng giá từ productList
function renderPriceTable(containerId) {
    const tableBody = document.getElementById(containerId);
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    productList.forEach((product, index) => {
        const tr = document.createElement('tr');
        
        const tdNo = document.createElement('td');
        tdNo.textContent = index + 1;
        
        const tdName = document.createElement('td');
        tdName.textContent = product.name;
        
        const tdPrice = document.createElement('td');
        tdPrice.textContent = product.price.toLocaleString();
        
        const tdDesc = document.createElement('td');
        tdDesc.textContent = product.description;
        
        tr.appendChild(tdNo);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdDesc);
        
        tableBody.appendChild(tr);
    });
}

// 5. Hàm xem giỏ hàng
function viewCart() {
    if (cartData.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    
    let cartSummary = 'GIỎ HÀNG CỦA BẠN:\n\n';
    let total = 0;
    
    cartData.forEach((item, index) => {
        cartSummary += `${index + 1}. ${item.name} - ${item.price.toLocaleString()}₫\n`;
        total += item.price;
    });
    
    cartSummary += `\n=============================\nTổng tiền: ${total.toLocaleString()}₫`;
    
    alert(cartSummary);
}

// 6. Hàm xóa giỏ hàng
function clearCart() {
    if (confirm('Bạn có chắc chắn muốn xóa giỏ hàng?')) {
        cartData = [];
        localStorage.removeItem('cartData');
        updateCartCount();
        alert('Giỏ hàng đã được xóa!');
    }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderGallery('gallery');
    renderPriceTable('price-table-body');
});