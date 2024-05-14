let nomiCompilation = [
    "Vibrazioni Estive",
    "Rock Classico",
    "Ritmi Latini",
    "Pop Hits",
    "Jazz Serale",
    "Electro Dance",
    "Chill Acustico",
    "Rap Essentials",
    "Country Roads",
    "Blues Profondo",
    "Indie Discovery",
    "Classica Moderna",
    "Soul Rilassante",
    "Metal Intenso",
    "Reggae Vibes",
    "Folk Tradizionale",
    "Techno Underground",
    "Hip-Hop Attivo",
    "Ballate Romantiche",
    "Punk Energetico",
    "Lounge Urbano",
    "Opera Grandiosa",
    "R&B Classico",
    "Disco Fever",
    "Gospel Spirituale",
    "Trap Innovativo",
    "Sinfonie Magistrali",
    "Rock Progressivo",
    "Jazz Fusion",
    "Pop Latino",
    "Ambient Sereno",
    "Blues Elettrico",
    "Metalcore Potente",
    "Reggaeton Caldo",
    "House Vibrazioni",
    "Swing Anni '40",
    "Funk Groove",
    "Ska Rivoluzionario",
    "Electro Swing",
    "Retro '80",
    "Anni '90 Hits",
    "Soul Anni '70",
    "Rock Anni '60",
    "Classici '50",
    "New Wave",
    "Soft Rock",
    "Hard Rock",
    "Musica Celtica",
    "Piano Solista",
    "Cori Angelici"
];


document.addEventListener('DOMContentLoaded', function () {
    let div = document.querySelector('#corpoSearchCards');
    div.innerHTML = "";
    let countImg = 1;

    nomiCompilation.forEach((element) => {
        let rgb1 = Math.floor(Math.random() * 255);
        let rgb2 = Math.floor(Math.random() * 255);
        let rgb3 = Math.floor(Math.random() * 255);
        let col = ` 
        <div class="col my-2">
        <div class="card h-100" style="background-color: rgb(${rgb1}, ${rgb2}, ${rgb3});" role="button">
            <div class="card-body">
                <h4 class="card-title fw-bold text-white">${element}</h4>
                <img src="assets/imgs/search/image-${countImg++}.jpg" class="card-img-top" alt="search1">
            </div>
        </div>
    </div>`
        console.log(countImg);
        div.innerHTML += col;
    })
    console.log(div);
})


