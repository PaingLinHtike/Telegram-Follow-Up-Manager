import { Send, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import StatusPill from "./StatusPill";

export default function FollowUpCard({
  contact,
  onStatusToggle,
  onOpenDetails,
  onDelete,
}) {
  const isReplied = contact.status === "replied";
  const cardBg = isReplied ? "rgba(255,255,255,0.8)" : "#FFFFFF";
  const noteLabel = isReplied ? "HANDLED ON TELEGRAM" : "INCOMING TELEGRAM";
  const noteLabelColor = isReplied ? "#006C49" : "#00658E";
  const msgBg = isReplied ? "rgba(242,243,255,0.6)" : "#F2F3FF";

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0px 6px 16px 0px rgba(0,0,0,0.06)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => onOpenDetails(contact.id)}
      style={{
        background: cardBg,
        borderRadius: 12,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
        transition: "background 0.25s ease, opacity 0.25s ease",
        cursor: "pointer",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Avatar + Name + Handle + Time */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Avatar stack */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={contact.avatar}
              alt={contact.name}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Online/Telegram indicator */}
            <div
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: isReplied ? "#006C49" : "#229ED9",
                border: "2px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={6} color="white" fill="white" strokeWidth={0} />
            </div>
          </div>

          {/* Name + info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "17.5px",
                  color: "#131B2E",
                  opacity: isReplied ? 0.7 : 1,
                }}
              >
                {contact.name}
              </span>
              {contact.online && !isReplied && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#006C49",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: "14px",
                  color: "#3E484F",
                  letterSpacing: "0.01em",
                }}
              >
                {contact.handle}
              </span>
              <span style={{ fontSize: 11, color: "#3E484F", opacity: 0.6 }}>
                ·
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  lineHeight: "14px",
                  color: "#3E484F",
                  letterSpacing: "0.01em",
                  opacity: 0.7,
                }}
              >
                {contact.time}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Priority Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 8px",
            borderRadius: 9999,
            background: contact.priorityColor.bg,
          }}
        >
          {contact.priority !== "Done" && (
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: contact.priorityColor.text,
                flexShrink: 0,
              }}
            />
          )}
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              lineHeight: "20px",
              color: contact.priorityColor.text,
            }}
          >
            {contact.priority}
          </span>
        </div>
      </div>

      {/* Message Callout */}
      <div
        style={{
          padding: 8,
          background: msgBg,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Source label */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Send
            size={12.5}
            color={noteLabelColor}
            fill={noteLabelColor}
            strokeWidth={0}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              lineHeight: "14px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: noteLabelColor,
            }}
          >
            {noteLabel}
          </span>
        </div>
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: "19.25px",
            color: isReplied ? "rgba(19,27,46,0.8)" : "#131B2E",
          }}
        >
          {contact.message}
        </p>
      </div>

      {/* Follow-up Note */}
      <div style={{ display: "flex", gap: 8, padding: "0 4px" }}>
        <div style={{ paddingTop: 2, flexShrink: 0 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: isReplied ? "#006C49" : "#CF8400",
            }}
          />
        </div>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "17.5px",
            color: "#131B2E",
          }}
        >
          <span style={{ color: "#3E484F", fontWeight: 400 }}>
            {contact.noteType}:{" "}
          </span>
          {contact.note}
        </p>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 2,
        }}
      >
        <StatusPill
          status={contact.status}
          onClick={(e) => { e.stopPropagation(); onStatusToggle(contact.id); }}
        />

        {/* Quick CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Reply via Telegram button */}
          <motion.button
            whileHover={{ scale: 1.04, background: "#D3DBFF" }}
            whileTap={{ scale: 0.94 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "#E2E7FF",
              transition: "background 0.2s",
            }}
            onClick={(e) => { e.stopPropagation(); onOpenDetails(contact.id); }}
          >
            <Send size={12} color="#00658E" strokeWidth={2} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                lineHeight: "20px",
                color: "#131B2E",
              }}
            >
              Reply
            </span>
          </motion.button>

          {/* Delete button */}
          <motion.button
            whileHover={{ scale: 1.08, background: "#FFC1B8" }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "#FFDAD6",
              transition: "background 0.15s ease",
            }}
            onClick={(e) => { e.stopPropagation(); onDelete && onDelete(contact.id); }}
            aria-label="Delete conversation"
            title="Delete conversation"
          >
            <Trash2 size={15} color="#BA1A1A" strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
