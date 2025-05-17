// Sample data for audio books
const audioBooks = [
  {
    id: "a001",
    title: "The Great Gatsby",
    contributor: "Sarah Johnson",
    coverImage: "images/1.jpg",
    audioFile: "audio/sample1.mp3",
    duration: "2:45:30",
    description: "A classic novel by F. Scott Fitzgerald",
  },
  {
    id: "a002",
    title: "Thinking, Fast and Slow",
    contributor: "Michael Chen",
    coverImage: "images/2.png",
    audioFile: "audio/sample2.mp3",
    duration: "3:20:15",
    description: "Psychology book by Daniel Kahneman",
  },
  {
    id: "a003",
    title: "Atomic Habits",
    contributor: "Emma Wilson",
    coverImage: "images/3.jpeg",
    audioFile: "audio/sample3.mp3",
    duration: "1:55:40",
    description: "Self-improvement book by James Clear",
  },
];

// Function to format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Function to render audio books with custom player
function renderAudioBooks(books) {
  const audioGrid = document.getElementById("audioGrid");
  audioGrid.innerHTML = "";

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "audio-card";
    card.innerHTML = `
      <div class="audio-card-img" style="background-image: url('${book.coverImage}')"></div>
      <div class="audio-card-content">
        <div class="audio-title">${book.title}</div>
        <div class="audio-contributor">Narrated by ${book.contributor}</div>
        <div class="custom-audio-player" data-audio="${book.audioFile}">
          <audio preload="metadata">
            <source src="${book.audioFile}" type="audio/mpeg">
          </audio>
          <div class="player-controls">
            <button class="play-pause-btn">
              <i class="play-icon">▶</i>
              <i class="pause-icon" style="display:none;">❚❚</i>
            </button>
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress"></div>
              </div>
              <div class="time-display">
                <span class="current-time">0:00</span>
                <span class="duration">0:00</span>
              </div>
            </div>
            <div class="volume-container">
              <button class="volume-btn">🔊</button>
              <div class="volume-slider">
                <input type="range" min="0" max="1" step="0.1" value="1" class="volume-range">
              </div>
            </div>
          </div>
        </div>
        <div class="audio-description">${book.description}</div>
      </div>
    `;
    audioGrid.appendChild(card);

    // Set up the custom audio player
    setupAudioPlayer(card.querySelector(".custom-audio-player"));
  });
}

// Function to set up custom audio player
function setupAudioPlayer(playerElement) {
  const audio = playerElement.querySelector("audio");
  const playPauseBtn = playerElement.querySelector(".play-pause-btn");
  const playIcon = playerElement.querySelector(".play-icon");
  const pauseIcon = playerElement.querySelector(".pause-icon");
  const progress = playerElement.querySelector(".progress");
  const progressBar = playerElement.querySelector(".progress-bar");
  const currentTimeDisplay = playerElement.querySelector(".current-time");
  const durationDisplay = playerElement.querySelector(".duration");
  const volumeBtn = playerElement.querySelector(".volume-btn");
  const volumeSlider = playerElement.querySelector(".volume-slider");
  const volumeRange = playerElement.querySelector(".volume-range");

  // Initialize audio metadata
  audio.addEventListener("loadedmetadata", function () {
    durationDisplay.textContent = formatTime(audio.duration);
  });

  // Play/Pause functionality
  playPauseBtn.addEventListener("click", function () {
    if (audio.paused) {
      // Pause all other audio elements first
      document.querySelectorAll("audio").forEach((a) => {
        if (a !== audio && !a.paused) {
          a.pause();
          const playerEl = a.closest(".custom-audio-player");
          if (playerEl) {
            playerEl.querySelector(".play-icon").style.display = "inline";
            playerEl.querySelector(".pause-icon").style.display = "none";
          }
        }
      });

      // Play this audio
      audio.play();
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
    } else {
      audio.pause();
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
    }
  });

  // Update progress bar
  audio.addEventListener("timeupdate", function () {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);

    // If audio ended, reset to play icon
    if (audio.ended) {
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
    }
  });

  // Click on progress bar to seek
  progressBar.addEventListener("click", function (e) {
    const seekPosition = e.offsetX / this.offsetWidth;
    audio.currentTime = seekPosition * audio.duration;
  });

  // Volume control
  volumeBtn.addEventListener("click", function () {
    volumeSlider.style.display =
      volumeSlider.style.display === "block" ? "none" : "block";
  });

  // Hide volume slider when clicking elsewhere
  document.addEventListener("click", function (e) {
    if (!volumeBtn.contains(e.target) && !volumeSlider.contains(e.target)) {
      volumeSlider.style.display = "none";
    }
  });

  // Adjust volume
  volumeRange.addEventListener("input", function () {
    audio.volume = this.value;
    updateVolumeIcon(this.value);
  });

  // Update volume icon based on level
  function updateVolumeIcon(volume) {
    if (volume >= 0.6) {
      volumeBtn.textContent = "🔊";
    } else if (volume >= 0.2) {
      volumeBtn.textContent = "🔉";
    } else if (volume > 0) {
      volumeBtn.textContent = "🔈";
    } else {
      volumeBtn.textContent = "🔇";
    }
  }

  // Keyboard shortcuts
  playerElement.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      playPauseBtn.click();
    }
  });
}

// Search functionality
const searchInput = document.getElementById("audioSearchInput");
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredBooks = audioBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.contributor.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm)
  );
  renderAudioBooks(filteredBooks);
});

// Contribute button functionality
const contributeBtn = document.getElementById("contributeBtn");
contributeBtn.addEventListener("click", function () {
  // Redirect to the contribution page
  window.location.href = "contributeAudio.html";
});

// Initial render
renderAudioBooks(audioBooks);
