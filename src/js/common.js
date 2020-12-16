var galleryList = new Swiper('.gallery-list > .swiper-container', {
	init: false,
	loop: false,
	preloadImages: false,
	lazy: true,
	pagination: {
		el: '.swiper-pagination',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

galleryList.on('init', function() {
	if (this.slides.length > 5) {
		$('.swiper-pagination').hide();
		$('.swiper-pagination2').show();
	}
});

galleryList.init();

galleryList.on('slideChange', function() {
	if (this.slides.length > 5) {
		$('.swiper-pagination2 .swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
		if (this.activeIndex === 0) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(1)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex === 1) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(2)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex > 1 && this.activeIndex < this.slides.length - 2) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(3)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex === this.slides.length - 2) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(4)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex === this.slides.length - 1) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(5)').addClass('swiper-pagination-bullet-active');
		}
	}
});
/*
// youtube API 불러옴
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 플레이어변수 설정
var youTubePlayer1;

function onYouTubeIframeAPIReady() {
	youTubePlayer1 = new YT.Player('youTubePlayer1', {
		width: '1280',
		height: '720',
		videoId: 'ApZhAA7qWF0',
		playerVars: {rel: 0},//추천영상 안보여주게 설정
		events: {
			'onReady': onPlayerReady, //로딩할때 이벤트 실행
			'onStateChange': onPlayerStateChange //플레이어 상태 변화시 이벤트실행
		}
	});//youTubePlayer1셋팅
}

function onPlayerReady(event) {
	// event.target.playVideo();//자동재생
	//로딩할때 실행될 동작을 작성한다.
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
	//플레이어가 재생중일때 작성한 동작이 실행된다.
	}
}
*/
function fixedNav() {
    if ($(document).scrollTop() > $('header h1').height()) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
	}
}

const targetElement = document.querySelector('#modal');

function modalOpen(modal) {
    $('body').addClass('modal-active');
    $('#modal').addClass('active');
    $(modal).removeClass('hidden');
	$(modal + '-page1').removeClass('hidden');
	bodyScrollLock.disableBodyScroll(targetElement);
}

function modalNext(modal, current, next) {
	$(modal + '-' + current).addClass('hidden');
	if (next === 'end') {
		modalClose();
	} else {
		$(modal + '-' + next).removeClass('hidden');
	}
}

function modalCheck(modal, current, next) {
    var modalForms = [];
    modalForms.push($(modal + '-' + current + ' .form-name input'));
    modalForms.push($(modal + '-' + current + ' .form-tel input'));
    modalForms.push($(modal + '-' + current + ' .form-address input:first-of-type'));
	modalForms.push($(modal + '-' + current + ' .form-agree input'));
    var regexPhone = /^(010)[0-9]{4}[0-9]{4}$/;
    if (modalForms[0].val() === '') {
        alert('정보를 입력해주세요!');
        modalForms[0].focus();
        modalForms[0].scroll();
        return false;
    } else if (modalForms[1].val() === '') {
        alert('정보를 입력해주세요!');
        modalForms[1].focus();
        modalForms[1].scroll();
        return false;
    } else if (modalForms[2].val() === '') {
        alert('정보를 입력해주세요!');
        $(modal + '-' + current + ' .form-address-find').focus();
        $(modal + '-' + current + ' .form-address-find').scroll();
        return false;
    } else if (!regexPhone.test(modalForms[1].val())) {
        alert('연락처를 확인해주세요.');
        modalForms[1].focus();
        modalForms[1].scroll();
        return false;
    } else if (modalForms[3].prop('checked') === false) {
        alert('개인 정보 취급/이용 약관에 동의해주세요.');
        modalForms[3].focus();
        modalForms[3].scroll();
        return false;
    } else {
        alert('참여가 완료 되었습니다.');
        modalNext(modal, current, next);
    }
}

function modalClose() {
    $('body').removeClass('modal-active');
    $('#modal').removeClass('active');
	$('#modal').removeClass('share');
    $('.modal-container').addClass('hidden');
	$('.modal-page').addClass('hidden');
	$('#modal input[type="text"]').val('');
	$('#modal input[type="tel"]').val('');
	$('#modal input[type="checkbox"]').prop('checked', false);
    $('#modal .form-read-button').removeClass('active');
	$('#modal .form-read').removeClass('active');
	location.hash = '';
	bodyScrollLock.clearAllBodyScrollLocks();
}

