
document.addEventListener('DOMContentLoaded', () => {
  const allData = [...gamesData, ...softwareData, ...osData];
  const searchBox = document.getElementById('searchBox');
  const gamesList = document.getElementById('gamesList');
  const categoryButtons = document.querySelectorAll('.category-menu button');
  let selectedCategory = 'all';

  function renderGames(items) {
    gamesList.innerHTML = '';
    if (items.length === 0) {
      gamesList.innerHTML = '<p>No items found.</p>';
      return;
    }
    items.forEach(item => {
      const gameDiv = document.createElement('div');
      gameDiv.classList.add('game');
      gameDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title}" />
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a class="download-btn" href="${item.mega}" target="_blank">Download from MEGA</a>
      `;
      gamesList.appendChild(gameDiv);
    });
  }

  function filterGames() {
    const searchTerm = searchBox.value.toLowerCase();
    const filtered = allData.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
    renderGames(filtered);
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedCategory = button.getAttribute('data-category');
      filterGames();
    });
  });

  searchBox.addEventListener('input', filterGames);
  renderGames(allData);
});
