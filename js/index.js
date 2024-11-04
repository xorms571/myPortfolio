import { portfolioInfoData } from "./data.js";
const pinUp = document.querySelector(".pin-up");
const contentWrap = pinUp.querySelector(".content-wrap");
const pc = contentWrap.querySelector(".pc");
const mb = contentWrap.querySelector(".mb");
const swiper = document.createElement("div");
const swiperWrapper = document.createElement("div");
const swiperButtonNext = document.createElement("div");
const swiperButtonPrev = document.createElement("div");
const swiperPagination = document.createElement("div");
swiper.className = "swiper";
swiperWrapper.className = "swiper-wrapper";
swiperButtonNext.className = "swiper-button-next";
swiperButtonPrev.className = "swiper-button-prev";
swiperPagination.className = "swiper-pagination";
portfolioInfoData.forEach((item, index) => {
  const colorBoxes = (item.color || [])
    .map(
      (color) => `
    <div>
      <div class='color-box' style='background:${color}'></div>
      <span>${color}</span>
    </div>`
    )
    .join("");

  const techBoxes = (item.tech || [])
    .map(
      (tech) => `
    <div class='tech-box'>
      <img src='${tech[0]}' />
      <p>${tech[1]}</p>
    </div>`
    )
    .join("");
  const contentHtmlPc = `
        <div class='content content-${index}'>
          <img src='${item.img}' alt='Portfolio Image ${index}' />
          <h2 class='title-out'>${item.title}</h2>
          <div class='tech-boxes-out'><p>Techs Used :</p>${techBoxes}</div>
          <div class='content-desc'>
          <h2>${item.title}</h2>
          <a href='${item.adress}'>${item.adress}</a>
          <div class='color-boxes'>${colorBoxes}</div>
          <div class='tech-boxes'>${techBoxes}</div>
          <p>${item.desc}</p>
          </div>
        </div>
`;
  const contentHtmlMb = `
<div class='content content-${index} swiper-slide'>
  <img src='${item.img}' alt='Portfolio Image ${index}' />
  <div class='content-desc'>
  <h2>${item.title}</h2>
  <div><a href='${item.adress}'>${item.adress}</a></div>
  <div class='color-boxes'>${colorBoxes}</div>
  <div class='tech-boxes'>${techBoxes}</div>
  <p>${item.desc}</p>
  </div>
</div>
`;
  pc.innerHTML += contentHtmlPc;
  mb.appendChild(swiper);
  swiper.appendChild(swiperWrapper);
  swiper.appendChild(swiperPagination);
  swiperWrapper.innerHTML += contentHtmlMb;
});

gsap.set(".content", { transform: "translateY(0)" });
const headlines = gsap.utils.toArray(".text");

const totalDuration = 3000;
const singleDuration = totalDuration / headlines.length;

const lineTimeline = gsap.timeline();
ScrollTrigger.create({
  trigger: ".pin-up",
  start: "top top",
  end: "+=" + totalDuration,
  //markers: true,
  pin: true,
  scrub: true,
  animation: lineTimeline,
});

lineTimeline
  .to(".sideline", { duration: 1 }, 0)
  .to(".sideline", { duration: 0.9, scaleY: 1, ease: "none" }, 0);
headlines.forEach((elem, i) => {
  const smallTimeline = gsap.timeline();
  const content = document.querySelector(".content-wrap");
  const pereviateContent = content.querySelector(".content-" + (i - 1));
  const relevantContent = content.querySelector(".content-" + i);
  const relevantContentImg = relevantContent.querySelector("img");
  const relevantContentDesc = relevantContent.querySelector(".content-desc");
  const techs = relevantContent.querySelector(".tech-boxes-out");
  const titles = relevantContent.querySelector(".title-out");

  ScrollTrigger.create({
    trigger: "body", // 트리거를 body로 설정
    start: "top -=" + singleDuration * i, // 각 애니메이션의 시작 시점
    end: "+=" + singleDuration, // 끝 시점 설정
    animation: smallTimeline, // 연결된 애니메이션
    toggleActions: "play reverse play reverse",
  });

  smallTimeline
    .to(elem, { duration: 0.25, color: "orange" }, 0)
    .to(
      pereviateContent,
      {
        duration: 1,
        transform:
          window.innerWidth > 960 ? "translateY(-100%)" : "translateX(-100%)",
        autoAlpha: 0,
        ease: "power4.out",
      },
      0
    )
    .to(
      techs,
      { duration: 1, transform: "rotate(0)", opacity: 1, ease: "power4.out" },
      0.3
    )
    .to(
      titles,
      { duration: 1, transform: "rotate(0)", opacity: 1, ease: "power4.out" },
      0.3
    )
    .to(
      relevantContentImg,
      {
        duration: 1,
        transform: "rotate(0)",
        ease: "power4.out",
        filter: "brightness(.8)",
      },
      0
    )
    .to(relevantContent, { duration: 1, zIndex: 3 + i }, 0);
  const imgHover = gsap.to(relevantContentImg, {
    paused: true,
    width: "auto",
    filter: "brightness(1)",
    boxShadow: "0 0 120px rgba(255,255,255,.2)",
  });
  const descHover = gsap.to(relevantContentDesc, {
    paused: true,
    scaleY: 1,
    ease: "power4.out",
    opacity: 1,
  });
  const techHover = gsap.to(techs, {
    duration: 1,
    paused: true,
    left: "-50px",
    transform: "rotate(0)",
    ease: "power4.out",
    opacity: 0,
    transformOrigin: "0 100%",
  });
  const titleHover = gsap.to(titles, {
    duration: 1,
    paused: true,
    left: "50px",
    ease: "power4.out",
    opacity: 0,
    transform: "rotate(0)",
    transformOrigin: "0 100%",
  });
  relevantContentImg.addEventListener("mouseenter", () => {
    imgHover.play();
    descHover.play();
    techHover.play();
    titleHover.play();
  });
  relevantContentImg.addEventListener("mouseleave", () => {
    imgHover.reverse();
    descHover.reverse();
    techHover.reverse();
    titleHover.reverse();
  });
  relevantContentDesc.addEventListener("mouseenter", () => {
    imgHover.play();
    descHover.play();
  });
  relevantContentDesc.addEventListener("mouseleave", () => {
    imgHover.reverse();
    descHover.reverse();
  });
});

