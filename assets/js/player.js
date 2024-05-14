let x = document.querySelector('#myAudio');

function playAudio() {
  let playAudio = document.querySelector('#playPause')
  if (playAudio.classList.value === 'bi bi-play-circle-fill') {
    x.play();
    playAudio.classList.value = 'bi bi-pause-circle-fill'
    return
  }
  if (playAudio.classList.value === 'bi bi-pause-circle-fill') {
    x.pause();
    playAudio.classList.value = 'bi bi-play-circle-fill'
    return
  }
}


function playAudioAlbum() {
  let playAudio = document.querySelector('#playPauseNew')
  if (playAudio.classList.value === 'bi bi-play-circle-fill mx-4') {
    localStorage.setItem('idAlbum', localStorage.getItem('idAlbumAperto'))
    localStorage.setItem('trackNumber', "0")
    localStorage.setItem('audioCurrentTime', "0")
    let playAudioOld = document.querySelector('#playPause')
    grepAlbum("albumNew")
    playAudioOld.classList.value = 'bi bi-play-circle-fill'
    playAudio.classList = 'bi bi-pause-circle-fill mx-4'
    x.play();



    return
  }
  if (playAudio.classList.value === 'bi bi-pause-circle-fill mx-4') {
    x.pause();
    playAudio.classList.value = 'bi bi-play-circle-fill mx-4'
    return
  }
}

const fac = new FastAverageColor();
let mediaRisultato = null;
let coloreSecondario = null;
let gradienteCSS = null;
let gradienteCSSNew = null;

async function prendiMedia(immagineInput) {
  await fac.getColorAsync(immagineInput)
    .then(color => {
      if (isColorLight(color)) {
        // Imposta un colore di default se il colore è troppo chiaro
        mediaRisultato = 'rgba(108,105,103,1)';
        console.log("scelto default");
      } else {
        mediaRisultato = color.rgba;
        coloreSecondario = mediaRisultato;
        gradienteCSS = creaGradiente(coloreSecondario);
        gradienteCSSNew = creaGradienteRgba(coloreSecondario)
        console.log("esghereeeee " + gradienteCSSNew);
      }
    })
    .catch(e => {
      console.log(e);
    });
  console.log(mediaRisultato);
}

function isColorLight(color) {
  const luminance = (0.299 * color.value[0]) + (0.587 * color.value[1]) + (0.114 * color.value[2]);
  // Soglia di luminanza, regolabile a seconda delle esigenze
  return luminance > 186;
}


function creaGradienteRgba(coloreTerziario) {
  // Colore primario fisso
  const colorePrimario = 'rgba(18, 18, 18, 1)';
  const stopPrimario = 19;

  // Colore intermedio
  const coloreIntermedio = 'rgba(39, 35, 22, 1)';
  const stopIntermedio = 46;

  // Colore terziario fornito come input, con stop fisso
  const stopTerziario = 83;

  return `background: linear-gradient(0deg, ${colorePrimario} ${stopPrimario}%, ${coloreIntermedio} ${stopIntermedio}%, ${coloreTerziario} ${stopTerziario}%);`;
}

// Esempio di utilizzo
// let coloreTerziario = 'rgba(91, 78, 32, 1)'; // Colore terziario in formato rgba
// let gradienteCSSNew = creaGradienteRgba(coloreTerziario);
// console.log(gradienteCSSNew + " maresciaaaaa");



if (!localStorage.getItem('trackNumber')) {
  localStorage.setItem('trackNumber', "0")
  localStorage.setItem('idAlbum', "230935602")
  let playAudio = document.querySelector('#playPause')
  x.pause();
  playAudio.classList.value = 'bi bi-pause-circle-fill'
  grepAlbum()
} else {
  let playAudio = document.querySelector('#playPause')
  x.pause();
  playAudio.classList.value = 'bi bi-pause-circle-fill'
  grepAlbum()
}


