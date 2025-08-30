export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <small>© {new Date().getFullYear()} Digital Platform Architect</small>
        <div>
          <a href="/about">About</a>
        </div>
      </div>
    </footer>
  );
}

