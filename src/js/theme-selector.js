function themeSelector() {
  const switchBtn = document.getElementById('switch');
  const switchMobBtn = document.getElementById('switch-mob');
  const lightLabels = document.querySelectorAll('.switch-light');
  const darkLabels = document.querySelectorAll('.switch-dark');

  let selectedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.add(selectedTheme);
  if (selectedTheme === 'dark') {
    switchBtn.checked = true;
    switchMobBtn.checked = true;

    lightLabels.forEach(item => item.classList.remove('active'));
    darkLabels.forEach(item => item.classList.add('active'));
  } else {
    lightLabels.forEach(item => item.classList.add('active'));
    darkLabels.forEach(item => item.classList.remove('active'));
  }

  const handleClick = () => {
    let targetTheme = 'light';
    let isChecked = false;

    if (selectedTheme === 'light') {
      targetTheme = 'dark';
      isChecked = true;

      lightLabels.forEach(item => item.classList.remove('active'));
      darkLabels.forEach(item => item.classList.add('active'));
    } else {
      lightLabels.forEach(item => item.classList.add('active'));
      darkLabels.forEach(item => item.classList.remove('active'));
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
