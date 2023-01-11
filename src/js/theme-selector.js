function themeSelector() {
  const switchBtn = document.getElementById('switch');
  const switchMobBtn = document.getElementById('switch-mob');

  let selectedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.add(selectedTheme);
  if (selectedTheme === 'dark') {
    switchBtn.checked = true;
    switchMobBtn.checked = true;
  }

  const handleClick = () => {
    let targetTheme = 'light';
    let isChecked = false;

    if (selectedTheme === 'light') {
      targetTheme = 'dark';
      isChecked = true;
    }

    switchBtn.checked = isChecked;
    switchMobBtn.checked = isChecked;

    document.documentElement.classList.remove(selectedTheme);
    document.documentElement.classList.add(targetTheme);
    localStorage.setItem('theme', targetTheme);
    selectedTheme = targetTheme;
  };

  switchBtn.addEventListener('click', handleClick);
  switchMobBtn.addEventListener('click', handleClick);
}

export default themeSelector;
