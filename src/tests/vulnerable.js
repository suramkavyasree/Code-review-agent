// Isolated Semgrep test file — safe to include in a PR for detection
// This file demonstrates direct DOM assignment that Semgrep flags.
export function renderFromHash() {
  const container = document.getElementById('vuln-test');
  if (!container) return;
  const unsafe = location.hash ? decodeURIComponent(location.hash.slice(1)) : '';
  // Intentional unsafe sink for testing only: innerHTML assignment
  container.innerHTML = unsafe;
}

export default renderFromHash;
