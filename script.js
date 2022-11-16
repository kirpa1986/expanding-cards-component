const unsplashApiKey = "W4Ve29x57Bt3IJ6C7M8k1ywiPEueoYlfZVjQnEHeAb4";

function getUrl(endpoint, args) {
  endpoint += `?client_id=${unsplashApiKey}`;
  args.forEach((arg) => (endpoint += '&' + arg));
  return endpoint;
}

const picturesUrl = getUrl("https://api.unsplash.com/photos/random/", [
  'orientation=portrait', `count=${document.querySelectorAll(".expandingCard").length}`
]);


fetch(picturesUrl)
.then(res => {
    if (!res.ok) {
        throw new Error(res.statusText);
    } else {
        return res;
    }
})
.then(resp => resp.json())
.then(pictures => {
    const cards = document.querySelectorAll('.expandingCard');
    pictures.forEach((picture, index) => {
        cards[index].style.background = `url(${picture['urls']['regular']}) no-repeat center center/cover`;
        const pictureHeader = document.createElement('h4');
        pictureHeader.textContent = `By ${picture['user']['name']}`;
        cards[index].appendChild(pictureHeader);
    })
})
.catch(err => console.log(err));


document.querySelector('.cards-container').addEventListener('click', el => {
    if (el.target.classList.contains('expandingCard') && !el.target.classList.contains('active')) {
        document.querySelector('.expandingCard.active').classList.remove('active');
        el.target.classList.add('active');
    }
}) 
// document.querySelectorAll('.expandingCard').forEach(el => {
    
// })