document.querySelector('body').addEventListener('click', (e) => {
  let idNascostoAlbum = document.querySelector('#idNascostoPlayAlbumGrande').innerText
  if (e.target.id === 'playButtonAlbumGrande') {
    // console.log(idNascostoAlbum);
    localStorage.setItem('trackNumber', "0")
    localStorage.setItem('idAlbum', idNascostoAlbum)
    let playAudio = document.querySelector('#playPause')
    grepAlbum("playButtonAlbumGrande")
    playAudio.classList.value = 'bi bi-play-circle-fill'
    x.play();

  }

  if (e.target.id === 'vaiAvanti') {
    let jsonNew = JSON.parse(localStorage.getItem('oggettoString'));
    let lastTrack = jsonNew.tracks.data.length - 1;
    if (+localStorage.getItem('trackNumber') >= lastTrack) {
      localStorage.setItem('trackNumber', "0");
      playAudio()
      grepAlbum('skip')
      return
    }
    let avanti = +localStorage.getItem('trackNumber') + 1
    localStorage.setItem('trackNumber', avanti)
    playAudio()
    grepAlbum('skip')
  }

  if (e.target.id === 'vaiIndietro') {
    let jsonNew = JSON.parse(localStorage.getItem('oggettoString'));
    let lastTrack = jsonNew.tracks.data.length - 1;
    if (+localStorage.getItem('trackNumber') == 0) {
      localStorage.setItem('trackNumber', lastTrack);
      playAudio()
      grepAlbum('skip')
      return
    }
    let indietro = +localStorage.getItem('trackNumber') - 1
    localStorage.setItem('trackNumber', indietro)
    playAudio()
    grepAlbum('skip')
  }

  // if(e.target.classList.value === 'card-body generati-01' || e.target.classList.value === 'card-text generati-01' || e.target.classList.value === 'card-title generati-01' || e.target.classList.value === 'card-img-top p-4 img-fluid generati-01') {
  //   console.log("weweee");
  // }
  if (e.target.classList.value === 'card-img-top p-4 img-fluid generati-01') {
    let idNascostoAlbum = e.target.parentNode.childNodes[3].childNodes[5].innerText;
    localStorage.setItem('idAlbumAperto', idNascostoAlbum);
    chiudiTuttoMettiAlbum()
    return
    // if(idNascostoAlbum !== localStorage.getItem('idAlbum')){
    // localStorage.setItem('trackNumber', "0");
    // let playAudio = document.querySelector('#playPause');
    // grepAlbum("albumDinamici");
    // playAudio.classList.value = 'bi bi-play-circle-fill';
    // x.play();
    // }
  }

  if (e.target.classList.value === 'img-fluid rounded-start p-4') {
    // console.log(e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[7].innerText);
    let idNascostoAlbum = e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[7].innerText;
    localStorage.setItem('idAlbumAperto', idNascostoAlbum);
    chiudiTuttoMettiAlbum()
    return
  }


    if(e.target.id === 'artistIndex') {
      let idNascostoArtist = e.target.parentNode.childNodes[9].innerText;
      console.log(idNascostoArtist)
      chiudiTuttoMettiArtist(idNascostoArtist, 'homePage');
    }
   

})


async function grepAlbum(provenienza) {
  let divPlayer = document.querySelector('#player');
  let copertinaAlbum = divPlayer.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
  let titoloCanzone = document.querySelector('#titoloCanzonePlayer')
  let artisti = document.querySelector('#titoloArtistiPlayer')
  let sourceAudio = document.querySelector('#myAudio')
  let Url = `https://striveschool-api.herokuapp.com/api/deezer/album/${localStorage.getItem('idAlbum')}`
  let oggettoJson = null;
  await fetch(Url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.35.0"
    }
  }).then(response => response.json())
    .then(json => oggettoJson = json)
    .catch(error => console.log(error))

  // console.log(oggettoJson);
  copertinaAlbum.setAttribute("src", oggettoJson.cover_medium)
  if (oggettoJson.tracks.data[localStorage.getItem('trackNumber')].title_short.length <= 24) {
    titoloCanzone.innerText = oggettoJson.tracks.data[localStorage.getItem('trackNumber')].title_short
  } else {
    titoloCanzone.innerText = oggettoJson.tracks.data[localStorage.getItem('trackNumber')].title_short.substring(0, 23) + "..."
  }
  artisti.innerText = oggettoJson.artist.name
  sourceAudio.setAttribute("src", oggettoJson.tracks.data[localStorage.getItem('trackNumber')].preview)
  let oggettoString = JSON.stringify(oggettoJson)
  localStorage.setItem('oggettoString', oggettoString)
  // console.log(oggettoJson);
  let audio = document.getElementById('myAudio');
  let tempoSalvato = localStorage.getItem('audioCurrentTime');
  if (tempoSalvato) {
    if (provenienza == "playButtonAlbumGrande" || provenienza == "albumDinamici" || provenienza == "skip") {
      localStorage.setItem('audioCurrentTime', "0");
    } else {
      audio.currentTime = parseFloat(tempoSalvato);
      console.log(provenienza)
    }
  }

  // if(provenienza !== 'albumNew'){
  playAudio()
  // }
}

