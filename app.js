const bg = document.querySelector('.img');
const text = document.querySelector('.loading-txt');
const waves = document.querySelector('.custom-shape-divider-bottom-1628360971')


let counter = 0;
let interval = setInterval(blur, 30)

function blur() {
   counter++
   if(counter>99){
       clearInterval(interval)
}
text.innerHTML=`${counter}%`;
text.style.opacity = scale(counter, 0,100, 1, 0);
bg.style.filter = `blur(${scale(counter, 0, 100, 30, 0)}px)`;
waves.style.filter = `blur(${scale(counter, 0, 100, 30, 0)}px)`;

}

const scale = (number, inMin, inMax, outMin, outMax)=> {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

blur();

const mymap = L.map('mapid').setView([0, 0], 1);

const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [70, 70],
    iconAnchor: [25, 16]
});

const marker =L.marker([0, 0], {icon: issIcon}).addTo(mymap);
const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);
const api = 'https://api.wheretheiss.at/v1/satellites/25544';
let firstZoom = true;
async function getIss(){
    const response = await fetch(api);
    const data = await response.json();
    const { latitude, longitude, velocity, visibility, } = data;

    marker.setLatLng([latitude, longitude]);
    if(firstZoom){
        mymap.setView([latitude, longitude], 2);
        firstZoom=false;
    }
        
    
    

    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
    document.getElementById('vel').textContent = velocity.toFixed(2);
    document.getElementById('vis').textContent= visibility;
}
getIss();

setInterval(getIss,1000);