// ========== PRODUCT MANAGEMENT SYSTEM ==========

// 1. Khai báo mảng sản phẩm
const productList = [
    { id: "01", name: "Bánh mì thịt", price: 150000, image: "../assets/images/banhmi.jpg", description: "Bánh mì giòn rụm kẹp pate và thịt nướng", details: "Bánh mì gồm pate, chả lụa, trứng, dưa leo, rau thơm, sốt mayonnaise và tương ớt." },
    { id: "02", name: "Bún nem", price: 170000, image: "../assets/images/bunnem.jpg", description: "Bún tươi ăn kèm nem giòn và nước mắm chua ngọt", details: "Bún, nem chua rán, rau sống, giá, dưa leo và nước mắm chua ngọt đậm đà." },
    { id: "03", name: "Cháo lòng", price: 140000, image: "../assets/images/chaolong.jpg", description: "Cháo lòng ninh nhừ thơm ngon, ăn kèm hành và tiêu", details: "Cháo trắng mềm, lòng heo, huyết, gan, hành tây, hành lá, tiêu và mỡ hành." },
    { id: "04", name: "Cơm tấm sườn", price: 220000, image: "../assets/images/comtam.jpg", description: "Cơm tấm sườn nướng mềm, ăn kèm bì chả và trứng ốp la", details: "Cơm tấm thơm, sườn nướng, bì, chả, trứng ốp la, dưa leo và nước mắm đặc trưng." },
    { id: "05", name: "Phở bò", price: 130000, image: "../assets/images/pho.jpg", description: "Phở bò nóng hổi với nước dùng ngọt tự nhiên và bánh phở mềm", details: "Nước dùng trong, bánh phở mềm dai, thịt bò tái, hành lá, giá và rau thơm." },
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
        
        const link = document.createElement('a');
        link.setAttribute('href', `detail.html?productId=${product.id}`);
        link.setAttribute('class', 'product-link');
        
        const img = document.createElement('img');
        img.setAttribute('src', product.image);
        img.setAttribute('alt', product.name);
        
        link.appendChild(img);
        figure.appendChild(link);
        
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
        
        figure.appendChild(figcaption);
        
        gallery.appendChild(figure);
    });
}

// 4. Hàm lấy thông tin sản phẩm theo ID
function getProductById(productId) {
    return productList.find(product => product.id === String(productId));
}

// 5. Hàm render trang chi tiết nếu đang ở detail.html
function renderDetailPage() {
    const detailContainer = document.getElementById('detail-content');
    if (!detailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');
    const product = getProductById(productId);

    if (!product) {
        detailContainer.innerHTML = '<p>Không tìm thấy sản phẩm. Vui lòng quay lại thư viện.</p>';
        return;
    }

    detailContainer.innerHTML = `
        <div class="detail-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3>Thông tin chi tiết</h3>
            <ul>
                <li>Giá: ${product.price.toLocaleString()}₫</li>
                <li>Chi tiết: ${product.details}</li>
                <li>Trạng thái: Còn hàng</li>
            </ul>
            <a class="btn" href="page6.html">← Trở về thư viện</a>
        </div>
    `;
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
    renderDetailPage();
});