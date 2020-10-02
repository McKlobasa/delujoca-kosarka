import { createContext } from 'react'

export const LastRowContext = createContext(null)
export const StartingPlayersContext = createContext(null)
export const ConnectionContext = createContext({ip: '127.0.0.2', port: '8001'})
export const TeamName = createContext({A: '', B: ''})
export const Language = createContext(null)

export const ReboundsContext = createContext({
  rebounds: 0,
  incrementRebound: () => {}
})

export const LastGfxCommandContext = createContext('')
