
//Query Selector para partes principais

const body = document.querySelector(".body");

let contadorMusicas = document.querySelector(".contador-musicas");
let albumCover = document.querySelector(".album-cover");
let nomeMusica = document.querySelector(".nome-musica");
let nomeArtista = document.querySelector(".nome-artista");


//Query Selector para botoes
let mPlayPause_btn = document.querySelector(".m-play-pause botao");
let mProx_btn = document.querySelector(".m-proxima botao");
let mAnt_btn = document.querySelector(".m-anterior botao");
let mRepete_btn = document.querySelector(".m-repetir botao");
let mAleatoria_btn = document.querySelector(".m-aleatoria botao");

let apareceSlider = document.querySelector(".aparecer-slider");
let volumeSlider = document.querySelector(".volume-slider");
let tempoAtual = document.querySelector(".tempo-atual");
let tempoTotal = document.querySelector(".duracao-total");
let wave = document.querySelector(".wave");

let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

//Array de objetos com cada musica
const music_list = [
    {
        // Time, Pink Floyd
        cover: "/Images/darkside.jpg",
        nome: "Time",
        artista: "Pink Floyd",
        audio: "/Music/Time.mp3",
        corFundo: "#1c1c1d"
    },
    {
        // Ashes to Ashes, David Bowie
        cover: "/Images/scary-monsters.jpg",
        nome: "Ashes to Ashes",
        artista: "David Bowie",
        audio: "/Music/Ashes-to-Ashes.mp3",
        corFundo: "#4d4947"
    },
    {
        // My iron lung, RadioHead
        cover: "/Images/the-bends.jpg",
        nome: "My Iron Lung",
        artista: "Radiohead",
        audio: "/Music/My-iron-lung.mp3",
        corFundo: "#41352c"
    },
    {
        // Life on Mars? David Bowie
        cover: "/Images/hunky-dory.jpg",
        nome: "Life on Mars?",
        artista: "David Bowie",
        audio: "/Music/Life-on-Mars.mp3",
        corFundo: "#485040"
    }
];

function reset(){
    tempoAtual.textContent = "00:00";
    tempoTotal.textContent = "00:00";
    apareceSlider.value = 0;

}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition =curr_track.currentTime * (100/curr_track.duration);
        apareceSlider.value = seekPosition;

        let currentMinutos = Math.floor(curr_track.currentTime /60);
        let currentSegundos = Math.floor(curr_track.currentTime - currentMinutos * 60);
        let durationMinutos = Math.floor(curr_track.duration /60);
        let durationSegundos = Math.floor(curr_track.duration - durationMinutos * 60);

        if(currentSegundos < 10) {
            durationSegundos = "0" + durationSegundos;
        }
        if(durationSegundos < 10) {
            durationSegundos  = "0" + durationSegundos;
        }
        if (currentMinutes < 10) {
            currentMinutos = "0" + currentMinutos;
        }
        if (durationMinutos < 10) {
            durationMinutos = "0" + durationMinutos;
        }
    }
}
loadTrack(trackIndex);
function loadTrack(trackIndex){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[trackIndex].audio;
    curr_track.load();

    albumCover.style.backgroundImage = `url(${music_list[trackIndex].cover})`;
    nomeMusica.textContent  = music_list[trackIndex].nome;
    nomeArtista.textContent  = music_list[trackIndex].artista;
    contadorMusicas.textContent = "Tocando musica " + (trackIndex+1) + " de " + music_list.length;
    
    updateTimer = setInterval(setUpdate(), 1000);

    curr_track.addEventListener("ended", mProxima());
    body.style.backgroundColor = music_list[trackIndex].corFundo;
}



function playRandom(){
    isRandom = true;
    randomIcon.classList.toggle("randomAtivado");
}
function pauseRandom(){
    isRandom =false;
    randomIcon.classList.toggle("randomActive");
}

function repeatTrack() {
    let current_index = trackIndex;
    loadTrack(current_index);
    playTrack();
}
function randomSong(){
    if(isRandom=== true) {
        pauseRandom();
    } else {
        playRandom();
    }
}

function pauseTrack(){
    curr_track.pause();
    isPlaying=false;
    albumCover.classList.remove("rotacionar");
    wave.classList.remove("loader");
    mPlayPause_btn.innerHTML = "<i class = 'fa fa-play-circle fa-3x'></i>";


}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    albumCover.classList.add("rotacionar");
    wave.classList.add("loader");
    mPlayPause_btn.innerHTML = "<i class = 'fa fa-pause-circle fa-3x'></i>";
}

function playPause(){
    if(isPlaying === true) {
        pauseTrack()
    } else {
        playTrack()
    }
}

function mProxima() {
    if(trackIndex < music_list.length - 1 && isRandom === false) {
        trackIndex +=1;
    } else if(trackIndex < music_list.length-1 && isRandom ===true) {
        let random_index = Number.parseInt(Math.random() * music_list.length)
        trackIndex = random_index;
    } else {
        trackIndex = 0;
    }
    loadTrack(trackIndex);
    playTrack();
}
function mAnterior() {

    if(trackIndex > 0) {
        trackIndex +=1;

    } else {
        trackIndex = music_list.length -1;
    }
    loadTrack(trackIndex);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (apareceSlider.value/100);
    curr_track.tempoAtual = seekto;
}

function setVolume(){
    curr_track.volume = volumeSlider.value /100;
}