function dimmiGianluca() {

  let divPlayer = document.querySelector('#player');
  let copertinaAlbum = divPlayer.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
  let titoloCanzone = document.querySelector('#titoloCanzonePlayer')
  let artisti = document.querySelector('#titoloArtistiPlayer')
  let sourceAudio = document.querySelector('#myAudio')
  copertinaAlbum.setAttribute("src", "assets/imgs/main/40.png")
  titoloCanzone.innerText = "Andiamo a fleXare with Gianluca 40"
  artisti.innerText = "Gianluca Forty"
  sourceAudio.setAttribute("src", "assets/audio/dimmi-gianluca.mp3")
  localStorage.setItem('trackNumber', "0")
  playAudio()

}

function tribalAcidHouse() {

  let divPlayer = document.querySelector('#player');
  let copertinaAlbum = divPlayer.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
  let titoloCanzone = document.querySelector('#titoloCanzonePlayer')
  let artisti = document.querySelector('#titoloArtistiPlayer')
  let sourceAudio = document.querySelector('#myAudio')
  copertinaAlbum.setAttribute("src", "assets/imgs/main/acid-house.png")
  titoloCanzone.innerText = "Tribal House"
  artisti.innerText = "R. Sanchez, Joe T. Vannelli, C. Coccoluto"
  sourceAudio.setAttribute("src", "assets/audio/tribal-acid-house.mp3")
  localStorage.setItem('trackNumber', "0")
  playAudio()

}


function dankMaurizio() {

  let divPlayer = document.querySelector('#player');
  let copertinaAlbum = divPlayer.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
  let titoloCanzone = document.querySelector('#titoloCanzonePlayer')
  let artisti = document.querySelector('#titoloArtistiPlayer')
  let sourceAudio = document.querySelector('#myAudio')
  copertinaAlbum.setAttribute("src", "assets/imgs/main/costanzo.png")
  titoloCanzone.innerText = "State Boni Lo-fi"
  artisti.innerText = "Maurizio Kostanzo"
  sourceAudio.setAttribute("src", "assets/audio/dank-maurizio.mp3")
  localStorage.setItem('trackNumber', "0")
  playAudio()

}

// richiamo funzioni sotto
sliderPlayer()
controlloVolume()


function sliderPlayer() {
  let audio = document.getElementById("myAudio");
  let currentStart = document.getElementById("currentStart");
  let currentEnd = document.getElementById("currentEnd");
  let statusBar = document.querySelector(".slider-progress");

  audio.ontimeupdate = function () {
    if (isFinite(audio.duration)) {
      let percentuale = (audio.currentTime / audio.duration) * 100;
      statusBar.value = percentuale;

      currentStart.textContent = convertiSecondiInMinuti(audio.currentTime);
      currentEnd.textContent = convertiSecondiInMinuti(audio.duration);

      // Controllo per passare alla prossima traccia
      if (percentuale >= 99.9) {
        vaiAllaProssimaTraccia();
      }
    }
  };

  // Funzione per convertire i secondi in formato minuti:secondi
  function convertiSecondiInMinuti(secondi) {
    let min = Math.floor(secondi / 60);
    let sec = Math.floor(secondi % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  // Aggiungi un listener per quando l'utente cambia la posizione della status bar
  statusBar.addEventListener('input', function () {
    let durata = audio.duration;
    let valore = statusBar.value;
    audio.currentTime = (valore / 100) * durata;
  });

}


function controlloVolume() {
  document.addEventListener('DOMContentLoaded', function () {
    let audio = document.getElementById('myAudio');
    let controlloVolume = document.getElementById('controlloVolume');

    audio.volume = controlloVolume.value / 100;

    controlloVolume.addEventListener('input', function () {
      audio.volume = this.value / 100;
    });


  });

}

function salvaTempoCorrenteAudio() {
  let audio = document.getElementById("myAudio");

  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem('audioCurrentTime', audio.currentTime);
    }
  }, 300);
}

