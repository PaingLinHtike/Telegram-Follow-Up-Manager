import { useState } from "react";
import { Search, UserPlus, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { CONTACTS } from "../data";

export default function ContactsPage({ onNavigate }) {
  const [query, setQuery] = useState("");

  const filtered = CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="screen-container">
      <Header
        title="Class-Com"
        subtitle="Contacts"
        searchQuery={query}
        onSearchChange={setQuery}
        placeholder="Search contacts..."
      />

      <main className="screen-content">
        <div style={{ padding: "16px 16px 0" }}>
          {/* Title */}
          <h1
            style={{
              fontSize: 18,
              fontWeight: 700,
              lineHeight: "24px",
              letterSpacing: "-0.025em",
              color: "#131B2E",
              marginBottom: 4,
              padding: "4px 4px 0",
            }}
          >
            Telegram Directory
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#3E484F",
              marginBottom: 16,
              padding: "0 4px",
            }}
          >
            {CONTACTS.length} contacts synced
          </p>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: "white",
              borderRadius: 12,
              marginBottom: 16,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <Search size={16} color="#3E484F" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                fontSize: 14,
                color: "#131B2E",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Contacts list */}
        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {filtered.map((contact, i) => (
            <motion.button
              key={contact.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onNavigate("details", contact.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 12,
                background: "white",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "background 0.2s ease",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                {contact.online && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 1,
                      right: 1,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#006C49",
                      border: "2px solid white",
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#131B2E",
                    lineHeight: "17.5px",
                  }}
                >
                  {contact.name}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#3E484F",
                    letterSpacing: "0.01em",
                    marginTop: 2,
                  }}
                >
                  {contact.handle}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 9999,
                    background: contact.priorityColor.bg,
                    color: contact.priorityColor.text,
                  }}
                >
                  {contact.status === "replied" ? "Done" : contact.priority}
                </span>
                <ChevronRight size={14} color="#3E484F" strokeWidth={2} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Add contact CTA */}
        <div style={{ padding: "16px 16px 0" }}>
          <button
            onClick={() => onNavigate("add")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px",
              borderRadius: 12,
              border: "1.5px dashed #229ED9",
              background: "rgba(34,158,217,0.04)",
              cursor: "pointer",
            }}
          >
            <UserPlus size={16} color="#229ED9" strokeWidth={2} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#229ED9" }}>
              Add New Contact
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
