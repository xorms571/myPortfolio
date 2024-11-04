new Swiper(".swiper", {
  spaceBetween: 20, // 슬라이드 간의 간격
  loop: true, // 슬라이드 루프(무한 회전) 활성화
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination", // 페이지 표시기
    clickable: true, // 페이지 번호 클릭 가능하게 설정
  },
  /* autoplay: {
    delay: 3000, // 3초마다 자동 재생
    disableOnInteraction: false // 사용자 상호 작용 후에도 자동 재생 유지
  },  */
  centeredSlides: true, // 슬라이드 중앙 정렬
});
