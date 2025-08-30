export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">Digital Platform Architect</p>
          <p className="footer-description">
            A comprehensive guide to enterprise digital platform architecture,
            building blocks, and architectural patterns.
          </p>
        </div>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/resources">Resources</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <small className="footer-copyright">
          © {new Date().getFullYear()} Digital Platform Architect
        </small>
      </div>
    </footer>
  );
}

