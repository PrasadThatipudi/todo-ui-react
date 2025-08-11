const Footer = () => {
  return (
    <div
      className="app-footer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#f8f9fa",
        borderTop: "1px solid #e5e7eb",
        padding: "0.75rem 2rem",
        zIndex: 9999,
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="footer-shortcuts">
        <div className="footer-shortcut">
          <span className="footer-key">Ctrl+T</span>
          <span className="footer-desc">New Todo</span>
        </div>
        <div className="footer-shortcut">
          <span className="footer-key">Escape</span>
          <span className="footer-desc">Smart Exit</span>
        </div>
        <div className="footer-shortcut">
          <span className="footer-key">F1</span>
          <span className="footer-desc">Help</span>
        </div>
        <div className="footer-shortcut">
          <span className="footer-key">Ctrl+\</span>
          <span className="footer-desc">Help</span>
        </div>
        <div className="footer-shortcut">
          <span className="footer-key">1-9</span>
          <span className="footer-desc">Go to Tab</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