let pageNumber = 0; // 섹션 넘버 지정
const scrollThreshold = 2500; // 스크롤 애니메이션 적용 기준 높이
const scrollCountToAnimate = 2; // 애니메이션을 위해 필요한 스크롤 횟수
let scrollCounter = 0; // 스크롤 카운터 초기화

$(window).on("wheel", function (e) {
  if ($("html").is(":animated")) return; // 스크롤 중에는 함수 작동을 멈춤
  const currentScroll = $(window).scrollTop(); // 현재 스크롤 위치

  if (e.originalEvent.deltaY > 0) {
    if (pageNumber >= 5) {
      // 5번째 섹션에서 확 내려가게 설정
      scrollCounter++;
      if (
        scrollCounter >= scrollCountToAnimate &&
        currentScroll >= scrollThreshold
      ) {
        gsap.to(window, {
          scrollTo: { y: document.body.scrollHeight, autoKill: false },
          duration: 1, // 애니메이션 효과를 적용할 수 있는 duration 설정
        });
        scrollCounter = 0; // 카운터 초기화
      }
      return;
    }
    pageNumber++;
  } else if (e.originalEvent.deltaY < 0) {
    if (pageNumber <= 0) return; // 0 이하일 경우 'pageNumber--'를 멈춤
    pageNumber--;
  }

  // 일반적인 스크롤처럼 보이게 하려면 'duration'을 0으로 설정
  gsap.to(window, {
    scrollTo: { y: 300 * pageNumber, autoKill: false },
    duration: currentScroll < scrollThreshold ? 0 : 0.5, // 스크롤 높이에 따라 duration 조절
  });
});
$(document).ready(function () {
  $(".text").on("click", function () {
    // 클릭한 텍스트의 인덱스를 가져옴
    const index = $(this).index();

    // 각 텍스트에 따라 이동할 위치를 설정 (500px, 1000px, ...)
    const scrollTo = (index + 1) * 300; // 1부터 시작하므로 1을 더함

    // 스크롤 애니메이션
    $("html, body").stop().animate(
      {
        scrollTop: scrollTo,
      },
      500
    ); // 애니메이션 duration
  });
});

var showSpan = gsap.timeline();
var showDiv = gsap.timeline();
showSpan.to(".below span", { autoAlpha: 1, y: 0 });
showDiv.to(".below div", { autoAlpha: 1, y: 0 });

ScrollTrigger.create({
  trigger: ".below",
  start: "top center",
  end: "bottom bottom",
  //scrub: 1,
  animation: showSpan,
  toggleActions: "none play none reverse",
});
ScrollTrigger.create({
  trigger: ".below",
  start: "top center",
  end: "bottom bottom",
  //scrub: 1,
  animation: showDiv,
  toggleActions: "none play none reverse",
});

// 페이지가 로드되면 스크롤을 500px로 이동
window.onload = function () {
  window.scrollTo(0, 500);
};

// 스크롤 제한을 위한 이벤트 리스너
window.addEventListener("scroll", () => {
  // 사용자가 500px 이하로 스크롤하려고 할 경우, 500px로 고정
  if (window.scrollY < 300) {
    window.scrollTo(0, 300);
  }
});

// 마퀴 효과 애니메이션 설정
const marqueeContainer = document.getElementById("marquee-container1");
const marqueeContainer2 = document.getElementById("marquee-container2");

if (marqueeContainer) {
  const totalWidth = marqueeContainer.scrollWidth; // 전체 너비

  // 애니메이션 시작
  gsap.set(marqueeContainer, { x: 0 }); // 초기 위치 설정
  gsap.to(marqueeContainer, {
    x: -totalWidth / 2, // 전체 너비의 절반만큼 이동
    duration: totalWidth / 100, // 속도 조절
    ease: "none", // 일정한 속도로 애니메이션
    repeat: -1, // 무한 반복
    onRepeat: () => {
      // 애니메이션 반복될 때마다 위치를 초기화
      gsap.set(marqueeContainer, { x: 0 });
    },
  });
}

if (marqueeContainer2) {
  const totalWidth = marqueeContainer2.scrollWidth; // 전체 너비
  // 애니메이션 시작
  gsap.set(marqueeContainer2, { x: -totalWidth / 2 }); // 초기 위치를 왼쪽으로 설정
  gsap.to(marqueeContainer2, {
    x: 0, // 오른쪽으로 이동
    duration: totalWidth / 100, // 속도 조절
    ease: "none", // 일정한 속도로 애니메이션
    repeat: -1, // 무한 반복
    onRepeat: () => {
      // 애니메이션 반복될 때마다 위치를 초기화
      gsap.set(marqueeContainer2, { x: -totalWidth / 2 });
    },
  });
}