function hashtagCopy(dummyDiv) {
    var dummy = document.createElement("textarea");
    document.querySelector(dummyDiv).appendChild(dummy);
    dummy.value = '#포스트시리얼바 #부캐유형테스트결과 #찰떡부캐아이템 #나의CBTI';
    dummy.select();
    document.execCommand("copy");
	document.querySelector(dummyDiv).removeChild(dummy);
	alert('해시태그 복사가 완료되었습니다.');
}

let cbtiTestArray = [];

function cbtiTest(button) {
	cbtiTestArray[button.dataset.order - 1] = button.dataset.value;
	function cbtiNext() {
		document.querySelector('.cbti-pagination > li:nth-child(' + button.dataset.order + ')').classList.remove('active');
		document.querySelector('.cbti-pagination > li:nth-child(' + (Number(button.dataset.order) + 1) + ')').classList.add('active');
		modalNext('.modal-cbti1', 'loading', 'page' + (Number(button.dataset.order) + 1));
	}
	if (button.dataset.order > 7) {
		modalNext('.modal-cbti1', 'page' + button.dataset.order, 'loading');
		let cbtiResult = '';
		if (cbtiTestArray[0] === 'a') {
			cbtiResult += 'E';
		} else {
			cbtiResult += 'I';
		}
		if (cbtiTestArray[2] === 'a') {
			cbtiResult += 'S';
		} else {
			cbtiResult += 'N';
		}
		if (cbtiTestArray[4] === 'a') {
			cbtiResult += 'T';
		} else {
			cbtiResult += 'F';
		}
		if (cbtiTestArray[6] === 'a') {
			cbtiResult += 'J';
		} else {
			cbtiResult += 'P';
		}
		let cbtiType = '';
		switch(cbtiResult) {
			case 'ISTJ':
				cbtiType = '1';
				break;
			case 'ISFJ':
				cbtiType = '2';
				break;
			case 'INFJ':
				cbtiType = '3';
				break;
			case 'INTJ':
				cbtiType = '4';
				break;
			case 'ISTP':
				cbtiType = '5';
				break;
			case 'ISFP':
				cbtiType = '6';
				break;
			case 'INFP':
				cbtiType = '7';
				break;
			case 'INTP':
				cbtiType = '8';
				break;
			case 'ESTP':
				cbtiType = '9';
				break;
			case 'ESFP':
				cbtiType = '10';
				break;
			case 'ENFP':
				cbtiType = '11';
				break;
			case 'ENTP':
				cbtiType = '12';
				break;
			case 'ESTJ':
				cbtiType = '13';
				break;
			case 'ESFJ':
				cbtiType = '14';
				break;
			case 'ENFJ':
				cbtiType = '15';
				break;
			case 'ENTJ':
				cbtiType = '16';
				break;
			default:
				alert('오류 발생');
		}
		function cbtiNext2() {
			$('.modal-container.modal-cbti1').addClass('hidden');
			$('.modal-page').addClass('hidden');
			$('.modal-container.modal-cbti2').removeClass('hidden');
			$('.modal-cbti2-page' + cbtiType).removeClass('hidden');
			$('.modal-iphone .modal-content img').attr('src', 'src/img/modal-cbti-630-image' + cbtiType + '.jpg');
		}
		setTimeout(cbtiNext2, 1400);
		return true;
	}
	modalNext('.modal-cbti1', 'page' + button.dataset.order, 'loading');
	setTimeout(cbtiNext, 700);
}

function hashHandler() {
	function cbtiShareInit() {
		$('body').removeClass('modal-active');
		$('#modal').removeClass('active');
		$('#modal').removeClass('share');
		$('.modal-container').addClass('hidden');
		$('.modal-page').addClass('hidden');
		$('#modal input[type="text"]').val('');
		$('#modal input[type="tel"]').val('');
		$('#modal input[type="checkbox"]').prop('checked', false);
		$('#modal .form-read-button').removeClass('active');
		$('#modal .form-read').removeClass('active');
		// bodyScrollLock.clearAllBodyScrollLocks();
	}
	function cbtiShareOpen(page) {
		cbtiShareInit();
		$('body').addClass('modal-active');
		$('#modal').addClass('share');
		$('#modal').addClass('active');
		$('.modal-cbti2').removeClass('hidden');
		$('.modal-cbti2-page' + page).removeClass('hidden');
		$('.modal-iphone .modal-content img').attr('src', 'src/img/modal-cbti-630-image' + page + '.jpg');
		bodyScrollLock.disableBodyScroll(targetElement);
	}
	switch(location.hash) {
		case '#page1':
			cbtiShareOpen('1');
			break;
		case '#page2':
			cbtiShareOpen('2');
			break;
		case '#page3':
			cbtiShareOpen('3');
			break;
		case '#page4':
			cbtiShareOpen('4');
			break;
		case '#page5':
			cbtiShareOpen('5');
			break;
		case '#page6':
			cbtiShareOpen('6');
			break;
		case '#page7':
			cbtiShareOpen('7');
			break;
		case '#page8':
			cbtiShareOpen('8');
			break;
		case '#page9':
			cbtiShareOpen('9');
			break;
		case '#page10':
			cbtiShareOpen('10');
			break;
		case '#page11':
			cbtiShareOpen('11');
			break;
		case '#page12':
			cbtiShareOpen('12');
			break;
		case '#page13':
			cbtiShareOpen('13');
			break;
		case '#page14':
			cbtiShareOpen('14');
			break;
		case '#page15':
			cbtiShareOpen('15');
			break;
		case '#page16':
			cbtiShareOpen('16');
			break;
	}
}

