import { useState } from 'react'
import {
  Bell,
  RefreshCw,
  Moon,
  Shield,
  ChevronRight,
  LogOut,
  Info,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import profileAvatar from '../assets/profile-avatar.png'

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    style={{
      width: 44,
      height: 24,
      borderRadius: 9999,
      background: checked ? '#229ED9' : '#D1D5DB',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background 0.2s',
      flexShrink: 0,
    }}
  >
    <motion.span
      animate={{ x: checked ? 22 : 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{
        position: 'absolute',
        top: 2,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        display: 'block',
      }}
    />
  </button>
)

const SettingRow = ({ icon: Icon, label, subtitle, right }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px',
      background: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.04)',
    }}
  >
    <span
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        background: '#F0F4F8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={17} color="#00658E" strokeWidth={2} />
    </span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#131B2E', lineHeight: '20px' }}>
        {label}
      </p>
      {subtitle && (
        <p style={{ fontSize: 12, color: '#3E484F', marginTop: 1 }}>{subtitle}</p>
      )}
    </div>
    {right}
  </div>
)

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSync, setAutoSync] = useState(true)

  return (
    <div className="screen-container">
      <Header title="Class-Com" subtitle="Settings" />

      <main className="screen-content">
        {/* Profile card */}
        <div style={{ padding: '20px 16px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px',
              background: 'white',
              borderRadius: 16,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              marginBottom: 24,
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={profileAvatar}
                alt="Profile"
                style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#006C49',
                  border: '2px solid white',
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#131B2E', lineHeight: '22px' }}>
                My Profile
              </p>
              <p style={{ fontSize: 13, color: '#3E484F', marginTop: 2 }}>@username · Active now</p>
            </div>
            <ChevronRight size={16} color="#3E484F" strokeWidth={2} />
          </motion.div>

          {/* Section: Preferences */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#3E484F',
              textTransform: 'uppercase',
              paddingLeft: 4,
              marginBottom: 8,
            }}
          >
            Preferences
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          style={{
            background: 'white',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            marginBottom: 24,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <SettingRow
            icon={Bell}
            label="Notifications"
            subtitle="Push alerts for new follow-ups"
            right={<Toggle checked={notifications} onChange={setNotifications} />}
          />
          <SettingRow
            icon={RefreshCw}
            label="Auto Sync"
            subtitle="Sync Telegram contacts automatically"
            right={<Toggle checked={autoSync} onChange={setAutoSync} />}
          />
          <SettingRow
            icon={Moon}
            label="Dark Mode"
            subtitle="Switch to dark theme"
            right={<Toggle checked={darkMode} onChange={setDarkMode} />}
          />
        </motion.div>

        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#3E484F',
              textTransform: 'uppercase',
              paddingLeft: 4,
              marginBottom: 8,
            }}
          >
            Account
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          style={{
            background: 'white',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            marginBottom: 24,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <SettingRow
            icon={Shield}
            label="Privacy & Security"
            subtitle="Manage data and permissions"
            right={<ChevronRight size={16} color="#3E484F" strokeWidth={2} />}
          />
          <SettingRow
            icon={Info}
            label="About"
            subtitle="Class-Com v1.0.0"
            right={<ChevronRight size={16} color="#3E484F" strokeWidth={2} />}
          />
        </motion.div>

        {/* Sign out */}
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '13px',
              background: '#FFF1F0',
              borderRadius: 14,
              border: '1px solid rgba(220,38,38,0.12)',
              cursor: 'pointer',
            }}
          >
            <LogOut size={16} color="#DC2626" strokeWidth={2} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#DC2626' }}>Sign Out</span>
          </motion.button>
        </div>
      </main>
    </div>
  )
}
