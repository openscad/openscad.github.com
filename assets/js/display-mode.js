// Get mode from local storage
function getDisplayMode() { return localStorage.getItem('mode') || 'system'; }
// Save mode to local storage
function setDisplayMode(mode) { localStorage.setItem('mode', mode); }
// Determine theme from mode name
function modeToTheme(mode) {
	if (mode === 'light' || mode === 'dark') { return mode; }
	if (matchMedia('(prefers-color-scheme: light').matches) { return 'light'; }
	return 'dark';
}
// Change the mode
function changeMode(mode) {
    document.documentElement.dataset.appliedTheme = modeToTheme(mode);
    setDisplayMode(mode);
}
// Initialise mode
document.documentElement.dataset.appliedTheme = modeToTheme(getDisplayMode());
