import { useState } from 'react'
import { ArrowLeft, Send, ChevronDown, Clock, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { CONTACTS } from '../data'

const PRIORITY_OPTIONS = ['High', 'Med', 'Low']

export default function AddFollowUpPage({ onNavigate }) {
  const [form, setForm] = useState({
    contact: '',
    message: '',
    note: '',
    priority: 'Med',
    scheduleReminder: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onNavigate('inbox')
    }, 1500)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'white',
    border: '1.5px solid #E2E7FF',
    borderRadius: 10,
    fontSize: 14,
    color: '#131B2E',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#3E484F',
    marginBottom: 6,
    display: 'block',
  }

  return (
    <div className="screen-container">
      {/* Header */}
      <header
        className="glass-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 16px',
          height: 64,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => onNavigate('inbox')}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#E2E7FF',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} color="#131B2E" strokeWidth={2} />
        </motion.button>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: '#131B2E', lineHeight: '20px' }}>
            Add New Follow-Up
          </h1>
          <p style={{ fontSize: 11, fontWeight: 500, color: '#3E484F', letterSpacing: '0.01em' }}>
            Track a Telegram conversation
          </p>
        </div>
      </header>

      <main className="screen-content">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 48,
              gap: 12,
              minHeight: 300,
            }}
          >
            <div style={{ fontSize: 48 }}>✅</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#131B2E' }}>Follow-up added!</p>
            <p style={{ fontSize: 13, color: '#3E484F' }}>Redirecting to inbox…</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Contact picker */}
              <div>
                <label style={labelStyle}>Telegram Contact</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={form.contact}
                    onChange={handleChange('contact')}
                    style={{ ...inputStyle, appearance: 'none', paddingRight: 36 }}
                    required
                  >
                    <option value="" disabled>Select a contact…</option>
                    {CONTACTS.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({c.handle})</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    color="#3E484F"
                    strokeWidth={2}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  />
                </div>
              </div>

              {/* Message received */}
              <div>
                <label style={labelStyle}>
                  <Send size={11} color="#00658E" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                  Message Received
                </label>
                <textarea
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder='Paste the Telegram message here…'
                  required
                  style={{ ...inputStyle, minHeight: 88, resize: 'vertical' }}
                />
              </div>

              {/* Your note */}
              <div>
                <label style={labelStyle}>
                  <Star size={11} color="#CF8400" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} fill="#CF8400" strokeWidth={0} />
                  Your Note / Reminder
                </label>
                <textarea
                  value={form.note}
                  onChange={handleChange('note')}
                  placeholder='What do you need to remember or do?'
                  style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }}
                />
              </div>

              {/* Priority */}
              <div>
                <label style={labelStyle}>Priority</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {PRIORITY_OPTIONS.map((p) => {
                    const isSelected = form.priority === p
                    const colors = {
                      High: { bg: '#FFDAD6', text: '#93000A' },
                      Med: { bg: '#DAE2FD', text: '#131B2E' },
                      Low: { bg: '#E2E7FF', text: '#3E484F' },
                    }[p]
                    return (
                      <motion.button
                        key={p}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                        onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                        style={{
                          flex: 1,
                          padding: '10px 0',
                          borderRadius: 10,
                          border: isSelected ? '2px solid #131B2E' : '2px solid transparent',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: 600,
                          background: colors.bg,
                          color: colors.text,
                          transition: 'all 0.15s',
                        }}
                      >
                        {p}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Schedule reminder toggle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'white',
                  borderRadius: 10,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={16} color="#00658E" strokeWidth={2} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#131B2E' }}>Schedule Reminder</span>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, scheduleReminder: !prev.scheduleReminder }))}
                  style={{
                    width: 42,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    background: form.scheduleReminder ? '#229ED9' : '#E2E7FF',
                    position: 'relative',
                    transition: 'background 0.2s',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: form.scheduleReminder ? 20 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'white',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'left 0.2s',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Submit */}
            <div style={{ padding: '0 16px 24px' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#00658E',
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(0,101,142,0.3)',
                }}
              >
                <Send size={16} color="white" strokeWidth={2} />
                <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Save Follow-Up</span>
              </motion.button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
