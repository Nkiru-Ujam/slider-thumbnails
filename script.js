"use strict";

const sliderCont = document.querySelector(".slider-cont");
const sliderImages = document.querySelectorAll(".slider-image");

const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

const thumbnailCont = document.querySelector(".thumbnail-cont");
const dottedWrapper = document.querySelector(".dotted-wrapper");

let createdElement = [];
let thumbnailImages = [];
console.log(sliderCont, sliderImages, prevBtn, nextBtn);

let currentSlide = 0;

function showSlides() {
  if (currentSlide === sliderImages.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  sliderImages.forEach((image) => {
    image.style.transform = `translateX(-${currentSlide * 100}%)`;
  });

  updateThumbnail();
}

function prevSlide() {
  if (currentSlide === 0) return;

  currentSlide -= 1;

  sliderImages.forEach((image) => {
    image.style.transform = `translateX(-${currentSlide * 100}%)`;
    // console.log(image);
  });
}

function mapArray() {
  sliderImages.forEach((_, i) => createDot(i));
}

mapArray();

function createDot(index) {
  let element = document.createElement("div");

  if (index === 0) {
    element.style.backgroundColor = "white";
  }

  element.setAttribute("class", "dot");

  element.addEventListener("click", () => {
    currentSlide = index - 1;

    showSlides();
    displayActive();
  });

  dottedWrapper.appendChild(element);
  createdElement.push(element);
  // console.log(element);
}

function displayActive() {
  createdElement.forEach((element, i) => {
    if (currentSlide === i) {
      element.style.backgroundColor = "white";
    } else {
      element.style.backgroundColor = "rgba(0,0,0,0.476)";
    }
  });
}

function createThumbnail() {
  sliderImages.forEach((image, i) => {
    const imageSrc = image.querySelector("img");
    // console.log(imageSrc);
    let thumbnailImage = document.createElement("img");
    thumbnailImage.src = imageSrc.src;
    thumbnailImage.setAttribute("class", "thumbImg");
    // console.log(thumbnailImage.src);
    if (i === 0) {
      thumbnailImage.classList.add("active");
    }

    thumbnailImage.addEventListener("click", () => {
      currentSlide = i - 1;
      showSlides();
      displayActive();
    });

    thumbnailCont.appendChild(thumbnailImage);
    thumbnailImages.push(thumbnailImage);
  });
}

createThumbnail();

function updateThumbnail() {
  thumbnailImages.forEach((thumbnail, i) => {
    if (currentSlide === i) {
      thumbnail.classList.add("active");
    } else {
      thumbnail.classList.remove("active");
    }
  });
}

function watchDot() {
  showSlides();
  displayActive();
}

function watchPrev() {
  prevSlide();
  displayActive();
}

prevBtn.addEventListener("click", watchPrev);

nextBtn.addEventListener("click", watchDot);

setInterval(watchDot, 3000);