document.addEventListener('DOMContentLoaded', function () {
  salvaTempoCorrenteAudio();
  let audio = document.getElementById('myAudio');
  let tempoSalvato = localStorage.getItem('audioCurrentTime');
  if (tempoSalvato) {
    audio.currentTime = parseFloat(tempoSalvato);
  }
});


function vaiAllaProssimaTraccia() {
  let jsonNew = JSON.parse(localStorage.getItem('oggettoString'));
  let trackNumber = +localStorage.getItem('trackNumber');
  let lastTrack = jsonNew.tracks.data.length - 1;

  if (trackNumber < lastTrack) {
    localStorage.setItem('trackNumber', trackNumber + 1);
  } else {
    localStorage.setItem('trackNumber', "0"); // Ritorna alla prima traccia o gestisci come preferisci
  }

  grepAlbum('skip');
  playAudio();
}


async function chiudiTuttoMettiAlbum() {
  let Url = `https://striveschool-api.herokuapp.com/api/deezer/album/${localStorage.getItem('idAlbumAperto')}`
  let oggettoJson = null;
  await fetch(Url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.35.0"
    }
  }).then(response => response.json())
    .then(json => oggettoJson = json)
    .catch(error => console.log(error))

  // console.log(oggettoJson);

  let tuttiDivCanzoni = document.createElement('div');
  tuttiDivCanzoni.classList = 'contieneTutteLeCanzoni'
  tuttiDivCanzoni.style = 'padding-bottom: 7rem; margin-right: 1.5rem;'

  let canzoniTotali = +oggettoJson.nb_tracks

  for (i = 0; i < canzoniTotali; i++) {
    let numsong = i + 1;
    let divSingolaCanzone = document.createElement('div');
    divSingolaCanzone.classList = 'row text-light my-2';
    divSingolaCanzone.innerHTML = `
          <div class="col-1 text-end align-self-center">${numsong}</div>
          <div class="col-5 align-self-center">
              <h5 class="m-0">${oggettoJson.tracks.data[i].title_short}</h5>
              <p class="m-0">${oggettoJson.tracks.data[i].artist.name}</p>
          </div>
          <div class="col-4 text-end">${oggettoJson.tracks.data[i].rank}</div>
          <div class="col-2 text-end">${durataCanzone(oggettoJson.tracks.data[i].duration)}</div>
    `
    tuttiDivCanzoni.appendChild(divSingolaCanzone);
  }

  //  console.log(object); 
  let classeH1 = null;
  if (+oggettoJson.title.length > 20) {
    classeH1 = 'titoloAlbumNewLungo'
  } else {
    classeH1 = 'titoloAlbumNew'
  }

  let immagineFantoccio = document.createElement('img');
  immagineFantoccio.classList = 'fantoccio d-none';
  immagineFantoccio.setAttribute('src', oggettoJson.cover_big);
  immagineFantoccio.setAttribute('crossorigin', 'anonymous');

  document.querySelector('#annamoBene').appendChild(immagineFantoccio)
  let fantoccioDaPrendere = document.querySelector('.fantoccio');
  await prendiMedia(fantoccioDaPrendere);
  console.log(prendiMedia);



  let corpoHome = document.querySelector('#corpo');
  corpoHome.classList.add('d-none')
  let corpoAlbum = document.createElement('div');
  corpoAlbum.id = 'corpoAlbum'
  corpoAlbum.classList = 'col overflow-scroll px-0 mx-0'
  corpoAlbum.style.cssText = gradienteCSS;

  let cuore = null;

  let preferitiFormatoObj = JSON.parse(localStorage.getItem('albumPreferiti'));


  if (preferitiFormatoObj.id.includes(oggettoJson.id.toString())) {
    console.log("è dentro i preferiti");
    cuore = 'bi bi-suit-heart-fill'
  } else {
    console.log("non è dentro i preferiti");
    cuore = 'bi bi-suit-heart'
  }



  // console.log(gradienteCSS + " yahoo");
  corpoAlbum.innerHTML = `
  <!-- Frecce e profilo -->
  <div class="row d-flex align-items-center m-3">
      <div class="col" id="freccieCambioAlbumGrande">
          <i class="bi bi-chevron-left" id="leftAlbum"></i>
      </div>

      <div id="nomeUtenteAlbum" class="col text-end">
          <button class="btn btn-secondary p-0 px-2 rounded-5 propicAttivita" type="button">
              <img src="assets/imgs/main/pamy.png" alt="propic"> <span class="mt-2">Pamela Bianchettini
              <i class="bi bi-plus"></i></span>
          </button>
      </div>
  </div>

  <!-- Banner -->
  <div id="bannerPrincipaleAlbumAlbum" class="row">
      <div class="col">
          <div class="card bg-transparent border-0 text-white mb-3">
              <div class="row g-0">
                  <div class="col-md-4 ps-4">
                      <img crossorigin="anonymous" src="${oggettoJson.cover_big}"
                          class="img-fluid rounded-start shadow-lg mb-4" alt="...">
                  </div>
                  <div class="col-md-8 d-flex align-items-end">
                      <div class="card-body p-4 fw-bold">
                          <span>ALBUM</span>
                          <h1 class="card-title ${classeH1}">${oggettoJson.title}</h1>
                          <span id="idNascostoPlayAlbumGrandeNew" class="d-none">${oggettoJson.id}</span>
                          <div class="albumInfoNew">
                              <span><img src="${oggettoJson.artist.picture_small}" class="rounded-circle propicArtist" alt="Immagine Artista"></span>
                              <span class="artistaAlbumNew">${oggettoJson.artist.name}</span>
                              <span class="annoAlbumNew"> &centerdot; ${oggettoJson.release_date.substring(0, 4)} &centerdot; </span>
                              <span class="braniAlbumNew">${oggettoJson.nb_tracks} brani,</span>
                              <span class="durataAlbumNew">${formatDuration(oggettoJson.duration)}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div id="corpoBassoConCanzoni" class="row corpoAlbumNew">
      <!-- Row pulsanti -->
      <div class="row mb-3">
          <div class="col fs-4 d-flex align-items-center">
              <a href="#" id="playPauseNew" class="bi bi-play-circle-fill mx-4"></a>
              <i id='cuoreAlbum' class="${cuore}"></i>
              <i class="bi bi-arrow-down-circle mx-3"></i>
              <i class="bi bi-three-dots"></i>
          </div>
      </div>

      <div id="albumInfo" class="row fw-bold pt-3 mb-3">
          <div class="col-1 text-end">#</div>
          <div class="col-5">TITOLO</div>
          <div class="col-4 text-end">RIPRODUZIONI</div>
          <div class="col-2 text-end"><i class="bi bi-clock"></i></div>
      </div>

      <hr class="ms-4" style="margin: auto!important; width: 95%!important;">
      <div id="doveAppendereCanzoni">
  </div>
  
  `
  corpo.parentNode.insertBefore(corpoAlbum, corpo.nextSibling)
  document.querySelector('#doveAppendereCanzoni').appendChild(tuttiDivCanzoni)
  // let divCanzoniInBasso = document.querySelector('#corpoBassoConCanzoni')
  // divCanzoniInBasso.style.cssText = gradienteCSSNew;
  // console.log(gradienteCSSNew + " mulinobianco");
  if (fantoccioDaPrendere) {
    fantoccioDaPrendere.remove();
  }

  document.querySelector('#nomeUtenteAlbum button').addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nome utente");
    let colonnaDestra = document.querySelector('#activity');
    let segno = document.querySelector('#nomeUtenteAlbum button i')
    console.log(segno.classList.value);

    if (segno.classList.value == "bi bi-plus") {
      colonnaDestra.classList.remove('d-none')
      segno.classList = 'bi bi-dash-lg';
    } else if (segno.classList.value == "bi bi-dash-lg") {
      colonnaDestra.classList.add('d-none')
      segno.classList = 'bi bi-plus';
    }
  })

  document.querySelector('#leftAlbum').addEventListener('click', (e) => {
    // console.log("ciao left album");
    tornaAllaHomePage()
    return
  })

  document.querySelector('#playPauseNew').addEventListener('click', (e) => {

    playAudioAlbum()
  })

  document.querySelector('#cuoreAlbum').addEventListener('click', (e) => {
    console.log(e.target.classList.value);
    if (e.target.classList.value == 'bi bi-suit-heart') {
      e.target.classList = 'bi bi-suit-heart-fill'
      let preferitiObj = JSON.parse(localStorage.getItem('albumPreferiti'));
      let albumDaAggiungere = document.querySelector('#idNascostoPlayAlbumGrandeNew').innerText
      preferitiObj.id.push(albumDaAggiungere)
      localStorage.setItem('albumPreferiti', JSON.stringify(preferitiObj))
      return
    }
    if (e.target.classList.value == 'bi bi-suit-heart-fill') {
      e.target.classList = 'bi bi-suit-heart';

      let preferitiObj = JSON.parse(localStorage.getItem('albumPreferiti'));
      let albumDaAggiungere = document.querySelector('#idNascostoPlayAlbumGrandeNew').innerText
      preferitiObj.id = preferitiObj.id.filter(id => id !== albumDaAggiungere);
      localStorage.setItem('albumPreferiti', JSON.stringify(preferitiObj))
      return

    }
  })


}



