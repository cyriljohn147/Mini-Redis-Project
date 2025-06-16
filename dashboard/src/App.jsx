import { useEffect, useState } from "react";

function App() {
  const [keys, setKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [keyLoading, setKeyLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/keys")
      .then((res) => res.json())
      .then((data) => {
        setKeys(data);
        setFilteredKeys(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedKey) {
      setKeyLoading(true);
      fetch(`http://localhost:8080/key/${selectedKey}`)
        .then((res) => res.json())
        .then((data) => {
          setKeyData(data);
          setKeyLoading(false);
        })
        .catch(() => {
          setKeyData(null);
          setKeyLoading(false);
        });
    }
  }, [selectedKey]);

  useEffect(() => {
    const filtered = keys.filter((key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredKeys(filtered);
  }, [searchTerm, keys]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    width: "24px",
    height: "24px",
    border: "2px solid #e2e8f0",
    borderTop: "2px solid #64748b",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          height: "100vh",
          display: "flex",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          width: "100vw",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "320px",
            minWidth: "320px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(203, 213, 225, 0.6)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px",
              borderBottom: "1px solid rgba(203, 213, 225, 0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  padding: "8px",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <span style={{ color: "white", fontSize: "20px" }}>🗄️</span>
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    margin: 0,
                  }}
                >
                  Redis Browser
                </h1>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                  {keys.length} keys total
                </p>
              </div>
            </div>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              >
                🔍
              </span>
              <input
                type="text"
                placeholder="Search keys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  color: "black",
                  width: "100%",
                  paddingLeft: "40px",
                  paddingRight: "16px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ef4444";
                  e.target.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Keys List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "32px 0",
                }}
              >
                <div style={spinnerStyle}></div>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {filteredKeys.map((key) => (
                  <div
                    key={key}
                    onClick={() => setSelectedKey(key)}
                    style={{
                      cursor: "pointer",
                      padding: "12px",
                      borderRadius: "12px",
                      border:
                        selectedKey === key
                          ? "1px solid #fecaca"
                          : "1px solid rgba(203, 213, 225, 0.6)",
                      background:
                        selectedKey === key
                          ? "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)"
                          : "rgba(255, 255, 255, 0.6)",
                      // boxShadow:
                      //   selectedKey === key
                      //     ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      //     : "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedKey !== key) {
                        e.target.style.backgroundColor = "white";
                        e.target.style.borderColor = "#94a3b8";
                        // e.target.style.boxShadow =
                        //   "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedKey !== key) {
                        e.target.style.backgroundColor =
                          "rgba(255, 255, 255, 0.6)";
                        e.target.style.borderColor = "rgba(203, 213, 225, 0.6)";
                        // e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          padding: "6px",
                          borderRadius: "8px",
                          backgroundColor:
                            selectedKey === key ? "#ef4444" : "#f1f5f9",
                          color: selectedKey === key ? "white" : "#64748b",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>🔑</span>
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#334155",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {key}
                      </span>
                    </div>
                  </div>
                ))}
                {filteredKeys.length === 0 && !loading && (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <span style={{ fontSize: "32px" }}>🗄️</span>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      No keys found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            width: "100%",
          }}
        >
          {!selectedKey ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    padding: "16px",
                    background:
                      "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                    borderRadius: "16px",
                    marginBottom: "16px",
                    width: "fit-content",
                    margin: "0 auto 16px",
                  }}
                >
                  <span style={{ fontSize: "48px" }}>🔑</span>
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#334155",
                    marginBottom: "8px",
                  }}
                >
                  Select a Redis Key
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    maxWidth: "384px",
                    margin: 0,
                  }}
                >
                  Choose a key from the sidebar to view its data and properties
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                padding: "32px",
                width: "100%",
                boxSizing: "border-box",
                overflowX: "auto",
              }}
            >
              {keyLoading ? (
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
                        ...spinnerStyle,
                        width: "32px",
                        height: "32px",
                        borderTopColor: "#ef4444",
                        margin: "0 auto 12px",
                      }}
                    ></div>
                    <p style={{ color: "#475569" }}>Loading key data...</p>
                  </div>
                </div>
              ) : keyData ? (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "none",
                  }}
                >
                  {/* Key Header */}
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
                        onMouseEnter={(e) => {
                          e.target.style.color = "#334155";
                          e.target.style.backgroundColor = "#f1f5f9";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#64748b";
                          e.target.style.backgroundColor = "transparent";
                        }}
                        title="Copy key name"
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

                  {/* Key Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
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
                            background:
                              "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
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
                          <div style={{ position: "relative" }}>
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
                                wordBreak: "break-words",
                                margin: 0,
                                minHeight: "60px",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              {keyData.value}
                            </pre>
                            <button
                              onClick={() => copyToClipboard(keyData.value)}
                              style={{
                                position: "absolute",
                                top: "12px",
                                right: "12px",
                                padding: "6px",
                                backgroundColor: "white",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                cursor: "pointer",
                                opacity: 0,
                                transition: "opacity 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#f8fafc";
                                e.target.parentElement.style.opacity = 1;
                              }}
                              title="Copy value"
                            >
                              <span style={{ fontSize: "12px" }}>📋</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

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
                            background:
                              "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
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
                            {Object.entries(keyData.fields).map(
                              ([field, val]) => (
                                <div
                                  key={field}
                                  style={{
                                    position: "relative",
                                    backgroundColor: "#f8fafc",
                                    borderRadius: "12px",
                                    padding: "16px",
                                    border: "1px solid #e2e8f0",
                                    transition: "border-color 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.borderColor = "#cbd5e1";
                                    const button =
                                      e.target.querySelector("button");
                                    if (button) button.style.opacity = "1";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.borderColor = "#e2e8f0";
                                    const button =
                                      e.target.querySelector("button");
                                    if (button) button.style.opacity = "0";
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      justifyContent: "space-between",
                                      gap: "16px",
                                    }}
                                  >
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div
                                        style={{
                                          fontWeight: "500",
                                          color: "#334155",
                                          marginBottom: "4px",
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
                                          wordBreak: "break-words",
                                        }}
                                      >
                                        {val}
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => copyToClipboard(val)}
                                      style={{
                                        padding: "6px",
                                        backgroundColor: "white",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        opacity: 0,
                                        transition: "all 0.2s ease",
                                        flexShrink: 0,
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor =
                                          "#f8fafc";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor =
                                          "white";
                                      }}
                                      title="Copy field value"
                                    >
                                      <span style={{ fontSize: "12px" }}>
                                        📋
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          )}

          {/* Copy Notification */}
          {copied && (
            <div
              style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                backgroundColor: "#10b981",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                animation: "pulse 2s ease-in-out",
              }}
            >
              Copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
