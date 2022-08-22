// Components
import { Box, Stack, Typography } from '@mui/material'

// Types
import { PageProps } from './Page.types'
import { FC } from 'react'

export const Page: FC<PageProps> = ({ children, title, description }) => {
  const hasHeader = title || description

  return (
    <Box
      overflow={'auto'}
      height={'100%'}
      width={'100%'}
      padding={6}
      {...(hasHeader && {
        display: 'flex',
        flexDirection: 'column'
      })}
    >
      {hasHeader && (
        <Stack direction={'column'} mb={8} width={'100%'}>
          {title && <Typography variant={'h4'}>{title}</Typography>}
          {description && (
            <Typography color={'textSecondary'}>{description}</Typography>
          )}
        </Stack>
      )}
      {children}
    </Box>
  )
}
