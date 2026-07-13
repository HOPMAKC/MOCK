const catalog = {
  "Смерть психологам": [
    { name: "Автоматизация смерти", url: "https://disk.yandex.ru/i/HM5tkB5v8CABTA", type: "video" },
    { name: "Номер смерти", url: "https://disk.yandex.ru/i/fUAWZAqj51TSIQ", type: "video" }
  ],
  "Модели психологии": [
    { name: "В моменте и в потоке", url: "https://disk.yandex.ru/i/x3mYJU_RYkPikQ", type: "video" },
    { name: "Ложь рапределения", url: "https://disk.yandex.ru/i/_uTIf-GvRNCRuw", type: "video" }
  ],
  "Смыслы слов": [
    { name: "Тексты и звуки", url: "https://disk.yandex.ru/d/42DNtVgTCJVFXA", type: "audio" },
    { name: "Видео‑арт под эмбиент", url: "ССЫЛКА_НА_MP4_3", type: "video" }
  ]
};

// Заполняем выпадающий список тем
const select = document.getElementById('themeSelect');
for (const theme in catalog) {
  const option = document.createElement('option');
  option.value = theme;
  option.textContent = theme;
  select.appendChild(option);
}

function loadTracks() {
  const theme = select.value;
  const list = document.getElementById('playlist');
  const playerContainer = document.getElementById('player-container');

  list.innerHTML = '';
  playerContainer.innerHTML = ''; // очищаем плеер

  if (!theme || !catalog[theme]) return;

  catalog[theme].forEach(track => {
    const li = document.createElement('li');
    // Передаём объект track через JSON.stringify — безопасно для простого примера
    li.innerHTML = `<a href="#" onclick="showMedia(${JSON.stringify(track)}); return false;">${escapeHtml(track.name)}</a>`;
    list.appendChild(li);
  });
}

function showMedia(track) {
  const container = document.getElementById('player-container');
  container.innerHTML = '';

  if (track.type === 'video') {
    const video = document.createElement('video');
    video.src = track.url;
    video.controls = true;
    video.width = 640;
    // Для мобильных автоплей без звука запрещён, controls решают проблему
    container.appendChild(video);
  } else {
    const audio = document.createElement('audio');
    audio.src = track.url;
    audio.controls = true;
    container.appendChild(audio);
  }
}

// Простая защита от XSS: экранируем спецсимволы в названиях
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
