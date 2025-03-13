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
        if (windowWidth > 768) { // 768px 이상일 때
            $("section").unwrap("main");
            $("section").addClass("full");
            $("#title").addClass("full");
            $("section").css("height", "100vh"); // 섹션 높이를 화면 크기와 동일하게 설정
            $(".rightbox").css("display","block");
            $(".mobilebox").css("display","none");
        } else {
            // 작은 화면에서는 스타일을 원래대로 복원
            $("section").unwrap("main");
            $("section").removeClass("full");
            $("#title").removeClass("full");
            $("section").css("height", "auto");
            $(".rightbox").css("display","none");
            $(".mobilebox").css("display","block");
        }
    }

    // 초기 화면 크기 체크
    handleResize();

    // 화면 크기 변화 시 다시 체크
    $(window).resize(function () {
        handleResize();
    });

    $(elm).each(function (index) {
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            e.preventDefault();
            var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

            var moveTop = $(window).scrollTop(); // 현재 스크롤 위치
            var elmSelector = $(elm).eq(index);  // 현재 선택된 섹션

            // 마우스휠을 위에서 아래로
            if (delta < 0) {
                if ($(elmSelector).next().length > 0) {
                    moveTop = $(elmSelector).next().offset().top; // 다음 섹션으로 이동
                }
            }
            // 마우스휠을 아래에서 위로
            else {
                if ($(elmSelector).prev().length > 0) {
                    moveTop = $(elmSelector).prev().offset().top; // 이전 섹션으로 이동
                }
            }

            // 화면 이동 0.8초(800ms)
            $("html, body").stop().animate({
                scrollTop: moveTop
            }, 800);
        });
    });
};



$(document).ready(function(){
    AOS.init();
    });