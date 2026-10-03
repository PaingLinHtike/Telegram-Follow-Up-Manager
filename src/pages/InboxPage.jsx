import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import MetricCard from '../components/MetricCard'
import FilterChip from '../components/FilterChip'
import FollowUpCard from '../components/FollowUpCard'
import { CONTACTS } from '../data'

const FILTER_OPTS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'replied', label: 'Replied' },
  { id: 'urgent', label: 'Urgent', urgent: true },
]

export default function InboxPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('pending')
  const [contacts, setContacts] = useState(CONTACTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState(null)

  const toggleStatus = (id) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'pending' ? 'replied' : 'pending' }
          : c
      )
    )
    const c = contacts.find((x) => x.id === id)
    const nextStatus = c?.status === 'pending' ? 'replied' : 'pending'
    setToast(nextStatus === 'replied' ? 'Task marked as replied!' : 'Moved back to pending')
    setTimeout(() => setToast(null), 2500)
  }

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
    setToast('Conversation deleted')
    setTimeout(() => setToast(null), 2500)
  }

  const filtered = contacts.filter((contact) => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'replied'
        ? contact.status === 'replied'
        : activeFilter === 'pending'
        ? contact.status === 'pending'
        : activeFilter === 'urgent'
        ? contact.priority === 'High'
        : true

    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !query ||
      contact.name.toLowerCase().includes(query) ||
      contact.handle.toLowerCase().includes(query) ||
      contact.message.toLowerCase().includes(query) ||
      contact.note.toLowerCase().includes(query)

    return matchesFilter && matchesSearch
  })

  const pendingCount = contacts.filter((c) => c.status === 'pending').length
  const repliedCount = contacts.filter((c) => c.status === 'replied').length
  const urgentCount = contacts.filter((c) => c.priority === 'High').length

  return (
    <div className="screen-container">
      <Header title="Class-Com" subtitle="Inbox" />
      <Header
        title="Class-Com"
        subtitle="Inbox"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search follow-ups..."
      />

      {/* Main scrollable area */}
      <main className="screen-content">
        {/* Inner content with padding */}
        <div style={{ padding: '16px 16px 0' }}>

          {/* Operational Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 4px 0',
              marginBottom: 16,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: '24px',
                  letterSpacing: '-0.025em',
                  color: '#131B2E',
                }}
              >
                Daily Follow-Ups
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span
                  style={{
                    width: 7.91,
                    height: 8,
                    borderRadius: '50%',
                    background: '#006C49',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                <div className="pulse-ring-dot" style={{ marginRight: 2 }} />
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#3E484F',
                  }}
                >
                  Telegram sync live • {pendingCount} pending updates
                </p>
              </div>
            </div>
          </div>

          {/* KPI Metric Cards */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <MetricCard
              icon="⏳"
              badge={{ bg: '#FFDDB8', text: '#422700', label: 'Action' }}
              value={pendingCount}
              label="Pending Replies"
              overlayColor="rgba(255,185,95,0.2)"
            />
            <MetricCard
              icon="✅"
              badge={{ bg: '#6FFBBE', text: '#005236', label: '+4' }}
              value={repliedCount}
              label="Replied Today"
              overlayColor="rgba(111,251,190,0.3)"
            />
            <MetricCard
              icon="🚨"
              badge={{ bg: '#FFDAD6', text: '#93000A', label: 'ASAP' }}
              value={urgentCount}
              label="Urgent Pri"
              overlayColor="rgba(255,218,214,0.4)"
            />
          </div>

          {/* Filter Chips */}
          <div className="chips-scroll" style={{ marginBottom: 16 }}>
            {FILTER_OPTS.map((opt) => (
              <FilterChip
                key={opt.id}
                label={opt.label}
                count={
                  opt.id === 'pending'
                    ? pendingCount
                    : opt.id === 'replied'
                    ? repliedCount
                    : opt.id === 'urgent'
                    ? urgentCount
                    : contacts.length
                }
                active={activeFilter === opt.id}
                urgent={opt.urgent}
                onClick={() => setActiveFilter(opt.id)}
              />
            ))}
          </div>
        </div>

        {/* Follow-Up Feed */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((contact) => (
              <motion.div
                key={contact.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FollowUpCard
                  contact={contact}
                  onStatusToggle={toggleStatus}
                  onOpenDetails={() => onNavigate('details', contact.id)}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: '#3E484F', padding: '32px 16px' }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#131B2E', marginBottom: 4 }}>
                No results found
              </p>
              <p style={{ fontSize: 13 }}>
                {searchQuery ? `No follow-ups matching "${searchQuery}"` : 'No follow-ups in this category.'}
              </p>
            </div>
          )}

          {/* Floating + Add Task button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('add')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px 12px 14px',
                background: '#00658E',
                borderRadius: 9999,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)',
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={10.5} color="white" strokeWidth={2.5} />
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '20px',
                  letterSpacing: '0.025em',
                  color: '#FFFFFF',
                }}
              >
                Add Task
              </span>
            </motion.button>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 15, scale: 0.95, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            style={{
              position: 'absolute',
              bottom: 74,
              left: '50%',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: 'rgba(19, 27, 46, 0.92)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: 9999,
              zIndex: 100,
              boxShadow: '0px 10px 25px -5px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span style={{ fontSize: 13 }}>✨</span>
            <p style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 600, letterSpacing: '0.01em' }}>
              {toast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
