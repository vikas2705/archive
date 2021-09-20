import React, { useState } from "react";

function BusyCursor() {
  const [busy, setBusy] = useState(false);

  window.BusyCursor = {
    show() {
      setBusy(true);
    },
    hide() {
      setBusy(false);
    },
  };
  return (
    <div className="busycursor-container" style={{ display: (busy ? "block" : "none") }} >
      <div className="busycursor">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div style={{ color: "white" }}>Loading...</div>
      </div>
    </div>
  );
}

export default BusyCursor;
