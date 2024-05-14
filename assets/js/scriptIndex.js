addEventListener("DOMContentLoaded", (e) => {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  creazionePlaylistSinistra();
  grepAlbumPrincipale()
  grepAlbumPiccolini(1)
  ascoltoNomeUtente()
  ascoltoCambioAlbumGrande()
  creazionePreferiti()
});

async function creazionePreferiti() {
  if(!localStorage.getItem('albumPreferiti')) {
    let albumpreferiti = {
      id: []
    }
    let albumJson = JSON.stringify(albumpreferiti)
    localStorage.setItem('albumPreferiti', albumJson)
  }
}

function creazionePlaylistSinistra() {
  let playlistCol = document.querySelector("#playlistCol");
  const playlistArray = [
    "🎭 early stage emily syndrome",
    "Be The Young Old 🌟",
    "cit. 📖 Kimiko e Chimicazza",
    "che minkia ci faccio con 🤔 4 day",
    "saggio vibes 🎷",
    "👑 A' main character energy (mag-giu 2022)",
    "that fucking mood 😡",
    "🚗 VEE, CARLOTTA E GIACOMO VANNO A BOSIO",
    "An Emily Winchester kind of 🌌 mood landing page",
    "lol cosa cazzo vuol dire 😂 questa affermazione",
    "honey and glass 🍯 (nov-dic 2021)",
    "💪 (Revenge) Training Arc Lidia W Emily",
    "minecraft e nintendo 🎮 switch",
    "silvano d'orba? 🧐 I hardly know her",
    "Culo 2021 🎵 Frah Quintale Mix",
    "Francesco Guccini 🎤 Mix",
    "😇 la mamm e ki nalluk e na p8tt3n",
    "GOMORRA x SUBURRA mix 🔫 camorra",
    "Il re Arcangelo a 👑 cappella",
    "Le fiabe di pierone 📚 e il polu",
    "MIX HOUSE BENNY BENASSI 🏠 DIABOLIKA",
  ];
  playlistArray.forEach((element) => {
    let newA = document.createElement("a");
    newA.href = "#";
    newA.className = "ms-3 mt-2";
    newA.innerText = element;
    playlistCol.appendChild(newA);
  });
}


async function grepAlbumPrincipale(indexPrescelto) {
  let randomIndex = 0;
  if (indexPrescelto != undefined) {
    console.log(indexPrescelto);
    randomIndex = indexPrescelto
  } else {
    randomIndex = Math.floor(Math.random() * 4);
  }
  localStorage.setItem("indexNumberAlbum", randomIndex)
  let arrayAlbum = ["1215290", "112854212", "230935602", "111212"];
  let Url = `https://striveschool-api.herokuapp.com/api/deezer/album/${arrayAlbum[randomIndex]}`
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

  // console.log(oggettoJson.artist.name);
  let bannerPrincipaleAlbum = document.querySelector('#bannerPrincipaleAlbum')
  bannerPrincipaleAlbum.innerHTML = `
  <div class="col">
      <div class="card bg-black text-white mb-3">
      <div class="row g-0">
          <div class="col-md-4">
              <img crossorigin="anonymous" src="${oggettoJson.cover_big}" class="img-fluid rounded-start p-4" alt="...">
          </div>
          <div class="col-md-8">
              <div class="card-body p-4">
                  <span>ALBUM</span>
                  <h1 class="card-title">${oggettoJson.title}</h1>
                  <p id="artistIndex" class="card-text">
                      ${oggettoJson.contributors[0].name}
                  </p>
                  <span id="idNascostoPlayAlbumGrande" class="d-none">${oggettoJson.id}</span> <span id="idNascostoArtista" class="d-none">${oggettoJson.artist.id}</span>
                  <span id="randomIndexAlbumGrande" class="d-none">${randomIndex}</span>
                  <p class="card-text">Ascolta un album Italiano</p>
                  <div class="bottoniAlbumPrincipale mt-5">
                      <button id="playButtonAlbumGrande" type="button" class="btn btn-success me-3 px-4 py-2 rounded-5 text-black fw-bold">Play</button>
                      <button type="button" class="btn border-white text-white me-3 px-4 py-2 rounded-5 fw-bold">Save</button>
                      <i class="bi bi-three-dots"></i>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </div>
  `
}


