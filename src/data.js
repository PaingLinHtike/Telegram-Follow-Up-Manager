// ============================================================
// Shared data / mock state for the Telegram Follow-Up Manager
// ============================================================
import avatarAlice from './assets/avatar-alice.png'
import avatarCharlie from './assets/avatar-charlie.png'
import avatarSarah from './assets/avatar-sarah.png'
import avatarBob from './assets/avatar-bob.png'

export const CONTACTS = [
  {
    id: 1,
    name: 'Alice Vance',
    handle: '@alice_vance',
    avatar: avatarAlice,
    status: 'pending',
    priority: 'High',
    priorityColor: { bg: '#FFDAD6', text: '#93000A' },
    channel: 'Telegram',
    channelColor: '#00658E',
    message: '“Can you send the project files?”',
    note: 'Reply after work with Figma link and exported specs.',
    noteType: 'Note',
    time: '2h ago',
    online: true,
    tags: ['Work'],
  },
  {
    id: 2,
    name: 'Charlie Davis',
    handle: '@charlie_davis',
    avatar: avatarCharlie,
    status: 'pending',
    priority: 'Med',
    priorityColor: { bg: '#DAE2FD', text: '#131B2E' },
    channel: 'Telegram',
    channelColor: '#00658E',
    message: '“Please review my document.”',
    note: 'Check tomorrow morning before sprint sync.',
    noteType: 'Note',
    time: '5h ago',
    online: true,
    tags: ['Work'],
  },
  {
    id: 3,
    name: 'Sarah Connor',
    handle: '@sarah_connor',
    avatar: avatarSarah,
    status: 'pending',
    priority: 'High',
    priorityColor: { bg: '#FFDAD6', text: '#93000A' },
    channel: 'Telegram',
    channelColor: '#00658E',
    message: '“Are the API endpoints ready for mobile client?”',
    note: 'Confirm Swagger docs URL.',
    noteType: 'Note',
    time: '1d ago',
    online: false,
    tags: ['Work'],
  },
  {
    id: 4,
    name: 'Bob Martinez',
    handle: '@bob_martinez',
    avatar: avatarBob,
    status: 'replied',
    priority: 'Done',
    priorityColor: { bg: '#6FFBBE', text: '#005236' },
    channel: 'Telegram',
    channelColor: '#006C49',
    message: '“Are you free this weekend?”',
    note: 'Weekend trip confirmed - sent meetup spot.',
    noteType: 'Outcome',
    time: '2d ago',
    online: false,
    tags: [],
  },
]

export const STATS = {
  pending: 5,
  replied: 12,
  urgent: 2,
  total: 17,
}
