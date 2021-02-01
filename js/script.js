window.addEventListener('DOMContentLoaded', () => {

	function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
	
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	

const deadline = '2021-03-25';

function getTimeRemaining(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t/(1000*60*60*24)),
			hours = Math.floor((t / (1000*60*60)) % 24),
			minutes = Math.floor((t / (1000*60)) % 60 ),
			seconds = Math.floor((t/1000) % 60);
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function getZero(num) {
	if(num >= 0 && num < 10) {
		return `0${num}`;
	}
	else {
		return num;
	}
}

function setClock(selector, endtime) {
	const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInerval = setInterval(updateClock, 1000);

	updateClock();

	function updateClock() {
		const t = getTimeRemaining(endtime);

		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);

		if (t.total <=0) {
			clearInterval(timeInerval);
		}
	}
}

setClock('.timer', deadline);


	const modalTrigger = document.querySelectorAll('[data-modal]'),
	modal = document.querySelector('.modal'),
	modalCloseBtn = document.querySelector('[data-close]');

function openModal() {
	modal.classList.toggle('show');
	document.body.style.overflow = 'hidden';
}

modalTrigger.forEach((btn) => {
	btn.addEventListener('click', openModal);
});


function closeModal() {
	modal.classList.toggle('show');
	document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

document.addEventListener('keydown', (e) => {
	if (e.code === "Escape" && modal.classList.contains('show')) {
		closeModal();
	}
});

function showModalByScroll() {
	if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
		openModal();
		window.removeEventListener('scroll', showModalByScroll);
	}
}

window.addEventListener('scroll', showModalByScroll);


	class MenuCard {
	constructor(src, alt, title, descr, price, parentSelector, ...classes) {
		this.src = src;
		this.alt = alt;
		this.title = title;
		this.descr = descr;
		this.price = price;
		this.classes = classes;
		this.parent = document.querySelector(parentSelector);
		this.transfer = 27;
		this.changeToUAH();
	}

	changeToUAH() {
		this.price = this.price * this.transfer;
	}

	render() {
		const element = document.createElement('div');

		if (this.classes.length === 0) {
			this.element = 'menu__item';
			element.classList.add(this.element);
		}
		else {
			this.classes.forEach(className => element.classList.add(className));
		}

		this.classes.forEach(className => element.classList.add(className));
		element.innerHTML = `
                
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                
            `;
		this.parent.append(element);
	}
}

new MenuCard(
	"img/vegy.jpg",
	"vegy",
	'Меню "Фитнес"',
	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	9,
	".menu .container"
).render();

new MenuCard(
	"img/post.jpg",
	"post",
	'Меню "Постное"',
	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	14,
	".menu .container",
	'menu__item'
).render();

new MenuCard(
	"img/elite.jpg",
	"elite",
	'Меню “Премиум”',
	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	21,
	".menu .container",
	'menu__item'
).render();

	let offset = 0;
let slideIndex = 1;

const slides = document.querySelectorAll('.offer__slide'),
	slider = document.querySelector('.offer__slider'),
	prev = document.querySelector('.offer__slider-prev'),
	next = document.querySelector('.offer__slider-next'),
	total = document.querySelector('#total'),
	current = document.querySelector('#current'),
	slidesWrapper = document.querySelector('.offer__slider-wrapper'),
	width = window.getComputedStyle(slidesWrapper).width,
	slidesField = document.querySelector('.offer__slider-inner');

if (slides.length < 10) {
	total.textContent = `0${slides.length}`;
	current.textContent = `0${slideIndex}`;
} else {
	total.textContent = slides.length;
	current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
	slide.style.width = width;
});

const indicators = document.createElement('ol'),
	dots = [];



slider.style.position = 'relative';
indicators.classList.add('carousel-indicators');
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
	const dot = document.createElement('li');
	dot.setAttribute('data-slide-to', i + 1);
	dot.classList.add('dot');
	if (i == 0) {
		dot.style.opacity = 1;
	}
	indicators.append(dot);
	dots.push(dot);
}

next.addEventListener('click', () => {
	if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
		offset = 0;
	} else {
		offset += +width.slice(0, width.length - 2);
	}

	slidesField.style.transform = `translateX(-${offset}px)`;

	if (slideIndex == slides.length) {
		slideIndex = 1;
	} else {
		slideIndex++;
	}

	if (slides.length < 10) {
		current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}

	dots.forEach(dot => dot.style.opacity = '.5');
	dots[slideIndex - 1].style.opacity = '1';
});

prev.addEventListener('click', () => {
	if (offset == 0) {
		offset = +width.slice(0, width.length - 2) * (slides.length - 1);
	} else {
		offset -= +width.slice(0, width.length - 2);
	}

	slidesField.style.transform = `translateX(-${offset}px)`;

	if (slideIndex == 1) {
		slideIndex = slides.length;
	} else {
		slideIndex--;
	}

	if (slides.length < 10) {
		current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}

	dots.forEach(dot => dot.style.opacity = '.5');
	dots[slideIndex - 1].style.opacity = '1';
});

dots.forEach(dot => {
	dot.addEventListener('click', (e) => {
		const slideTo = e.target.getAttribute('data-slide-to');
		slideIndex = slideTo;
		offset = +width.slice(0, width.length - 2) * (slideTo - 1);
		slidesField.style.transform = `translateX(-${offset}px)`;
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';
	});
});


/* showSlides(slideIndex);

if (slides.length < 10) {
  total.textContent = `0${slides.length}`;
}
else {
  total.textContent = slides.length;
}

function showSlides(n) {
  if (n > slides.length) {
	  slideIndex = 1;
  }
  if (n < 1) {
	  slideIndex = slides.length;
  }

  slides.forEach(item => item.style.display = 'none');

  slides[slideIndex - 1].style.display = '';

  if (slides.length < 10) {
	  current.textContent = `0${slideIndex}`;
  }
  else {
	  current.textContent = slideIndex;
  }

}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

prev.addEventListener('click', () => {
  plusSlides(-1);
});

next.addEventListener('click', () => {
  plusSlides(1);
}); */


});