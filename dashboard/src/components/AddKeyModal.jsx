const AddKeyModal = ({
  onClose,
  onSubmit,
  keyType,
  setKeyType,
  newKey,
  setNewKey,
  stringValue,
  setStringValue,
  hashFields,
  setHashFields,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "32px",
          borderRadius: "20px",
          width: "480px",
          maxWidth: "90vw",
          border: "1px solid rgba(203, 213, 225, 0.6)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(203, 213, 225, 0.6)",
          }}
        >
          <div
            style={{
              padding: "8px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{ color: "white", fontSize: "16px" }}>➕</span>
          </div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            Add New Key
          </h3>
        </div>

        <form onSubmit={onSubmit}>
          {/* Key Name */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Key Name</label>
            <input
              required
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Enter key name..."
              style={inputStyle}
            />
          </div>

          {/* Type */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Key Type</label>
            <select
              value={keyType}
              onChange={(e) => setKeyType(e.target.value)}
              style={selectStyle}
            >
              <option value="string">📝 String</option>
              <option value="hash">#️⃣ Hash</option>
            </select>
          </div>

          {/* Value / Fields */}
          {keyType === "string" ? (
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Value</label>
              <input
                required
                value={stringValue}
                onChange={(e) => setStringValue(e.target.value)}
                placeholder="Enter string value..."
                style={inputStyle}
              />
            </div>
          ) : (
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Fields (JSON Format)</label>
              <textarea
                rows={4}
                value={hashFields}
                onChange={(e) => setHashFields(e.target.value)}
                placeholder='{"field1": "value1", "field2": "value2"}'
                style={textareaStyle}
              />
            </div>
          )}

          {/* Buttons */}
          <div style={buttonWrapperStyle}>
            <button type="button" onClick={onClose} style={cancelBtnStyle}>
              Cancel
            </button>
            <button type="submit" style={submitBtnStyle}>
              ➕ Add Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKeyModal;

// Styles
const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "500",
  color: "#334155",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  backgroundColor: "#f1f5f9",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#334155",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none",
  paddingRight: "40px",
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 12px center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "16px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "120px",
  fontFamily: "ui-monospace, monospace",
};

const buttonWrapperStyle = {
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: "1px solid rgba(203, 213, 225, 0.6)",
};

const cancelBtnStyle = {
  padding: "12px 20px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: "#475569",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
};

const submitBtnStyle = {
  padding: "12px 20px",
  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};
