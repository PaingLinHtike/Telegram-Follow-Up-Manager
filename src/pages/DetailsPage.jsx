import { useState } from "react";
import {
  ArrowLeft,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { CONTACTS } from "../data";

export default function DetailsPage({ contactId, onNavigate }) {
  const contact = CONTACTS.find((c) => c.id === contactId) || CONTACTS[0];
  const [isReplied, setIsReplied] = useState(contact.status === "replied");
  const [note, setNote] = useState(contact.note);
  const [isEditingNote, setIsEditingNote] = useState(false);

  const handleMarkReplied = () => {
    setIsReplied(true);
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <header
        className="glass-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          height: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onNavigate("inbox")}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#E2E7FF",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={18} color="#131B2E" strokeWidth={2} />
          </motion.button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={contact.avatar}
              alt={contact.name}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#131B2E",
                  lineHeight: "18px",
                }}
              >
                {contact.name}
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#3E484F",
                  letterSpacing: "0.01em",
                }}
              >
                {contact.handle}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="screen-content" style={{ paddingBottom: 130 }}>
        <div
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Status banner */}
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: isReplied ? "#6FFBBE" : "#FFDDB8",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {isReplied ? (
              <CheckCircle2 size={16} color="#005236" strokeWidth={2.5} />
            ) : (
              <AlertCircle size={16} color="#422700" strokeWidth={2.5} />
            )}
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: isReplied ? "#005236" : "#422700",
              }}
            >
              {isReplied
                ? "Follow-up completed"
                : "Awaiting your reply — " + contact.priority + " priority"}
            </span>
          </div>

          {/* Message received */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 8,
              }}
            >
              <Send size={12} color="#00658E" strokeWidth={2} fill="#00658E" />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#00658E",
                }}
              >
                INCOMING TELEGRAM
              </span>
            </div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 500,
                lineHeight: "21px",
                color: "#131B2E",
              }}
            >
              {contact.message}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 8,
              }}
            >
              <Clock size={11} color="#3E484F" />
              <span style={{ fontSize: 11, color: "#3E484F" }}>
                {contact.time}
              </span>
            </div>
          </div>

          {/* Your Note */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Star
                  size={12}
                  color="#CF8400"
                  fill="#CF8400"
                  strokeWidth={0}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#CF8400",
                  }}
                >
                  {contact.noteType}
                </span>
              </div>
              <button
                onClick={() => setIsEditingNote(!isEditingNote)}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#229ED9",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {isEditingNote ? "Save" : "Edit"}
              </button>
            </div>
            {isEditingNote ? (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => setIsEditingNote(false)}
                autoFocus
                style={{
                  width: "100%",
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "19.25px",
                  color: "#131B2E",
                  border: "1px solid #E2E7FF",
                  borderRadius: 8,
                  padding: "8px 10px",
                  resize: "none",
                  fontFamily: "inherit",
                  minHeight: 72,
                }}
              />
            ) : (
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "19.25px",
                  color: "#131B2E",
                }}
              >
                {note}
              </p>
            )}
          </div>

          {/* Schedule/Remind block */}
          <div
            style={{
              background: "#EEF0FF",
              borderRadius: 12,
              padding: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Calendar size={20} color="#00658E" strokeWidth={2} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#131B2E" }}>
                Set Reminder
              </p>
              <p style={{ fontSize: 11, color: "#3E484F", marginTop: 2 }}>
                Schedule a follow-up reminder for this contact
              </p>
            </div>
            <button
              style={{
                padding: "6px 14px",
                background: "#00658E",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                color: "white",
              }}
            >
              Set
            </button>
          </div>
        </div>
      </main>

      {/* Sticky bottom reply button */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 0,
          right: 0,
          padding: "12px 16px",
          background: "linear-gradient(to top, #FAF8FF 70%, transparent)",
        }}
      >
        {!isReplied ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMarkReplied}
            style={{
              width: "100%",
              padding: "14px",
              background: "#229ED9",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 14px rgba(34,158,217,0.3)",
            }}
          >
            <CheckCircle2 size={18} color="white" strokeWidth={2.5} />
            <span style={{ fontSize: 15, fontWeight: 700, color: "white" }}>
              Mark as Replied
            </span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            style={{
              width: "100%",
              padding: "14px",
              background: "#6FFBBE",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 14px rgba(0,108,73,0.2)",
            }}
          >
            <CheckCircle2 size={18} color="#005236" strokeWidth={2.5} />
            <span style={{ fontSize: 15, fontWeight: 700, color: "#005236" }}>
              Replied ✓
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
