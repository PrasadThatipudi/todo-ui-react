import { useHotkeys } from "react-hotkeys-hook";

const ShortcutsHelp = ({ isOpen, onClose }) => {
  // Close modal with Escape key
  useHotkeys("escape", () => {
    if (isOpen) {
      onClose();
    }
  });

  if (!isOpen) return null;

  const shortcuts = [
    {
      category: "General",
      items: [
        {
          keys: [["?"], ["Ctrl", "\\"], ["F1"]],
          description: "Show/hide this help",
        },
        { keys: [["Ctrl", "T"]], description: "Create new todo" },
        { keys: [["i"]], description: "Focus on task input" },
        { keys: [["Esc"]], description: "Smart escape (remove focus)" },
      ],
    },
    {
      category: "Tab Navigation",
      items: [
        { keys: [["h"], ["←"], ["["]], description: "Previous tab" },
        { keys: [["l"], ["→"], ["]"]], description: "Next tab" },
        { keys: [["1-8"]], description: "Go to tab 1-8" },
        { keys: [["9"]], description: "Go to last tab" },
      ],
    },
    {
      category: "Task Navigation",
      items: [
        { keys: [["j"], ["↓"]], description: "Next task" },
        { keys: [["k"], ["↑"]], description: "Previous task" },
        { keys: [["Ctrl", "N"]], description: "Next task" },
        { keys: [["Ctrl", "P"]], description: "Previous task" },
      ],
    },
    {
      category: "Task Actions",
      items: [
        { keys: [["d"]], description: "Toggle task done/undone" },
        { keys: [["Del"], ["⌫"]], description: "Delete focused task" },
      ],
    },
    {
      category: "Task Input",
      items: [
        { keys: [["Ctrl", "I"]], description: "Toggle Important priority" },
        { keys: [["Ctrl", "U"]], description: "Toggle Urgent priority" },
        { keys: [["Ctrl", "M"]], description: "Toggle both priorities" },
        {
          keys: [["("], ["["], ["{"], ["'"], ['"']],
          description: "Auto-close brackets/quotes",
        },
      ],
    },
  ];

  const KeyBadge = ({ keys }) => {
    // Check if keys is an array of arrays (multiple shortcuts) or single array
    const isMultipleShortcuts = Array.isArray(keys[0]);

    if (isMultipleShortcuts) {
      return (
        <div className="key-combination">
          {keys.map((shortcut, shortcutIndex) => (
            <span key={shortcutIndex}>
              {shortcut.map((key, keyIndex) => (
                <span key={keyIndex}>
                  <kbd className="key-badge">{key}</kbd>
                  {keyIndex < shortcut.length - 1 && (
                    <span className="key-plus">+</span>
                  )}
                </span>
              ))}
              {shortcutIndex < keys.length - 1 && (
                <span className="key-separator">, </span>
              )}
            </span>
          ))}
        </div>
      );
    } else {
      // Single shortcut (existing behavior)
      return (
        <div className="key-combination">
          {keys.map((key, index) => (
            <span key={index}>
              <kbd className="key-badge">{key}</kbd>
              {index < keys.length - 1 && <span className="key-plus">+</span>}
            </span>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>Keyboard Shortcuts</h2>
          <button type="button" className="shortcuts-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="shortcuts-content">
          {shortcuts.map((section) => (
            <div key={section.category} className="shortcuts-section">
              <h3>{section.category}</h3>
              <div className="shortcuts-list">
                {section.items.map((item, index) => (
                  <div key={index} className="shortcut-item">
                    <KeyBadge keys={item.keys} />
                    <span className="shortcut-description">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="shortcuts-footer">
          <p>
            Press <kbd className="key-badge">Esc</kbd> or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsHelp;
