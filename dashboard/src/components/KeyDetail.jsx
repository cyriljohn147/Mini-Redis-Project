import React from "react";

const KeyDetail = ({
  selectedKey,
  keyData,
  keyLoading,
  copyToClipboard,
  handleDeleteKey,
  handleDeleteField,
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "string":
        return <span style={{ fontSize: "14px" }}>📝</span>;
      case "hash":
        return <span style={{ fontSize: "14px" }}>#️⃣</span>;
      default:
        return <span style={{ fontSize: "14px" }}>🗄️</span>;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "string":
        return {
          color: "#059669",
          backgroundColor: "#ecfdf5",
          border: "1px solid #a7f3d0",
        };
      case "hash":
        return {
          color: "#7c3aed",
          backgroundColor: "#f3e8ff",
          border: "1px solid #c4b5fd",
        };
      default:
        return {
          color: "#2563eb",
          backgroundColor: "#eff6ff",
          border: "1px solid #93c5fd",
        };
    }
  };

  const spinnerStyle = {
    width: "32px",
    height: "32px",
    border: "2px solid #e2e8f0",
    borderTop: "2px solid #ef4444",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  if (keyLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ ...spinnerStyle, margin: "0 auto 12px" }}></div>
          <p style={{ color: "#475569" }}>Loading key data...</p>
        </div>
      </div>
    );
  }

  if (!keyData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#fef2f2",
              borderRadius: "16px",
              marginBottom: "16px",
              width: "fit-content",
              margin: "0 auto 16px",
            }}
          >
            <span style={{ fontSize: "48px" }}>🗄️</span>
          </div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "8px",
            }}
          >
            Failed to Load Key
          </h3>
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Unable to retrieve data for this key
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: "none" }}>
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#1e293b",
              margin: 0,
            }}
          >
            {selectedKey}
          </h2>
          <button
            onClick={() => copyToClipboard(selectedKey)}
            style={{
              padding: "8px",
              color: "#64748b",
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ fontSize: "14px" }}>📋</span>
          </button>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "500",
            ...getTypeColor(keyData.type),
          }}
        >
          {getTypeIcon(keyData.type)}
          {keyData.type.toUpperCase()}
        </div>
      </div>

      {/* String value */}
      {keyData.type === "string" && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontWeight: "600",
                color: "#334155",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: 0,
              }}
            >
              <span style={{ fontSize: "14px" }}>📝</span>
              String Value
            </h3>
          </div>
          <div style={{ padding: "24px" }}>
            <pre
              style={{
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "14px",
                color: "#334155",
                fontFamily: "ui-monospace, monospace",
                border: "1px solid #e2e8f0",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0,
                minHeight: "60px",
                width: "100%",
              }}
            >
              {keyData.value}
            </pre>

            <div style={{ marginTop: "16px" }}>
              <button
                type="button"
                onClick={handleDeleteKey}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "14px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hash fields */}
      {keyData.type === "hash" && keyData.fields && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontWeight: "600",
                color: "#334155",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: 0,
              }}
            >
              <span style={{ fontSize: "14px" }}>#️⃣</span>
              Hash Fields ({Object.keys(keyData.fields).length})
            </h3>
          </div>
          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {Object.entries(keyData.fields).map(([field, val]) => (
                <div
                  key={field}
                  style={{
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "500",
                        color: "#334155",
                        fontSize: "14px",
                      }}
                    >
                      {field}
                    </div>
                    <div
                      style={{
                        color: "#475569",
                        fontSize: "14px",
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      {val}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteField(field)}
                    title="Delete field"
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      fontSize: "12px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyDetail;
