// Configuración de medios predefinidos
const mediaFiles = [
    
    {
        name: "Halcones de Venezuela",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/HalconesdeVenezuela.mp4",
        type: "Mp4"
    },
    { 
        name: "Halcones de Venezuela",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/HdVzla.mp4",
        type: "Mp4"
    },
    {
        name: "Osos Maltín",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/Osos-Maltín.mp4",
        type: "Mp4"
    },
    {
        name: "Tortugas de la Sábana",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/Tortugas de la Sabana.mp4",
        type: "Mp4"
    },
    { 
        name: "Uniforme de las Tortugas",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/Uniforme de las Tortugas.mp4",
        type: "Mp4"
    },
    
    { 
        name: "Uniforme de los Halcones",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/Uniforme de los Halcones.mp4",
        type: "Mp4"
    },
    
    { 
        name: "Halcones de Venezuela",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/Halcones de Venezuela 1.mp4",
        type: "Mp4"
    },

   { 
        name: "Halcones de Venezuela",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/HalconesdeVenezuela.mp4",
        type: "Mp4"
    }, 
    
    { 
        name: "Mlb - juegos del pasado",
        url: "https://linear-843.frequency.stream/mt/studio/843/hls/master/playlist.m3u8",
        type: "TV"
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

  
