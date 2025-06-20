import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import KeyDetail from "./components/KeyDetail";
import AddKeyModal from "./components/AddKeyModal";

function App() {
  const [keys, setKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [keyLoading, setKeyLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [keyType, setKeyType] = useState("string");
  const [stringValue, setStringValue] = useState("");
  const [hashFields, setHashFields] = useState("");
  const [justSaved, setJustSaved] = useState(false);

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

  const triggerSave = () => {
    fetch("http://localhost:8080/save", {
      method: "GET",
    }).then(() => {
      console.log("✅ Data saved");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1500);
    });
  };

  const handleAddKey = (e) => {
    e.preventDefault();

    if (keyType === "string") {
      fetch("http://localhost:8080/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newKey, value: stringValue }),
      }).then(() => {
        const updated = [...keys, newKey];
        setKeys(updated);
        setFilteredKeys(updated);
        setSelectedKey(newKey);
        setShowModal(false);
        triggerSave();
      });
    } else if (keyType === "hash") {
      let fieldsObj;
      try {
        fieldsObj = JSON.parse(hashFields);
      } catch (err) {
        alert("Invalid JSON for fields");
        return err;
      }

      fetch("http://localhost:8080/hset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newKey, fields: fieldsObj }),
      }).then(() => {
        const updated = [...keys, newKey];
        setKeys(updated);
        setFilteredKeys(updated);
        setSelectedKey(newKey);
        setShowModal(false);
        triggerSave();
      });
    }
  };

  const handleDeleteKey = () => {
    if (!selectedKey) return;

    console.log("Attempting DELETE on:", selectedKey);

    if (!confirm(`Are you sure you want to delete "${selectedKey}"?`)) return;

    fetch(`http://localhost:8080/key/${selectedKey}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("DELETE RESPONSE:", res.status, text);

        if (res.ok) {
          const updated = keys.filter((k) => k !== selectedKey);
          setKeys(updated);
          setFilteredKeys(updated);
          setSelectedKey(null);
          setKeyData(null);
          triggerSave();
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleDeleteField = (field) => {
    if (!selectedKey || !field) return;
    if (!confirm(`Are you sure you want to delete field "${field}"?`)) return;

    fetch("http://localhost:8080/hdel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: selectedKey,
        field: field,
      }),
    })
      .then((res) => {
        if (res.ok) {
          const updatedFields = { ...keyData.fields };
          delete updatedFields[field];
          setKeyData({ ...keyData, fields: updatedFields });
          triggerSave(); // 💾
        } else {
          console.error("Failed to delete field:", res.status);
        }
      })
      .catch((err) => console.error("Error deleting field:", err));
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
        <Sidebar
          keys={keys}
          filteredKeys={filteredKeys}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowModal={setShowModal}
          loading={loading}
        />

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
              <KeyDetail
                selectedKey={selectedKey}
                keyData={keyData}
                keyLoading={keyLoading}
                copyToClipboard={copyToClipboard}
                handleDeleteKey={handleDeleteKey}
                handleDeleteField={handleDeleteField}
              />
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

      {showModal && (
        <AddKeyModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddKey}
          keyType={keyType}
          setKeyType={setKeyType}
          newKey={newKey}
          setNewKey={setNewKey}
          stringValue={stringValue}
          setStringValue={setStringValue}
          hashFields={hashFields}
          setHashFields={setHashFields}
        />
      )}
      {justSaved && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            backgroundColor: "#10b981",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          💾 Saved to disk
        </div>
      )}
    </>
  );
}

export default App;
