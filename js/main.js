window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded_hiding');
	}, 500);
}
document.addEventListener('DOMContentLoaded', function() {
    // MODAL
    class ItcModal {
        #elem;
        #template = '<div class="itc-modal-backdrop"><div class="itc-modal-content"><div class="itc-modal-header"><div class="itc-modal-title">{{title}}</div><span class="itc-modal-btn-close" title="Закрыть">×</span></div><div class="itc-modal-body">{{content}}</div>{{footer}}</div></div>';
        #templateFooter = '<div class="itc-modal-footer">{{buttons}}</div>';
        #templateBtn = '<button type="button" class="{{class}}" data-action={{action}}>{{text}}</button>';
        #eventShowModal = new Event('show.itc.modal', { bubbles: true });
        #eventHideModal = new Event('hide.itc.modal', { bubbles: true });
        #disposed = false;
    
        constructor(options = []) {
        this.#elem = document.createElement('div');
        this.#elem.classList.add('itc-modal');
        let html = this.#template.replace('{{title}}', options.title || 'Новое окно');
        html = html.replace('{{content}}', options.content || '');
        const buttons = (options.footerButtons || []).map((item) => {
            let btn = this.#templateBtn.replace('{{class}}', item.class);
            btn = btn.replace('{{action}}', item.action);
            return btn.replace('{{text}}', item.text);
        });
        const footer = buttons.length ? this.#templateFooter.replace('{{buttons}}', buttons.join('')) : '';
        html = html.replace('{{footer}}', footer);
        this.#elem.innerHTML = html;
        document.body.append(this.#elem);
        this.#elem.addEventListener('click', this.#handlerCloseModal.bind(this));
        }
    
        #handlerCloseModal(e) {
        if (e.target.closest('.itc-modal-btn-close') || e.target.classList.contains('itc-modal-backdrop')) {
            this.hide();
        }
        }
    
        show() {
        if (this.#disposed) {
            return;
        }
        this.#elem.classList.add('itc-modal-show');
        this.#elem.dispatchEvent(this.#eventShowModal);
        }
    
        hide() {
        this.#elem.classList.remove('itc-modal-show');
        this.#elem.dispatchEvent(this.#eventHideModal);
        }
    
        dispose() {
        this.#elem.remove(this.#elem);
        this.#elem.removeEventListener('click', this.#handlerCloseModal);
        this.#disposed = true;
        }
    
        setBody(html) {
        this.#elem.querySelector('.itc-modal-body').innerHTML = html;
        }
    
        setTitle(text) {
        this.#elem.querySelector('.itc-modal-title').innerHTML = text;
        }
    }

    // Navigation

	let link = document.querySelectorAll(".nav__link");

	for (let i = 0; i < link.length; i++) {
		link[i].addEventListener("click", function() {
			if (link[i].className != "active") {
				let dellClass = document.querySelector(".active");
				dellClass.classList.remove('active');
				link[i].classList.add('active');
			} else {
				dellClass.classList.remove('active');
			}
		});
	}
    // Product and cart

	let product = [{
		category: 'vegetable',
		img: 'img/broccoli.png',
		name: "Calabrese Broccoli",
		lastPrise: 25.00,
		newPrise: 21.00
	}, {
		category: 'vegetable',
		img: 'img/corn.png',
		name: "Fresh Corn",
		lastPrise: 21.23,
		newPrise: 18.00
	}, {
		category: 'mill',
		img: 'img/pistachio.png',
		name: "Dried Pistachio",
		lastPrise: 61.00,
		newPrise: 48.00
	}, {
		category: 'vegetable',
		img: 'img/tomato.png',
		name: "Vegan Red Tomato",
		lastPrise: 14.00,
		newPrise: 9.37
	}, {
		category: 'fru',
		img: 'img/almonds.png',
		name: "Organic Almonds",
		lastPrise: 21.00,
		newPrise: 18.00
	}, {
		category: 'mill',
		img: 'img/huzelnut.png',
		name: "Brown Hazelnut",
		lastPrise: 43.00,
		newPrise: 34.00
	}, ];
	let cartItems = [];

	// Рейтинг
	function rate(rating, cardIndex) {
		const stars = document.querySelectorAll('.product__card')[cardIndex].querySelectorAll('.star');

		for (let i = 0; i < stars.length; i++) {
			if (i < rating) {
				stars[i].classList.add('filled');
			} else {
				stars[i].classList.remove('filled');
			}
		}
	}

	const container = document.querySelector('.product__container');

	function createProductCard(item, index) {
		const productCard = document.createElement('div');
		productCard.classList.add('product__card');

		const productGroup = document.createElement('div');
		productGroup.classList.add('product__category');
		productGroup.textContent = item.category;

		const productFoto = document.createElement('div');
		productFoto.classList.add('product__foto');
		const img = document.createElement('img');
		img.src = item.img;
		img.alt = item.name;
		productFoto.appendChild(img);

		const productProperty = document.createElement('div');
		productProperty.classList.add('product__property');

		const productName = document.createElement('p');
		productName.textContent = item.name;

		const hr = document.createElement('hr');

		const propertyWrap = document.createElement('div');
		propertyWrap.classList.add('product__property-wrap');

		const lastPrice = document.createElement('span');
		lastPrice.classList.add('last__price');
		lastPrice.textContent = '$ ' + item.lastPrise.toFixed(2) + ' USD';

		const newPrice = document.createElement('span');
		newPrice.textContent = '$ ' + item.newPrise.toFixed(2) + ' USD';

		const rating = document.createElement('div');
		rating.classList.add('rating');
		for (let i = 1; i <= 5; i++) {
			const star = document.createElement('span');
			star.classList.add('star');
			star.classList.add('filled');
			star.onclick = () => rate(i, index);
			star.innerHTML = '&#9733;';
			rating.appendChild(star);
		}

		const addToCartBlock = document.createElement('div');
		addToCartBlock.classList.add('product__add');
		addToCartBlock.style.display = 'none';
		const quantityInput = document.createElement('input');
		quantityInput.type = 'number';
		quantityInput.value = '1';
		quantityInput.min = '1';

		const quantityWrap = document.createElement('div');
		const decreaseButton = document.createElement('button');
		decreaseButton.textContent = '-';
		decreaseButton.addEventListener('click', () => {
			if (quantityInput.value > 1) {
				quantityInput.value--;
			}
		});

		const increaseButton = document.createElement('button');
		increaseButton.textContent = '+';
		increaseButton.addEventListener('click', () => {
			quantityInput.value++;
		});

		const addToCartButton = document.createElement('button');
		addToCartButton.textContent = 'add to cart';

		quantityWrap.appendChild(decreaseButton);
		quantityWrap.appendChild(quantityInput);
		quantityWrap.appendChild(increaseButton);
		addToCartBlock.appendChild(quantityWrap);
		addToCartBlock.appendChild(addToCartButton);

		propertyWrap.appendChild(lastPrice);
		propertyWrap.appendChild(newPrice);
		propertyWrap.appendChild(rating);

		productProperty.appendChild(productName);
		productProperty.appendChild(hr);
		productProperty.appendChild(propertyWrap);
		productProperty.appendChild(addToCartBlock);

		productCard.appendChild(productGroup);
		productCard.appendChild(productFoto);
		productCard.appendChild(productProperty);

		productCard.addEventListener('mouseenter', () => {
			addToCartBlock.style.display = 'flex';
		});

		productCard.addEventListener('mouseleave', () => {
			addToCartBlock.style.display = 'none';
		});

		addToCartButton.addEventListener('click', () => {
			const quantity = parseInt(quantityInput.value);

			const cartItem = {
				name: item.name,
				quantity: quantity,
				price: item.newPrise
			};

			cartItems.push(cartItem);
			console.log('Added to cart:', cartItem);
			// Оновлюємо лічильник товарів у корзині
			updateCartCount();

			// Сховати блок "Додати в кошик"
			addToCartBlock.style.display = 'none';

			productCard.classList.add('bounceOutUp');
			productCard.addEventListener('animationend', () => {
				productCard.classList.remove('bounceOutUp');
			});
		});

		return productCard;
	}

	product.forEach((item, index) => {
		const productCard = createProductCard(item, index);
		container.appendChild(productCard);
	});

	for (let i = 0; i < 3; i++) {
		const item = product[i];
		const productCard = createProductCard(item, i);
		const offerBlock = document.querySelector(".offer__products");
		offerBlock.appendChild(productCard);
	}

	const cartButton = document.querySelector('.cart__open');
	const cartOverlay = document.querySelector('.cart__overlay');
	const cartCloseButton = document.querySelector('.cart__close');
	const cartItemsContainer = document.querySelector('.cart__items');
	const totalAmount = document.querySelector('.total__amount');
	const confirmButton = document.querySelector('.cart__checkout');

	// Функція для оновлення вмісту корзини
	function updateCart() {
		cartItemsContainer.innerHTML = ''; // Очищуємо контейнер з товарами
		let cartTotal = 0; // Загальна сума

		// Проходимось по кожному товару у корзині
		for (let i = 0; i < cartItems.length; i++) {
			const cartItem = cartItems[i];

			const cartItemElement = document.createElement('div');
			cartItemElement.classList.add('cart__item');
			cartItemElement.innerHTML = `
            <div class="cart__item-info">
                <span class="cart__item-name">${cartItem.name}</span>
                <span class="cart__item-quantity">x ${cartItem.quantity}</span>
            </div>
            <div class="cart__item-price">$ ${cartItem.price.toFixed(2)}</div>
            <button class="cart__item-remove">&times;</button>
            `;

			cartItemsContainer.appendChild(cartItemElement);

			const cartItemRemoveButton = cartItemElement.querySelector('.cart__item-remove');
			cartItemRemoveButton.addEventListener('click', () => {
				cartItems.splice(i, 1); // Видаляємо товар з масиву
				// Оновлюємо лічильник товарів у корзині
				updateCartCount();
				// Оновлюємо вміст корзини
				updateCart();
			});

			const itemTotal = cartItem.price * cartItem.quantity;
			cartTotal += itemTotal;
		}

		totalAmount.textContent = '$ ' + cartTotal.toFixed(2);
	}

	cartButton.addEventListener('click', () => {
		cartOverlay.style.display = 'block';
		updateCart();
	});

	cartCloseButton.addEventListener('click', () => {
		cartOverlay.style.display = 'none';
	});
    const modal = new ItcModal({
        title: 'Order confirmation',
        content: '<div><h4>Thank you for your purchase!</h4> <p>We will contact you soon!</p></div>',
    });
	confirmButton.addEventListener('click', () => {
        modal.show();
		// alert('Thank you for your purchase!');
	});

	// Функція для оновлення лічильника товарів у корзині
	function updateCartCount() {
		const cartCountElement = document.querySelector('.cart__count');
		const count = cartItems.length;
		cartCountElement.textContent = count;
	}
	// Слайдер
	let slideIndex = 0;
	showSlide(slideIndex);

	const previousButton = document.querySelector('.previous');
	const nextButton = document.querySelector('.next');

	previousButton.addEventListener('click', previousSlide);
	nextButton.addEventListener('click', nextSlide);

	function nextSlide() {
		showSlide(slideIndex += 1);
	}

	function previousSlide() {
		showSlide(slideIndex -= 1);
	}

	function showSlide(index) {
		const slides = document.querySelectorAll('.slider .slide');

		if (index < 0) {
			slideIndex = slides.length - 1;
		} else if (index >= slides.length) {
			slideIndex = 0;
		} else {
			slideIndex = index;
		}

		slides.forEach((slide) => {
			slide.style.display = 'none';
		});

		slides[slideIndex].style.display = 'flex';
	}

    
});