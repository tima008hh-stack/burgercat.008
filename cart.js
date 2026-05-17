var cartWrapper = document.getElementById('cart-wrapper');
var totalSumElement = document.getElementById('total-sum');
var checkoutForm = document.getElementById('checkout-form');

var cart = JSON.parse(localStorage.getItem('burgerCart')) || [];

function renderCart() {
    if (!cartWrapper || !totalSumElement) return;
    
    cartWrapper.innerHTML = '';
    var totalSum = 0;

    if (cart.length === 0) {
        cartWrapper.innerHTML = '<p>Ваша корзина пуста :( Пожалуйста добавьте любой товар который вам понравился</p>';
        totalSumElement.textContent = '0';
        return;
    }

    cart.forEach(function (item, index) {
        totalSum += item.price * item.quantity;

        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        // Используем обычные кавычки и плюсы для сборки текста
        itemElement.innerHTML = 
            '<img src="' + item.img + '" alt="' + item.name + '">' +
            '<div class="item-details">' +
                '<h4>' + item.name + '</h4>' +
                '<p>' + item.price + ' руб. x ' + item.quantity + ' шт.</p>' +
            '</div>' +
            '<button class="remove-btn" data-index="' + index + '">Удалить</button>';
            
        cartWrapper.appendChild(itemElement);
    });

    totalSumElement.textContent = String(totalSum);

    var removeButtons = cartWrapper.querySelectorAll('.remove-btn');
    removeButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            var idx = parseInt(e.target.getAttribute('data-index'), 10);
            removeItem(idx);
        });
    });
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('burgerCart', JSON.stringify(cart));
    renderCart();
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Заказ успешно оформлен! Наш менеджер свяжется с вами.');
        localStorage.removeItem('burgerCart');
        window.location.href = 'index.html';
    });
}

renderCart();