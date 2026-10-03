import { motion } from 'framer-motion'

export default function StatusPill({ status, onClick }) {
  const isReplied = status === 'replied'

  const style = isReplied
    ? { bg: '#6FFBBE', dot: '#006C49', text: '#005236', label: 'Replied' }
    : { bg: '#FFDDB8', dot: '#CF8400', text: '#422700', label: 'Pending' }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 9999,
        border: 'none',
        cursor: 'pointer',
        background: style.bg,
        transition: 'background 0.25s ease',
      }}
    >
      <motion.span
        key={status}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        style={{ width: 8, height: 8, borderRadius: '50%', background: style.dot, flexShrink: 0 }}
      />
      <span style={{ fontSize: 11, fontWeight: 600, lineHeight: '20px', color: style.text }}>
        {style.label}
      </span>
    </motion.button>
  )
}
