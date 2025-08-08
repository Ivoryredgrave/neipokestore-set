import { useState, useRef } from "react";
import FolderView from "./components/FolderView";
import ImageView from "./components/ImageView";
import "./styles.css";

const collections = {
  "151": [
    { name: "image6.png", price: "$5.00", stock: 1 },
    { name: "image7.png", price: "$6.00", stock: 2 },
    { name: "image8.png", price: "$5.50", stock: 1 },
    { name: "image9.png", price: "$7.00", stock: 3 },
    { name: "image10.png", price: "$4.50", stock: 4 },
    { name: "image11.png", price: "$6.00", stock: 1 },
    { name: "image12.png", price: "$5.00", stock: 2 },
    { name: "image13.png", price: "$7.50", stock: 1 },
    { name: "image14.png", price: "$5.25", stock: 3 },
    { name: "image15.png", price: "$6.75", stock: 2 },
    { name: "image16.png", price: "$5.00", stock: 1 },
    { name: "image17.png", price: "$6.00", stock: 2 },
    { name: "image18.png", price: "$7.00", stock: 1 },
  ],
  "Prismatic Evolutions": [
    { name: "image1.jpg", price: "$8.00", stock: 1 },
    { name: "image2.png", price: "$8.50", stock: 2 },
    { name: "image3.png", price: "$9.00", stock: 1 },
  ],
  "Journey Together": [
    { name: "image1.jpg", price: "$7.50", stock: 1 },
    { name: "image2.png", price: "$7.75", stock: 2 },
    { name: "image3.png", price: "$8.00", stock: 1 },
  ],
  "Black and White Flare": [
    { name: "image1.jpg", price: "$6.00", stock: 1 },
    { name: "image2.png", price: "$6.50", stock: 2 },
    { name: "image3.png", price: "$7.00", stock: 1 },
  ],
  "Destined Rivals": [
    { name: "image1.jpg", price: "$7.00", stock: 1 },
    { name: "image2.png", price: "$7.25", stock: 2 },
    { name: "image3.png", price: "$7.50", stock: 1 },
  ],
};

function App() {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [fade, setFade] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

const togglePlay = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    audioRef.current.play().catch(() => {
      // por si falla la reproducción (bloqueo del navegador)
    });
    setIsPlaying(true);
  }
};

  const handleOpenFolder = (folder) => {
    setFade(false);
    setTimeout(() => {
      setCurrentFolder(folder);
      setFade(true);
    }, 400);
  };

  const handleBack = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentFolder(null);
      setFade(true);
    }, 400);
  };

  return (
    <div className="page">
      <audio
        ref={audioRef}
        src="/pokemon-opening.mp3"
        loop
      />
      <div className="app-container">
        <h1 className="title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          NeiPokeStore
          <button
            onClick={togglePlay}
            style={{
              fontSize: "1.3rem",
              cursor: "pointer",
              background: "none",
              border: "none",
              color: "inherit",
            }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
        </h1>

        <div className={fade ? "fade-enter-active" : "fade-exit-active"}>
          {!currentFolder ? (
            <FolderView
              collections={collections}
              onFolderClick={handleOpenFolder}
            />
          ) : (
            <ImageView
              folderName={currentFolder}
              images={collections[currentFolder]}
              onBack={handleBack}
            />
          )}
        </div>
      </div>

      <footer className="footer">
        Copyright © 2025 NeiPokeStore. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;

