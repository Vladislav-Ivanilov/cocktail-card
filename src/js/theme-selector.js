function themeSelector() {
  const switchBtn = document.getElementById('switch');

  let selectedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.add(selectedTheme);
  if (selectedTheme === 'dark') {
    switchBtn.checked = true;
  }

  const handleClick = () => {
    let targetTheme = 'light';

    if (selectedTheme === 'light') {
      targetTheme = 'dark';
    }

    document.documentElement.classList.remove(selectedTheme);
    document.documentElement.classList.add(targetTheme);
    localStorage.setItem('theme', targetTheme);
    selectedTheme = targetTheme;
  };

  switchBtn.addEventListener('click', handleClick);
}

export default themeSelector;
