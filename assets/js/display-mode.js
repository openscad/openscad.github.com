"use strict";
const DISPLAY_MODE_STORAGE_KEY = 'mode';

// Get mode from local storage.
function getDisplayMode() { return localStorage.getItem(DISPLAY_MODE_STORAGE_KEY) || 'system'; }

// Save mode to local storage.
function setDisplayMode(mode) { localStorage.setItem(DISPLAY_MODE_STORAGE_KEY, mode); }

// Determine theme from mode name.
function modeToTheme(mode) {
  if(mode === 'light' || mode === 'dark') { return mode; }
  if(matchMedia('(prefers-color-scheme: light)').matches) { return 'light'; }
  return 'dark';
}

// Change the mode.
function changeMode(mode) {
  document.documentElement.dataset.appliedTheme = modeToTheme(mode);
  setDisplayMode(mode);
}

// Initialise mode.
document.documentElement.dataset.appliedTheme = modeToTheme(getDisplayMode());

function setDisplayModeIcon(mode) {
  let iconClass = "fa fa-circle-half-stroke";
  let title = "OS Default"
  if(mode === 'light') {
    iconClass = "fa fa-sun";
    title = "Light Theme";
  } else if(mode === 'dark') {
    iconClass = "fa fa-moon";
    title = "Dark Theme";
  }
  const icon = document.querySelector('#displayMode .currentMode i');
  const currentMode = document.querySelector('#displayMode .currentMode');
  
  if(!icon || !currentMode) {
    return;
  }
  
  icon.className = iconClass;
  currentMode.title = title;
}

function initDisplayMode() {
  const displayMode = document.querySelector('#displayMode');
  const currentMode = displayMode?.querySelector('.currentMode');
  const modePicker = displayMode?.querySelector('.pickMode');
  
  if(!currentMode || !modePicker) {
    return;
  }
  
  setDisplayModeIcon(getDisplayMode());
  currentMode.addEventListener('click', () => {
    modePicker.style.display = 'block';
  });
  
  modePicker.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', () => {
      const mode = item.className;
      changeMode(mode);
      setDisplayModeIcon(mode);
      modePicker.style.display = 'none';
    });
  });
}

// Failsafe loading pattern.
if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDisplayMode);
} else {
  initDisplayMode();
}