function tornaAllaHomePage(provenienza) {
  let albumPage = null;
  if(provenienza == 'artistPage') {
    albumPage = document.querySelector('#corpoArtist');
  } else {
    albumPage = document.querySelector('#corpoAlbum');
  }

  if (albumPage) {
    console.log(albumPage);
    albumPage.remove();
  }
  let corpoHome = document.querySelector('#corpo');
  corpoHome.classList.remove('d-none');
  return
}


function formatDuration(seconds) {
  const minuti = Math.floor(+seconds / 60);
  const secondi = +seconds % 60;
  return `${minuti} min ${secondi} sec.`;
}

function durataCanzone(seconds) {
  let minuti = Math.floor(seconds / 60).toString();
  let secondi = (seconds % 60).toString();

  // minuti = minuti.padStart(2, '0');
  secondi = secondi.padStart(2, '0');

  return `${minuti}:${secondi}`;
}


function creaGradiente(coloreSecondario) {
  const colorePrincipale = 'rgba(91, 78, 32, 1)'; // Colore principale fisso
  const stopPrincipale = 24;  // Stop fisso per il colore principale
  const stopSecondario = 83;  // Stop fisso per il colore secondario

  return `background: linear-gradient(0deg, ${colorePrincipale} ${stopPrincipale}%, ${coloreSecondario} ${stopSecondario}%);`;
}

