export function makeSearch() {
  const searchBtn = document.querySelector('.js-search-button');
  const searchBar = document.querySelector('.js-search-bar');

  searchBtn.addEventListener('click', () => {
    const inputEl = document.querySelector('.js-search-bar')
    const search = inputEl.value;
    window.location.href=`amazon.html?search=${search}`;
    inputEl.value = '';
  });

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const inputEl = document.querySelector('.js-search-bar')
      const search = inputEl.value;
      window.location.href=`amazon.html?search=${search}`;
      inputEl.value = '';
    }
  });
}