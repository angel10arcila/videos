// Configuración de medios predefinidos
const mediaFiles = [

    //https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751732394861&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=GxuWr~cKDwaJ5yfxjKo51V39SB9njyI5xPOhkfSI3lyvLmM-MAlf31YGEDLOn7Zbcbv-4BpBjtppewMaOFzIMRcrrGs-b7k2vFLu5n4KQGDNN8yZjfZhRyiKfjJMmMXP9cIEbtwkJhWooJ5-vTziSPwD6gmO-Lsm0ij6qipTopm3IGZWVa1QtZwx4r0rfw4jbJMIEt--1GMt3wnMitmgSFaxGH1-CbkiWzItIsGX6E-lI-Ma3Qx4ridh6MzG~zudzZaSjrZH6nti3dNhuAX80cYvHiKxFQ~rgWVkHteVIzNsdgFIP4AeXnUTVRuW620ib54esz2TpGFhg7PVMuU88w__
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video3.mp4",
        type: "..."
    },
 
    {
        name: "©Mlb - CIN vs NYM",
        url: "https://edge1caster.pro/hls/ihfazugfyjcazich17.m3u8?st=oxsTYKsUAgSnUueRNoeIoHiuUjxWlRTHRq2IP5eLLFY&e=1752961905",
        type: "Tv"
    }, 

    {
        name: "©Mlb - NYY vs ATL",
         url: "https://eastcaster.pro/hls/kjhfzua25.m3u8?st=fxP7h9XDFT_IJcccIi2ok2TlDvU5ud92yD9TTN9-1Ns&e=1752962000",
        type: "Tv"
    },
    {
        name: "©Mlb - HOU vs SEA",
        url: "https://edge1caster.pro/hls/hfzljfahzcax29.m3u8?st=RrorLbua-f4EDgjtDkXbd2wY3OyuUZdRCibyw7Ttt5Y&e=1752978473",
        type: "Video"
    },
    {
        name: "©Venearci",
        url: "https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751732394861&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=GxuWr~cKDwaJ5yfxjKo51V39SB9njyI5xPOhkfSI3lyvLmM-MAlf31YGEDLOn7Zbcbv-4BpBjtppewMaOFzIMRcrrGs-b7k2vFLu5n4KQGDNN8yZjfZhRyiKfjJMmMXP9cIEbtwkJhWooJ5-vTziSPwD6gmO-Lsm0ij6qipTopm3IGZWVa1QtZwx4r0rfw4jbJMIEt--1GMt3wnMitmgSFaxGH1-CbkiWzItIsGX6E-lI-Ma3Qx4ridh6MzG~zudzZaSjrZH6nti3dNhuAX80cYvHiKxFQ~rgWVkHteVIzNsdgFIP4AeXnUTVRuW620ib54esz2TpGFhg7PVMuU88w__",
        type: "..."
    },

    {
        name: "©Space Cityhn",
        url: "https://tvpass.org/live/sny-sportsnet-new-york-comcast/hd",
        type: "Tv"
    },
   
    {
        name: "©Mlb network HD",
        url: "https://tvpass.org/live/MLBNetwork/hd",
        type: "Tv"
   },
      
];

let currentTrack = 0;
const mediaPlayer = document.getElementById('mediaPlayer');
const playlist = document.getElementById('playlist');

// Inicializar reproductor
function initPlayer() {
    // Generar playlist
    mediaFiles.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            ${media.name}
            <span class="format-badge">${media.type.toUpperCase()}</span>
        `;
        item.onclick = () => loadMedia(index);
        playlist.appendChild(item);
    });

    // Cargar primer medio
    loadMedia(0);
}

function loadMedia(index) {
    currentTrack = index;
    const media = mediaFiles[index];
    
    // Actualizar clase activa en playlist
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Cargar medio según tipo
    if (media.type === 'm3u') {
        loadM3U(media.url);
    } else {
        mediaPlayer.src = media.url;
        mediaPlayer.play();
    }
}

async function loadM3U(url) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        // Procesar M3U y extraer URLs
        const urls = content.match(/^(?!#).+$/gm);
        if (urls && urls.length > 0) {
            mediaPlayer.src = urls[0];
            mediaPlayer.play();
        }
    } catch (error) {
        console.error('Error loading M3U:', error);
    }
}

function playPause() {
    if (mediaPlayer.paused) {
        mediaPlayer.play();
    } else {
        mediaPlayer.pause();
    }
}

function nextTrack() {
    const next = (currentTrack + 1) % mediaFiles.length;
    loadMedia(next);
}

function previousTrack() {
    const prev = (currentTrack - 1 + mediaFiles.length) % mediaFiles.length;
    loadMedia(prev);
}

function toggleMute() {
    mediaPlayer.muted = !mediaPlayer.muted;
}

// Eventos del reproductor
mediaPlayer.addEventListener('ended', () => {
    nextTrack();
});

mediaPlayer.addEventListener('error', (e) => {
    console.error('Error en la reproducción:', e);
    nextTrack();
});

// Inicializar
initPlayer();



          