// Esempio di utilizzo
// let coloreSecondario = 'rgba(204, 177, 73, 1)'; // Colore secondario in formato rgba
// let gradienteCSS = creaGradiente(coloreSecondario);
// console.log("gradiente:  " +gradienteCSS);


async function chiudiTuttoMettiArtist(argomentoIdArtist, provenienza) {

  let Url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${argomentoIdArtist}`
  let oggettoJson = null;
  await fetch(Url, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.35.0"
      }
      }).then(response => response.json())
      .then(json => oggettoJson = json)
      .catch(error => console.log(error))
   
      let UrlTracklist = `https://striveschool-api.herokuapp.com/api/deezer/artist/${argomentoIdArtist}/top?limit=5`
      let oggettoJsonTrackList = null;
      await fetch(UrlTracklist, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "User-Agent": "PostmanRuntime/7.35.0"
          }
          }).then(response => response.json())
          .then(json => oggettoJsonTrackList = json)
          .catch(error => console.log(error))

  console.log("labamba  " + oggettoJsonTrackList.data[1].id);
  let tutteCanzoniPopolari = document.createElement('div');

  let braniPopolari = 5
  
  for(i = 0; i < braniPopolari; i++) {
    let numsong = i + 1;
    let divSingolaCanzone = document.createElement('div');
    divSingolaCanzone.classList = 'row text-light my-2';
    divSingolaCanzone.innerHTML = `

    <div class="col-1 text-end align-self-center">${numsong}</div>
     <img id="artistPicSong" src="${oggettoJsonTrackList.data[i].album.cover_small}" alt="pictureArtist">
     <div class="col-2 align-self-center">
        <h5 class="m-0">${oggettoJsonTrackList.data[i].title_short}</h5>
     </div>
     <div class="col-2 text-end align-self-center mx-5">${oggettoJsonTrackList.data[i].rank}</div>
     <div class="col-2 text-end align-self-center">${durataCanzone(oggettoJsonTrackList.data[i].duration)}</div>
    `
    tutteCanzoniPopolari.appendChild(divSingolaCanzone);
  }
    
