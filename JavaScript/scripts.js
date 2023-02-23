
//Query Selector para partes principais

let contadorMusicas = document.querySelector(".contador-musicas");
let albumCover = document.querySelector(".album-cover");
let nomeMusica = document.querySelector(".nome-musica");
let nomeArtista = document.querySelector(".nome-artista");


//Query Selector para botoes
let mAleatoria_btn = document.querySelector(".fa-random");
let mAnt_btn = document.querySelector(".fa-step-backward");
let mPlay_btn = document.querySelector(".fa-play-circle");
let mPause_btn = document.querySelector(".fa-pause-circle");
let mProx_btn = document.querySelector(".fa-step-forward");
let mRepete_btn = document.querySelector(".fa-repeat");

//Querry selector sliders e tempo
let sliderProgresso = document.querySelector(".progresso-atual");
let volumeSlider = document.querySelector(".volume-slider");
let tempoAtual = document.querySelector(".tempo-atual");
let tempoTotal = document.querySelector(".duracao-total");
let wave = document.querySelector(".wave");

let curr_track = document.createElement("audio");
let index_track = 0;
let isPlaying = false;
let isRepeat = false;
let isRandom = false;
const music_list = [
    {
        // Time, Pink Floyd
        cover: "/Images/darkside.jpg",
        nome: "Time",
        artista: "Pink Floyd",
        src: "/Music/Time.mp3"
    },
    {
        // Ashes to Ashes, David Bowie
        cover: "/Images/scary-monsters.jpg",
        nome: "Ashes to Ashes",
        artista: "David Bowie",
        src: "/Music/Ashes-to-Ashes.mp3"
    },
    {
        // My iron lung, RadioHead
        cover: "/Images/the-bends.jpg",
        nome: "My Iron Lung",
        artista: "Radiohead",
        src: "/Music/My-iron-lung.mp3"
    },
    {
        // Life on Mars? David Bowie
        cover: "/Images/hunky-dory.jpg",
        nome: "Life on Mars?",
        artista: "David Bowie",
        src: "/Music/Life-on-Mars.mp3"
    }
];

//Carrega a primeira musica do array
carregaMusica(index_track);

contadorMusicas.textContent = "Musica " + (index_track +1) + " de " + music_list.length; 
//Botões
mPlay_btn.addEventListener("click", playMusic);
mPause_btn.addEventListener("click", pauseMusic);
curr_track.addEventListener("timeupdate", atualizarBarra);
mRepete_btn.addEventListener("click", () =>{
    let guardaMusica = index_track;
    if (isRepeat = false) {
        isRepeat = true;
        mRepete_btn.classList.add("RRAtivado");
        curr_track.addEventListener("ended", () =>{
            index_track = guardaMusica;
        });
    } else{
        isRepeat=false;
        mRepete_btn.classList.remove("RRAtivado");
    }
})
curr_track.addEventListener("ended", proxMusica);

mProx_btn.addEventListener("click", proxMusica);

mAnt_btn.addEventListener("click", musicaAnterior);

volumeSlider.addEventListener("change", () => {
    curr_track.volume = volumeSlider.value/100;
})

mAleatoria_btn.addEventListener("click", () =>{
    if (isRandom ===false) {
        isRandom = true;
        mAleatoria_btn.classList.add("RRAtivado");

    } else {
        isRandom = false;
        mAleatoria_btn.classList.remove("RRAtivado");
    }
});



//Funções

function proxMusica() {
    index_track++;
    if (index_track > music_list.length - 1){
        index_track = 0;
    }
    carregaMusica(index_track);
    playMusic();
}
function musicaAnterior(){
    index_track--;
    if (index_track < 0) {
        index_track++;
    }
    carregaMusica(index_track);
    playMusic();
}

function carregaMusica(index){
    curr_track.setAttribute("src", music_list[index].src);
    curr_track.addEventListener("loadeddata", () => {
        nomeMusica.textContent = music_list[index].nome;
        nomeArtista.textContent = music_list[index].artista;
        albumCover.style.backgroundImage =`url(${music_list[index].cover})`;
    });
}


function pauseMusic(){
    curr_track.pause();
    isPlaying = false;
    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "block";
    albumCover.classList.remove("rotacionar");
}
function playMusic(){
    curr_track.play();
    isPlaying = true;
    document.getElementById("pause").style.display = "block";
    document.getElementById("play").style.display = "none";
    albumCover.classList.add("rotacionar");
}

function atualizarBarra(){
    sliderProgresso.value = ((curr_track.currentTime/ curr_track.duration) * 100);
    tempoAtual.textContent = converteMin(Math.floor(curr_track.currentTime));
    
    tempoTotal.textContent = converteMin(Math.floor(curr_track.duration));
}

function converteMin(segundos){
    let campoMin = Math.floor(segundos/60);
    let campoSeg = segundos%60;
    if (campoSeg < 10) {
        campoSeg =  "0" + campoSeg;
    }

    return campoMin + ":" + campoSeg;
}
