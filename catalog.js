const catalog = {
  "джаз": [
    { name: "Джаз 1", url: "ССЫЛКА_НА_MP3_1" },
    { name: "Джаз 2", url: "ССЫЛКА_НА_MP3_2" }
  ],
  "рок": [
    { name: "Рок 1", url: "ССЫЛКА_НА_MP3_3" }
  ]
};

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
  const player = document.getElementById('player');
  list.innerHTML = '';

  if (!theme || !catalog[theme]) return;

  catalog[theme].forEach(track => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${track.url}" onclick="playTrack('${track.url}');return false;">${track.name}</a>`;
    list.appendChild(li);
  });
}

function playTrack(url) {
  document.getElementById('player').src = url;
}