//  console.log(object); 
  let classeH1 = null;
  if(+oggettoJson.name.length > 20) {
    classeH1 = 'nameLungoArtist'
  } else {
    classeH1 = 'nameCortoArtist'
  }
  
  // Se proveniamo dall'home page mettiamo questo if, poi da album dobbiamo cambiarlo
  if(provenienza == 'homePage') {
    let corpoHome = document.querySelector('#corpo');
    corpoHome.classList.add('d-none')
  }
  

  let divArtist = document.createElement('div');
  divArtist.classList = 'col px-0 mx-0';
  divArtist.id = 'corpoArtist';
  
 
  divArtist.innerHTML = `
  <div id="testaArtist">
  <!-- Frecce e profilo -->
  <div class="card text-bg-dark d-flex flex-column">
      <img id="artistImg"
          src="${oggettoJson.picture_xl}"
          class="card-img opacity-50" alt="..." style="height: 30rem;">
      <div class="card-img-overlay row">
          <div class="col mx-3" id="freccieCambioAlbumGrande">
              <i class="bi bi-chevron-left" id="leftAlbum"></i>
          </div>
          <div id="nomeUtenteArtist" class="col text-end">
          <button class="btn btn-secondary p-0 px-2 rounded-5 propicAttivita" type="button">
              <img src="assets/imgs/main/pamy.png" alt="propic"> <span class="mt-2">Pamela Bianchettini
              <i class="bi bi-plus"></i></span>
          </button>
      </div>
          <div class="row mt-auto">
              <div class="col">
                  <span class="card-text"><i class="bi bi-patch-check-fill text-primary"></i>
                      Artista
                      verificato</span>
                  <h1 class="card-text titoloArtist fw-bold mb-4">${oggettoJson.name}</h1>
                  <p class="card-text">
                      ${oggettoJson.nb_fan} fan totali
                  </p>
              </div>
          </div>
      </div>
  </div>
  <div class="row corpoAlbumArtist">
      <!-- Row pulsanti -->
      <div class="row mb-3">
          <div class="col text-secondary fs-5 d-flex align-items-center">
              <a href="#" id="playPauseNewArtist" class="bi bi-play-circle-fill mx-4"></a>
              <button type="button" class="btn btn-outline-light">FOLLOWING</button>
              <i class="bi bi-three-dots mx-4"></i>
          </div>
      </div>

      <div class="col text-white mx-4">
          
          <h3 class="fw-bold mb-4">Top Five brani popolari</h3>
          <div id="topFivePD"></div>
          

      </div>
      
      <div class="col-4 text-white">
          <h3 class="fw-bold">Brani che ti piacciono</h3>
          <div class="row mt-4">
              <div class="col-3 position-relative">
                  <img src="${oggettoJson.picture_medium}" class="rounded-circle"
                      style="width: 5rem;">
                  <span id="badgeArtist"
                      class="position-absolute translate-middle rounded-circle d-flex justify-content-center align-items-center">
                      <i class="bi bi-suit-heart-fill"></i>
                  </span>
              </div>
              <div class="col-9 align-self-center">
                  <h5 class="text-light">Hai messo mi piace a 11 brani</h5>
                  <p class="text-secondary m-0">${oggettoJson.name}</p>
              </div>
          </div>
      </div>
  </div>
</div>
  
  `



  
  
  corpo.parentNode.insertBefore(divArtist, corpo.nextSibling)
  document.querySelector('#topFivePD').appendChild(tutteCanzoniPopolari)
 

  document.querySelector('#nomeUtenteArtist button').addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nome utente");
    let colonnaDestra = document.querySelector('#activity');
    let segno = document.querySelector('#nomeUtenteArtist button i')
    console.log(segno.classList.value);

    if(segno.classList.value == "bi bi-plus"){
      colonnaDestra.classList.remove('d-none')
      segno.classList = 'bi bi-dash-lg';
    } else if(segno.classList.value == "bi bi-dash-lg") {
      colonnaDestra.classList.add('d-none')
      segno.classList = 'bi bi-plus'; 
    }
  })

  document.querySelector('#leftAlbum').addEventListener('click', (e) => {
    // console.log("ciao left album");
    tornaAllaHomePage('artistPage')
    return
  })

  document.querySelector('#playPauseNewArtist').addEventListener('click', (e) => {

    playAudioAlbum()
  })



}