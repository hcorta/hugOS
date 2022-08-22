// Components
import { IconButton, Link, Stack, Typography } from '@mui/material'
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5'
import NextLink from 'next/link'

// Constants
import { PAGES } from '../../../../constants'

// Types
import { FC } from 'react'
import { HeaderProps } from './Header.types'

// Hooks
import { useThemeMode } from '../../../../hooks'
import { useRouter } from 'next/router'

function NavLink({ href, exact, children, ...props }) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += ' active'
  }

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  )
}

export const Header: FC<HeaderProps> = ({ orientation }) => {
  const [mode, toggleMode] = useThemeMode()
  const { pathname } = useRouter()
  const isDarkMode = mode === 'dark'

  const commonHeaderProps = {
    component: 'header',
    top: 0,
    zIndex: 1,
    bgcolor: 'background.default',
    alignItems: 'center',
    borderColor: 'divider'
  }

  function SwitchThemeButton() {
    return (
      <IconButton onClick={toggleMode} title='Toggle theme mode'>
        {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
      </IconButton>
    )
  }

  if (orientation === 'horizontal') {
    return (
      <Stack
        position={'sticky'}
        borderBottom={1}
        justifyContent={'space-between'}
        {...commonHeaderProps}
      >
        <NextLink href='/'>
          <Typography fontWeight={'bolder'}>Hugo C.</Typography>
        </NextLink>

        <Stack spacing={1}>
          {PAGES.map(({ label, path }) => (
            <NextLink href={path}>
              <Link title={label}>{label}</Link>
            </NextLink>
          ))}
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack
      height={'100vh'}
      position={'sticky'}
      borderRight={1}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={'column'}
      py={6}
      {...commonHeaderProps}
    >
      <NextLink href='/'>
        <Typography fontWeight={'bolder'}>Hugo</Typography>
      </NextLink>

      <Stack spacing={2} direction={'column'} alignItems={'center'}>
        {PAGES.map(({ label, path, icon: Icon }) => {
          const isActive = pathname.startsWith(path)

          return (
            <NextLink href={path}>
              <IconButton
                title={label}
                {...(isActive && { color: 'secondary' })}
              >
                <Icon />
              </IconButton>
            </NextLink>
          )
        })}
      </Stack>
      <SwitchThemeButton />
    </Stack>
  )
}
