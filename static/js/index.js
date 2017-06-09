$(document).ready(function() {
	var isClosed = false;
	var dropdown = $('.dropdown');
	$('[data-toggle="offcanvas"]').click(function() {
		$('#wrapper').toggleClass('toggled');
	});
	//阻止bootstrap的.dropdown冒泡
	$('.dropdown-menu').click(function(event) {
		event.stopPropagation();
	});

	var URLhash = window.location.hash; //获取URL地址#后的部分
	if(URLhash == '#/communication') {
		$('li.dropdown').eq(0).addClass('open')
	} else {
		if(URLhash == '#/acquisition') {
			$('li.dropdown').eq(1).addClass('open')
			
		}
	}

	$(document).on('click', function() {
		var URLhash = window.location.hash; //获取URL地址#后的部分
		if(URLhash == '#/communication') {
			$('li.dropdown').eq(0).addClass('open')
		} else {
			if(URLhash == '#/acquisition') {
				$('li.dropdown').eq(1).addClass('open')
			}
		}
	});

	$('.top-header>i.iconfont').click(function() { //点击关闭页面或者返回主页
		if(history.length <= 1) {
			window.close();
		} else {
			window.location.href = "../../index.html";
		}
	})
	$('.content-body').slimScroll({
		height: "100%",
		wheelStep: 4,
		size: '5px',
		color: '#424242',
		opacity: 1
	});
})