// Components
import {
  ActionIcon,
  Anchor,
  Container,
  Flex,
  Footer as MnFooter,
  Group,
  Text
} from '@mantine/core'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter
} from '@tabler/icons'

const FOOTER_HEIGHT = 40

export function Footer() {
  return (
    <MnFooter
      height={FOOTER_HEIGHT}
      sx={(theme) => ({
        background:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0]
      })}
    >
      <Container h={'100%'}>
        <Flex align={'center'} justify={'space-between'} h={'100%'}>
          <Text color={'dimmed'} size={'xs'}>
            {`© ${new Date().getFullYear()} Hugo Corta`}
          </Text>
          <Group spacing={0}>
            <Anchor
              href={`https://twitter.com/hcorta`}
              title={`Twitter @hcorta`}
              target={'_blank'}
            >
              <ActionIcon size={'md'} variant={'subtle'}>
                <IconBrandTwitter size={16} />
              </ActionIcon>
            </Anchor>
            <Anchor
              href={`https://github.com/hcorta`}
              title={`GitHub @hcorta`}
              target={'_blank'}
            >
              <ActionIcon size={'md'} variant={'subtle'}>
                <IconBrandGithub size={16} />
              </ActionIcon>
            </Anchor>
            <Anchor
              href={`https://www.linkedin.com/in/hugocorta`}
              title={`LinkedIn @hugocorta`}
              target={'_blank'}
            >
              <ActionIcon size={'md'} variant={'subtle'}>
                <IconBrandLinkedin size={16} />
              </ActionIcon>
            </Anchor>
          </Group>
        </Flex>
      </Container>
    </MnFooter>
  )
}
