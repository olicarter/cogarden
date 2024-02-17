import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'cogarden',
    short_name: 'cogarden',
    description: 'Find garden space to rent',
    start_url: '/',
    display: 'fullscreen',
    orientation: 'portrait',
    background_color: '#EFEEDF',
    theme_color: '#EFEEDF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
