import React from 'react'
import * as net from 'net'

const ConnectionContext = React.createContext(null)

function useSocket () {
  return React.useContext(ConnectionContext)
}

function SocketProvider ({ children, connection }) {
  const [socket, setSocket] = React.useState(null)
  React.useEffect(() => {
    if (connection && connection.ip && connection.port) {
      const client = new net.Socket();
      client.connect({port: connection.port, host: connection.ip}, function() {
      });
      client.on('ready', function () {
        console.log(`Connected to ${connection.ip}:${connection.port}`)
        setSocket(client)
      })
      client.on('close', function() {
        console.log(`Lost connection to ${connection.ip}:${connection.port}`)
        setSocket(null)
      });
      client.on('error', function() {
        console.log(`Error connecting to ${connection.ip}:${connection.port}`)
        setSocket(null)
      });
      console.log({client})
      return () => {
        console.log('unmounting')
        client.destroy();
        setSocket(null)
      }
    }
  }, [connection])

  const send = React.useCallback(message => {
    if (socket) {
      console.log(`you sent ${message}`)
      socket.write(message);
    }
  }, [socket])

  const contextValue = React.useMemo(() => ({
    send
  }), [send])

  return <ConnectionContext.Provider value={contextValue}>
    {children}
  </ConnectionContext.Provider>
}

export {
  useSocket,
  SocketProvider
}
