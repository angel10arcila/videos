// Configuración de medios predefinidos
const mediaFiles = [

   {
        name: "Mlb - Ronald Acuña",
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-06/23/9670df20-d8684e9d-12c357dd-csvm-diamondgcp-asset.m3u8",
        type: "Tv"
    },
    {
        name: "Mlb - Juan Soto",
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-06/23/0dccf2d1-fb8938a2-c0e54ec3-csvm-diamondgcp-asset.m3u8",
        type: "Tv"
    },
   {
        name: "Mlb jugadas destacadas",
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-06/22/dd148b23-bd5270c7-d07bef10-csvm-diamondgcp-asset.m3u8",
        type: "Tv"
    }, 
    {
        name: "Mlb - Salvador Pérez",
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-06/22/4cc061dc-78e3cc75-e13a5d26-csvm-diamondgcp-asset.m3u8",
        type: "Tv"
    }, 
    {
        name: "Mlb - Jesús Luzardo",
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-06/22/4d4b8c32-c58e78d6-9cf5219d-csvm-diamondgcp-asset.m3u8",
        type: "Tv"
    },
    {
        name: "Mlb - Mauricio Dubon",
        url: "https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-06/22/8f0c77bd-04a6f100-a3d37160-csvm-diamondgcp-asset.m3u8",
        type: "Tv"
    },
  
    {
        name: "Mlb - Celebración LA",
        url: "https://adhoc-hlslive-fst-gcp.mlb.com/2a0a8a55-0b87-4d01-b716-fab23d2907cb/LIVE-Dodgers-2024-World-Series-Parade.m3u8",
        type: "Tv"
    },        
    {
        name: "Halcones de Venezuela",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/HalconesdeVenezuela.mp4",
        type: "Vídeo"
    },
    { 
        name: "Halcones de Venezuela",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/HdVzla.mp4",
        type: "Vídeo"
    },
    {
        name: "Osos Maltín",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/Osos-Maltín2.mp4",
        type: "Vídeo"
    },
    {
        name: "Tortugas de la Sábana",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/Tortugas de la Sabana.mp4",
        type: "Vídeo"
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



