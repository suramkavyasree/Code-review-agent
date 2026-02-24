// Security Test: XSS Vulnerability for Semgrep Detection
// This file is used to test vulnerability detection in PRs

export function renderUserContent(content) {
  const container = document.getElementById('user-content');
  if (!container) return;
  
  // VULNERABLE: Direct innerHTML assignment with unsanitized user input
  // This is intentionally vulnerable for testing Semgrep detection
  container.innerHTML = content;
}

export function loadFromHash() {
  const query = window.location.hash.substring(1);
  const decoded = decodeURIComponent(query);
  
  // VULNERABLE: innerHTML with URL parameter
  document.getElementById('output').innerHTML = decoded;
}

export function setupDOMUpdates(userData) {
  const panel = document.querySelector('.user-panel');
  if (!panel) return;
  
  // VULNERABLE: innerHTML with user data
  panel.innerHTML = `<div class="name">${userData.name}</div>`;
}

export default { renderUserContent, loadjFromHash, setupDOMUpdates };
