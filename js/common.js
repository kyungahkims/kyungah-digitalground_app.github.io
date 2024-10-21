/* 슬라이드 */
$('.swiper-group').each(function (t) {
	$(this).find('.swiper').addClass('type' + t);

	const slideCount = $(this).find('.swiper-slide').length;
	const swiper = new Swiper('.swiper.type' + t, {
		slidesPerView: 'auto',
		spaceBetween: (t === 0) ? 8 : 18,
		observer: true,
		observeParents: true,
		loop: false,
		initialSlide: 0,
		centeredSlides: slideCount === 1,
		centeredSlidesBounds: slideCount === 1,
	});
});

/* tab */
$(".tab_wrap .tab").click(function () {
	$(".tab_wrap .tab").removeClass("active");
	$(this).addClass("active");
});

/* nav bar*/
$('nav li').click(function () {
	$('nav li a').removeClass('active');
	$(this).find('a').addClass('active');
});

/* 비교 견적 선택*/
$('.swiper .box_wrap li').click(function () {
	$(this).closest('.box_wrap').find('li').removeClass('active');
	$(this).addClass('active');
});

/* 요금제 선택하기 */
$('.question_box .box_wrap button').click(function () {
	$('.box').removeClass('active');
	$(this).parents('.box').addClass('active');
});

/* 기종 선택 */
$('.filter_btn, .details_btn').click(function () {
	$('.modal_wrap').css('display', 'flex');
});

$('.modal_wrap, .sel_btn').click(function () {
	$('.modal_wrap').css('display', 'none');
});

$('.pop').click(function (e) {
	e.stopPropagation();
});

/* 찜하기*/
$('.like').click(function () {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).siblings('.heart').removeClass('heartpop');
		$(this).attr('aria-label', '찜하기');
	} else {
		$(this).addClass('active');
		$(this).siblings('.heart').addClass('heartpop');
		$(this).attr('aria-label', '찜하기 완료, 찜하게 해제');
	}
});

/* 터치 이벤트 */
let touchStartY = 0;
let touchEndY = 0;
let touchStartX = 0;
let touchEndX = 0;

function onTouchStart(e) {
	touchStartY = e.touches ? e.touches[0].clientY : e.clientY;
	touchStartX = e.touches ? e.touches[0].clientX : e.clientX;
}

function onTouchEnd(e) {
	touchEndY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
	touchEndX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

	if (Math.abs(touchStartY - touchEndY) > Math.abs(touchStartX - touchEndX)) {
		handleSwipe();
	}
}

function handleSwipe() {
	if (touchStartY > touchEndY + 10) {
		$('.wrap, header, .wing, nav').addClass('active');
	} else if (touchStartY < touchEndY - 10) {
		if ($('.wing').scrollTop() === 0) {
			$('.wrap, header, .wing, nav').removeClass('active');
		}
	}
}

/* 모바일 터치 이벤트 */
$('.wing').on('touchstart', onTouchStart);
$('.wing').on('touchend', onTouchEnd);

/* scroll 이벤트 */
function onScroll() {

	if ($(this).scrollTop() === 0) {
		$('.wrap, header, .wing, nav').removeClass('active');
	}
}

$('.wing').scroll(onScroll).trigger('scroll');

/* resize */
$(document).ready(function () {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	$(window).on('resize', function () {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
});

/* range_bar */
const values = [5, 50, 100, 200, 300];
const values2 = [50, 100, 200, 300, 500, 800];

function updateLabel(value) {
	$('#rangeLabel').text(values[value] + ' GB');
}

function updateLabel2(value) {
	$('#rangeLabel2').text(values2[value] + '분');
}

function updateLabel3(value) {
	$('#rangeLabel3').text(values2[value] + '건');
}

updateLabel($('#dataRange').val());
updateLabel2($('#dataRange2').val());
updateLabel3($('#dataRange3').val());

$('#dataRange').on('input change', function () {
	updateLabel($(this).val());
});

$('#dataRange2').on('input change', function () {
	updateLabel2($(this).val());
});