import { motion } from 'framer-motion'

export default function MetricCard({ icon, badge, value, label, overlayColor }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02, boxShadow: '0 8px 16px -4px rgba(0,0,0,0.08)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        flex: 1,
        position: 'relative',
        padding: 8,
        background: '#FFFFFF',
        borderRadius: 12,
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 80,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.span whileHover={{ scale: 1.2, rotate: 10 }} style={{ fontSize: 18, display: 'inline-block' }}>
          {icon}
        </motion.span>
        <span style={{
          fontSize: 10, fontWeight: 600, lineHeight: '20px',
          padding: '2px 6px', borderRadius: 9999,
          background: badge.bg, color: badge.text,
        }}>
          {badge.label}
        </span>
      </div>
      <div style={{ paddingTop: 4 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <motion.span
            key={value}
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            style={{
              fontSize: 26, fontWeight: 800, lineHeight: '26px',
              letterSpacing: '-0.015em', color: '#131B2E', display: 'inline-block',
            }}
          >
            {value}
          </motion.span>
          <span style={{ fontSize: 11, fontWeight: 500, lineHeight: '14px', letterSpacing: '0.01em', color: '#3E484F' }}>
            {label}
          </span>
        </div>
      </div>
      <div style={{
        position: 'absolute', top: 0, left: 72,
        width: 48, height: 48,
        borderRadius: '0 0 0 9999px',
        background: overlayColor, pointerEvents: 'none',
      }} />
    </motion.div>
  )
}
