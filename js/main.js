$(function(){
    $(window).scroll(function(){
    var scrollPosition = $(window).scrollTop();  // 현재 스크롤 위치
    var reportOffset = $("#report").offset().top; // #report 섹션의 시작 위치

    // 스크롤이 #report 섹션에 도달하면 navColor 클래스 추가
        if (scrollPosition >= reportOffset) {
            $("header").addClass("navColor");
        } else {
            $("header").removeClass("navColor");
        }
    });
});

window.onload = function () {
var elm = ".full";
// 화면 크기 확인
function handleResize() {
    var windowWidth = $(window).width();

    // 화면 크기가 특정 너비 이상일 때만 실행
    if (windowWidth > 768) { // 예시로 768px 이상일 때만 실행
        $("section").unwrap("main");
        $("section").addClass("full");
        $("#title").addClass("full");
        $("section").css("height", "100vh"); // 섹션의 높이를 화면 크기와 동일하게 설정
        $(".rightbox").css("display","block");
        $(".mobilebox").css("display","none");
    } else {
        // 작은 화면에서는 스타일이나 기능을 원래대로 돌려놓거나 비활성화
        $("section").unwrap("main");
        $("section").removeClass("full");
        $("#title").removeClass("full");
        $("section").css("height", "auto"); // 작은 화면에서는 섹션의 높이를 자동으로 설정
        $(".rightbox").css("display","none");
        $(".mobilebox").css("display","block");
    }
}

// 초기 화면 크기 체크
handleResize();

// 화면 크기 변화 시, 다시 체크
$(window).resize(function () {
    handleResize();
});

$(elm).each(function (index) {
    // 개별적으로 Wheel 이벤트 적용
    $(this).on("mousewheel DOMMouseScroll", function (e) {
        e.preventDefault();
        var delta = 0;
        if (!e) e = window.e;
        if (e.wheelDelta) {
            delta = e.wheelDelta / 120;
            if (window.opera) delta = -delta;
        }
        else if (e.detail) {
            delta = -e.detail / 3;
        }

        var moveTop = $(window).scrollTop(); // 현재 스크롤 위치
        var elmSelecter = $(elm).eq(index);  // 현재 선택된 섹션

        // 마우스휠을 위에서 아래로
        if (delta < 0) {
            if ($(elmSelecter).next().length > 0) {
                try {
                    moveTop = $(elmSelecter).next().offset().top; // 다음 섹션으로 이동
                }
                catch (e) {}
            }
        }
        // 마우스휠을 아래에서 위로
        else {
            if ($(elmSelecter).prev().length > 0) {
                try {
                    // footer가 화면 맨 아래에 있을 때, 뉴스 섹션으로 이동하도록 처리
                    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                        moveTop = $('#news').offset().top; // news로 이동
                    }
                    else {
                        moveTop = $(elmSelecter).prev().offset().top; // 이전 섹션으로 이동
                    }
                } catch (e) {}
            }
        }

        // 화면 이동 0.8초(800ms)
        $("html, body").stop().animate({
            scrollTop: moveTop + 'px'
        }, {
            duration: 800, complete: function () {
                // 애니메이션 완료 후 추가 동작이 있을 경우 넣을 수 있음
            }
        });
    });
});


$(document).ready(function(){
    AOS.init();
    });
}