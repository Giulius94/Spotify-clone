// const fac = new FastAverageColor();
// let immagineDaPrendereMedia = document.querySelector('#likelike');
// let mediaRisultato = null;

// prendiMedia();

// async function prendiMedia() {
//     await fac.getColorAsync(immagineDaPrendereMedia)
//         .then(color => {
//             if (isColorLight(color)) {
//                 // Imposta un colore di default se il colore è troppo chiaro
//                 mediaRisultato = 'rgba(108,105,103,1)';
//                 console.log("scelto default");
//             } else {
//                 mediaRisultato = immagineDaPrendereMedia.style.backgroundColor = color.rgba;
//             }
//         })
//         .catch(e => {
//             console.log(e);
//         });
//     console.log(mediaRisultato);
// }

// function isColorLight(color) {
//     const luminance = (0.299 * color.value[0]) + (0.587 * color.value[1]) + (0.114 * color.value[2]);
//     // Soglia di luminanza, regolabile a seconda delle esigenze
//     return luminance > 186;
// }
