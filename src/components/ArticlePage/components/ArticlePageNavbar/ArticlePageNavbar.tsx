// Dependencies
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// Components
import { LinkIconButton } from 'src/components'
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiOutlineLink, AiOutlineEye } from 'react-icons/ai'
import { VscArrowLeft } from 'react-icons/vsc'
import NextLink from 'next/link'
import {
  IconButton,
  Link,
  Snackbar,
  Stack,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material'

// Types
import { FC } from 'react'
import { ArticlePageNavbarProps } from './ArticlePageNavbar.types'

// Styles
import { ArticleViews } from 'src/types'

export const ArticlePageNavbar: FC<ArticlePageNavbarProps> = ({
  title,
  description,
  pageUrl,
  encodedTitle,
  encodedDescription,
  encodedPageUrl,
  slug
}) => {
  const router = useRouter()
  const [_, section] = router.asPath.split('/')
  const [open, setOpen] = useState(false)
  const viewsQuery = useQuery<ArticleViews>([encodedPageUrl], () => {
    return fetch(`/api/views/${slug}`).then((res) => res.json())
  })

  async function onClickToClipboard() {
    await navigator.clipboard.writeText(pageUrl)
    setOpen(true)
  }

  function Analytics() {
    const views = new Number(viewsQuery.data?.total)
    const viewsInLocale = views.toLocaleString()
    const display = !viewsQuery.isSuccess ? '-' : views > 0 ? viewsInLocale : 0

    return (
      <Tooltip
        title={`This page has received ${display} visits`}
        placement={'bottom'}
      >
        <Stack alignItems={'center'} spacing={1}>
          <SvgIcon color={'action'}>
            <AiOutlineEye />
          </SvgIcon>
          <Typography variant={'subtitle1'} color={'text.secondary'}>
            {display}
          </Typography>
        </Stack>
      </Tooltip>
    )
  }

  function BackButton() {
    return (
      <NextLink href={`/${section}`}>
        <Link color={'primary'}>
          <Stack alignItems={'center'} spacing={2} onClick={router.back}>
            <VscArrowLeft />
            <Typography
              component={'span'}
              variant={'subtitle1'}
            >{`Back to ${section}`}</Typography>
          </Stack>
        </Link>
      </NextLink>
    )
  }

  return (
    <Stack py={4} px={10} justifyContent={'space-between'}>
      <BackButton />
      <Stack spacing={2} alignItems={'center'}>
        <Analytics />

        <Tooltip title={'Copy to clipboard'} placement={'right'}>
          <IconButton onClick={onClickToClipboard}>
            <AiOutlineLink />
          </IconButton>
        </Tooltip>

        <LinkIconButton
          icon={BsTwitter}
          href={`https://twitter.com/intent/tweet/?text=${title}&url=${encodedPageUrl}`}
          title={`Share ${title} on Twitter`}
        />
        <LinkIconButton
          icon={BsLinkedin}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedPageUrl}&title=${title}&summary=${encodedDescription}&source=${pageUrl}`}
          title={`Share ${title} on LinkedIn`}
        />
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        message={'URL copied to clipboard'}
      />
    </Stack>
  )
}
