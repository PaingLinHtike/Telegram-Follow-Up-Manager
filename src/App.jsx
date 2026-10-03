import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './components/BottomNav'
import InboxPage from './pages/InboxPage'
import DetailsPage from './pages/DetailsPage'
import ContactsPage from './pages/ContactsPage'
import AddFollowUpPage from './pages/AddFollowUpPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('inbox')
  const [selectedContactId, setSelectedContactId] = useState(1)

  const handleNavigate = (screen, contactId = null) => {
    if (contactId) {
      setSelectedContactId(contactId)
    }
    setCurrentScreen(screen)
  }

  return (
    <div className="app-root">
      {/* Device frame container */}
      <div className="mobile-shell">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%' }}
          >
            {currentScreen === 'inbox' && (
              <InboxPage onNavigate={handleNavigate} />
            )}
            {currentScreen === 'details' && (
              <DetailsPage contactId={selectedContactId} onNavigate={handleNavigate} />
            )}
            {currentScreen === 'contacts' && (
              <ContactsPage onNavigate={handleNavigate} />
            )}
            {currentScreen === 'add' && (
              <AddFollowUpPage onNavigate={handleNavigate} />
            )}
            {currentScreen === 'settings' && (
              <SettingsPage onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Fixed bottom navigation inside phone frame */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 40,
          }}
        >
          <BottomNav active={currentScreen} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  )
}

