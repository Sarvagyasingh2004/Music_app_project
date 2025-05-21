const songs = [
  {
    title: "Lawrence",
    artist: "TrackTribe",
    img: "images/song1.jpg",
    file: "music/song1.mp3",
  },
  {
    title: "Inconsciousness",
    artist: "Mini Vandals",
    img: "images/song2.jpg",
    file: "music/song2.mp3",
  },
  {
    title: "Boom Bap Flick",
    artist: "Quincas Moreira",
    img: "images/song3.jpg",
    file: "music/song3.mp3",
  },
];

const backGroundElement = document.querySelector(".bcg-blur");
const audioElement = document.querySelector("#audio-player");
const songInfoElement = document.querySelector(".songInfoBlock");
const progressBarElement = document.querySelector(".progress-bar");
const audioPlayerElement = document.querySelector(".player");
const prevButtonElement = document.querySelector("#prevButton");
const playPauseButtonElement = document.querySelector("#play-pause-button");
const nextButtonElement = document.querySelector("#nextButton");
const songImgElement = document.querySelector(".songImg");
const progressElement = document.querySelector(".progress");

let isPlaying = false;
let currIndex = 0;

prevButtonElement.addEventListener("click", () => {
  currIndex = (currIndex - 1 + songs.length) % songs.length;
  handleSongInfo();
  progressElement.style.width = "0%";
});

playPauseButtonElement.addEventListener("click", () => {
  //   handleSongInfo();
  checkisPlaying();
});

nextButtonElement.addEventListener("click", () => {
  currIndex = (currIndex + 1) % songs.length;
  handleSongInfo();
  progressElement.style.width = "0%";
});

audioElement.addEventListener("ended", () => {
  currIndex = (currIndex + 1) % songs.length;
  handleSongInfo();
});

audioElement.addEventListener("timeupdate", () => {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;
  const progressWidth = (currentTime / duration) * 100 + "%";
  progressElement.style.width = progressWidth;
});

progressBarElement.addEventListener("click", (e) => {
  const progressBarElementRect = progressBarElement.getBoundingClientRect();
  const clickX = e.clientX - progressBarElementRect.left;
  const progressBarElementWidth = progressBarElementRect.width;
  const seekTime = (clickX / progressBarElementWidth) * audioElement.duration;
  audioElement.currentTime = seekTime;
});

const checkisPlaying = () => {
  if (isPlaying) {
    audioElement.pause();
    isPlaying = false;
    playPauseButtonElement.innerHTML = `<ion-icon name="play"></ion-icon>`;
  } else {
    audioElement.play();
    isPlaying = true;
    playPauseButtonElement.innerHTML = `<ion-icon name="pause"></ion-icon>`;
  }
};

const handleSongInfo = () => {
  backGroundElement.style.backGroundImage = songs[currIndex].img;
  songInfoElement.children[0].textContent = songs[currIndex].title;
  songInfoElement.children[1].textContent = songs[currIndex].artist;
  songImgElement.children[0].src = songs[currIndex].img;
  audioPlayerElement.children[0].src = songs[currIndex].file;
  backGroundElement.children[0].src = songs[currIndex].img;
  if (isPlaying) audioElement.play();
  else audioElement.pause();
};

handleSongInfo();
