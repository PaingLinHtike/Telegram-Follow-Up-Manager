import { motion } from 'framer-motion'

export default function FilterChip({ label, count, active, urgent, onClick }) {
  const isActive = active

  if (isActive) {
    return (
      <motion.button
        layout
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 9999,
          border: 'none',
          cursor: 'pointer',
          background: '#229ED9',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          boxShadow: '0 2px 6px rgba(34, 158, 217, 0.35)',
        }}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#FFFFFF',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.02em', color: '#FFFFFF' }}>
          {label}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', color: '#FFFFFF', opacity: 0.9 }}>
          {count}
        </span>
      </motion.button>
    )
  }

  if (urgent) {
    return (
      <motion.button
        layout
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '6px 12px',
          borderRadius: 9999,
          border: 'none',
          cursor: 'pointer',
          background: '#E2E7FF',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.02em', color: '#131B2E' }}>
          {label}
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '16px', letterSpacing: '0.02em', color: '#BA1A1A' }}>
          {count}
        </span>
      </motion.button>
    )
  }

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 12px',
        borderRadius: 9999,
        border: 'none',
        cursor: 'pointer',
        background: '#E2E7FF',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.02em', color: '#131B2E' }}>
        {label}
      </span>
      <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.02em', color: '#131B2E', opacity: 0.7 }}>
        {count}
      </span>
    </motion.button>
  )
}
