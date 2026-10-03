import { useState } from 'react'
import { Search, X } from 'lucide-react'
import appLogo from '../assets/app-logo.png'
import profileAvatar from '../assets/profile-avatar.png'

export default function Header({
  title,
  subtitle,
  searchQuery = '',
  onSearchChange,
  placeholder = 'Search...',
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    if (onSearchChange) {
      onSearchChange('')
    }
  }

  return (
    <header className="glass-header">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: 64,
          width: '100%',
        }}
      >
        {isSearchOpen ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              gap: 8,
              background: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <Search size={16} color="#00658E" strokeWidth={2} style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder={placeholder}
              autoFocus
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: 14,
                color: '#131B2E',
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Clear search"
              >
                <X size={15} color="#3E484F" />
              </button>
            )}
            <button
              type="button"
              onClick={handleCloseSearch}
              style={{
                background: '#E2E7FF',
                border: 'none',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 12,
                fontWeight: 600,
                color: '#00658E',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Left: Logo + App Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img
                src={appLogo}
                alt="Class-Com Logo"
                style={{ width: 32, height: 32, objectFit: 'contain' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: '18px',
                    letterSpacing: '-0.025em',
                    color: '#131B2E',
                  }}
                >
                  {title || 'Class-Com'}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    lineHeight: '14px',
                    letterSpacing: '0.01em',
                    color: '#3E484F',
                  }}
                >
                  {subtitle || 'Inbox'}
                </span>
              </div>
            </div>

            {/* Right: Search + Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                type="button"
                onClick={handleOpenSearch}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: searchQuery ? '#E2E7FF' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                aria-label="Search"
                title="Search"
              >
                <Search size={16.5} color="#3E484F" strokeWidth={2} />
              </button>
              <div style={{ position: 'relative', padding: 6 }}>
                <img
                  src={profileAvatar}
                  alt="Profile"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Online dot */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                    width: 10,
                    height: 10,
                    background: '#006C49',
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