window.addEventListener('DOMContentLoaded', function() {
	hashHandler();
});

window.addEventListener('hashchange', function() {
	hashHandler();
});

$(window).scroll(function() {
	fixedNav();
});


$('.button-event1').click(function() {
	cbtiTestArray = [];
	$('.cbti-pagination > li').removeClass('active');
	$('.cbti-pagination > li:first-child').addClass('active');
	modalOpen('.modal-cbti1');
});

$('.button-cbti').click(function() {
	cbtiTest(this);
});

$('.button-cbti-download').click(function() {
    $('#modal').addClass('iphone');
	$('.modal-iphone-background').removeClass('hidden');
    $('.modal-iphone').removeClass('hidden');
	$('.modal-iphone' + '-page1').removeClass('hidden');
});

$('.modal-iphone-close').click(function() {
    $('.modal-iphone').addClass('hidden');
	$('.modal-iphone' + '-page1').addClass('hidden');
	$('.modal-iphone-background').addClass('hidden');
    $('#modal').removeClass('iphone');
});

$('.button-cbti-hashtag').click(function() {
	hashtagCopy('.hash-dummy2');
});

$('.button-cbti-submit').click(function() {
	$('.modal-container.modal-cbti2').addClass('hidden');
	$('.modal-page').addClass('hidden');
	$('.modal-container.modal-event1').removeClass('hidden');
	$('.modal-event1-page1').removeClass('hidden');
});

$('.button-cbti-submit2').click(function() {
	modalClose();
	$('html, body').animate({
		scrollTop: $('#event1').offset().top - $('nav').height() + 1
	}, 500);
});

$('.modal-event1-page1 .modal-submit').click(function() {
	modalCheck('.modal-event1', 'page1', 'page2');
});

$('.modal-event1-page2 .modal-submit').click(function() {
	modalNext('.modal-event1', 'page2', 'end');
});

$('.button-event2-1').click(function() {
	hashtagCopy('.hash-dummy1');
});

$('.button-gallery').click(function() {
	modalOpen('.modal-gallery');
})

$('.modal-gallery-page1 .modal-submit').click(function() {
	modalNext('.modal-gallery', 'page1', 'end');
});

$('.button-event2-2').click(function() {
	modalOpen('.modal-event2');
});

$('.modal-event2-page1 .modal-submit').click(function() {
	modalNext('.modal-event2', 'page1', 'page2');
});

$('.modal-event2-page2 .modal-back').click(function() {
	modalNext('.modal-event2', 'page2', 'page1');
});

$('.modal-event2-page2 .modal-submit').click(function() {
	modalNext('.modal-event2', 'page2', 'page3');
});

$('.modal-event2-page3 .modal-submit').click(function() {
	modalCheck('.modal-event2', 'page3', 'page4');
});

$('.modal-event2-page4 .modal-submit').click(function() {
	modalNext('.modal-event2', 'page4', 'end');
});
/*
$(".movie-thumb").on("click", function() {
	$(this).hide();
	youTubePlayer1.playVideo();//재생
});
*/
$('.button-event3').click(function() {
	modalOpen('.modal-event3');
});

$('.modal-event3-page1 .modal-submit').click(function() {
	modalNext('.modal-event3', 'page1', 'page2');
});

$('.modal-event3-page2 .modal-submit').click(function() {
	modalCheck('.modal-event3', 'page2', 'end');
});

$('.modal-close').click(function() {
	modalClose();
});

$('.form-read-button').click(function() {
	if (!$(this).hasClass('active')) {
		$('.form-read').addClass('active');
		$('.form-read-button').addClass('active');
	} else {
		$('.form-read').removeClass('active');
		$('.form-read-button').removeClass('active');
	}
});