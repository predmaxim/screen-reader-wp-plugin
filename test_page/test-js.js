const toggleNavButton = document.getElementById('toggle-nav');
const navContainer = document.getElementById('nav-container');

toggleNavButton.addEventListener('click', () => {
  if (navContainer.style.display === 'none') {
    navContainer.style.display = 'block';
  } else {
    navContainer.style.display = 'none';
  }
});