import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { StoreContext } from './store'

import MoonIcon from '~icons/solid/moon.svg'
import SunIcon from '~icons/solid/sun.svg'
import SeedlingIcon from '~icons/solid/seedling.svg'
import EyeIcon from '~icons/solid/eye.svg'
import EyeSlashIcon from '~icons/solid/eye-slash.svg'

const Controls: React.FC<unknown> = observer(() => {
  const {
    regenerate,
    toggleDark,
    isDarkMode,
    setPlainMode,
    plainMode,
  } = useContext(StoreContext)

  const btnGradient = `conic-gradient(
      hsla(360, 90%, 45%, 75%),
      hsla(315, 90%, 45%, 75%),
      hsla(270, 90%, 45%, 75%),
      hsla(225, 90%, 45%, 75%),
      hsla(180, 90%, 45%, 75%),
      hsla(135, 90%, 45%, 75%),
      hsla(90,  90%, 45%, 75%),
      hsla(45,  90%, 45%, 75%),
      hsla(0,   90%, 45%, 75%)
  )`

  return (
    <div
      className="absolute top-0 right-0 z-50
        flex flex-col text-white text-xs mt-6"
    >
      <Button
        onClick={toggleDark}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </Button>
      <Button
        onClick={regenerate}
        style={{
          backgroundImage: btnGradient,
          backgroundColor: 'rgba(255,255,255,0.25)',
        }}
      >
        <SeedlingIcon />
      </Button>
      <Button
        onClick={() => setPlainMode(!plainMode)}
        style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
      >
        {plainMode ? <EyeSlashIcon /> : <EyeIcon />}
      </Button>
    </div>
  )
})

const Button: React.FC<{ onClick: () => void; style: any }> = ({
  onClick,
  style,
  children,
}) => (
  <button
    className="py-2 h-10 w-10 mb-2 flex justify-center
    active:outline-none focus:outline-none
    uppercase font-semibold rounded-md shadow-sm
    no-tap-highlight
    transition duration-150 transform
    hover:scale-110 active:scale-110"
    style={style}
    onMouseLeave={(ev) => ev.currentTarget.blur()}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Controls
