import * as React from 'react'
import '../box-styles.css'

function Box({ className='', style, children}) {
  return <div className={'box ' + className} style={{ ...style, fontStyle: 'italic' }}>{children}</div>
}

function App() {
  return (
    <div>
      <Box className='box--small' style={{ backgroundColor: 'lightblue' }}>
        small lightblue box
      </Box>
      <Box className='box--medium' style={{ backgroundColor: 'pink' }}>
        medium pink box
      </Box>
      <Box className='box--large' style={{ backgroundColor: 'orange' }}>
        large orange box
      </Box>
      <Box>sizeless box</Box>
    </div>
  )
}

export default App