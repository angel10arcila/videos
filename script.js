// Configuración de medios predefinidos
const mediaFiles = [
    
    {
        name: "Activa 104.9",
        url: "https://stream-150.zeno.fm/t31pbasum7zuv?zs=YZf30L3bQU2O2ubbISeTHQ",
        type: "Fm"
    },
    { 
        name: "Guaraña 97.5",
        url: "https://sp.wnetserver.com/8016/stream",
        type: "Fm"
    },
    {
        name: "Circuito líder 94.9",
        url: "https://stream-162.zeno.fm/pv120nq8e8zuv?zs=1T27FKTDRC-SQ7vEVXLvCA",
        type: "Fm"
    },
    {
        name: "Onda La super estación 107.9",
        url: "https://acp4.lorini.net/proxy/ur2060?mp=/stream",
        type: "Fm"
    },
    { 
        name: "Unión radio 90.3",
        url: "https://acp4.lorini.net/proxy/ur2080?mp=/stream",
        type: "Fm"
    },
    
    { 
        name: "La mega 107.3",
        url: "https://acp4.lorini.net/proxy/ur2050?mp=/stream",
        type: "Fm"
    },
    
    { 
        name: "Circuito éxitos 99.9",
        url: "https://acp4.lorini.net/proxy/ur2070?mp=/stream",
        type: "Fm"
    },

   { 
        name: "Deportivisima 91.5",
        url: "https://sp.panelchs.com/8066/stream",
        type: "Fm"
    }, 
    
    { 
        name: "Talento 102.7",
        url: "https://cloudstream2036.conectarhosting.com/8398/stream",
        type: "Fm"
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

  
