import { Inbox, Users, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'inbox', label: 'Inbox', Icon: Inbox },
  { id: 'contacts', label: 'Contacts', Icon: Users },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="glass-nav border-t border-black/5">
      <div
        style={{ padding: '0 8px', height: 64, display: 'flex', alignItems: 'center' }}
      >
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <motion.button
              key={id}
              whileTap={{ scale: 0.86 }}
              onClick={() => onNavigate(id)}
              style={{
                position: 'relative',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '4px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  style={{
                    position: 'absolute',
                    top: -2,
                    width: 32,
                    height: 3,
                    borderRadius: 9999,
                    background: '#229ED9',
                  }}
                />
              )}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              >
                <Icon
                  size={20}
                  color={isActive ? '#229ED9' : '#3E484F'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </motion.div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  lineHeight: '16px',
                  letterSpacing: '0.02em',
                  color: isActive ? '#229ED9' : '#3E484F',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
