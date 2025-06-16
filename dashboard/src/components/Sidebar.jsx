const Sidebar = ({
  keys,
  filteredKeys,
  selectedKey,
  setSelectedKey,
  searchTerm,
  setSearchTerm,
  setShowModal,
  loading,
}) => {
  const spinnerStyle = {
    width: "24px",
    height: "24px",
    border: "2px solid #e2e8f0",
    borderTop: "2px solid #64748b",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
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
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
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
                background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
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
          />
        </div>
      </div>

      {/* Keys List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            marginBottom: "16px",
            padding: "10px",
            backgroundColor: "#10b981",
            color: "white",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          ➕ Add New Key
        </button>

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
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                  transition: "all 0.2s ease",
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
  );
};

export default Sidebar;