async function grepAlbumPiccolini(numeroAlbum) {
  let arrayAlbum = [];
  if (numeroAlbum === 1) {
    arrayAlbum = ["134980812", "481451035", "84690192", "285890322"];
  } else if (numeroAlbum === 2) {
    arrayAlbum = ["345613757", "51154512", "324136", "1098393"];
  }
  for (i = 0; i < arrayAlbum.length; i++) {
    let album = arrayAlbum[i]
    let Url = `https://striveschool-api.herokuapp.com/api/deezer/album/${album}`
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
    let generiMusicali = oggettoJson.genres.data.map(genre => genre.name);
    let generiJoinati = generiMusicali.join(", ");

    let divPadre = document.querySelector('#cardDinamiche');
    let cardSingola = document.createElement('div')
    cardSingola.classList = 'col-3 mb-4'
    cardSingola.innerHTML = `
            <div class="card h-100 hoverScale" role="button">
                <img crossorigin="anonymous" src="${oggettoJson.cover_medium}" class="card-img-top p-4 img-fluid generati-01" alt="${oggettoJson.artist.name}">
                <div class="card-body generati-01">
                    <h5 class="card-title generati-01">${oggettoJson.title}</h5>
                    <p class="card-text generati-01">${generiJoinati}</p>
                    <span class="idAlbumPiccolo d-none">${oggettoJson.id}</span>
                </div>
            </div>
        </div>
    `
    divPadre.appendChild(cardSingola)
  }

  if (numeroAlbum === 1) {
    ascoltoVisualizzaTutto();
  }

}


function ascoltoVisualizzaTutto() {
  document.querySelector('#visualizzaTuttoPiccole').addEventListener('click', (e) => {
    e.preventDefault();
    grepAlbumPiccolini(2);
  })
}


function ascoltoNomeUtente() {
  document.querySelector('#nomeUtente button').addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nome utente");
    let colonnaDestra = document.querySelector('#activity');
    let segno = document.querySelector('#nomeUtente button i')
    console.log(segno.classList.value);

    if (segno.classList.value == "bi bi-plus") {
      colonnaDestra.classList.remove('d-none')
      segno.classList = 'bi bi-dash-lg';
    } else if (segno.classList.value == "bi bi-dash-lg") {
      colonnaDestra.classList.add('d-none')
      segno.classList = 'bi bi-plus';
    }
  })


  document.querySelector('#croceX').addEventListener('click', (e) => {
    let croceX = document.querySelector('#croceX')
    console.log(e.target);
    let colonnaDestra = document.querySelector('#activity');
    let segno = null;
    if (document.querySelector('#corpo').classList.contains('d-none')) {
      segno = document.querySelector('#nomeUtenteAlbum button i');
    } else {
      segno = document.querySelector('#nomeUtente button i');
    }
    colonnaDestra.classList.add('d-none')
    segno.classList = 'bi bi-plus';

  })

}


function ascoltoCambioAlbumGrande() {
  document.querySelector('#freccieCambioAlbumGrande').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.value === 'bi bi-chevron-left') {
      let actualIndex = +localStorage.getItem('indexNumberAlbum')
      console.log(actualIndex);
      if (actualIndex === 0) {
        actualIndex = 3
      } else {
        actualIndex--
      }
      grepAlbumPrincipale(actualIndex)
    }
    if (e.target.classList.value === 'bi bi-chevron-right') {
      let actualIndex = +localStorage.getItem('indexNumberAlbum')
      console.log(actualIndex);
      if (actualIndex === 3) {
        actualIndex = 0
      } else {
        actualIndex++
      }
      grepAlbumPrincipale(actualIndex)
    }
  })
}
