export const API_ROOT = import.meta.env.VITE_APP_API_ROOT
export const IMAGE_ROOT = import.meta.env.VITE_APP_IMAGE_ROOT
export const API_KEY = import.meta.env.VITE_APP_API_KEY
export const ACCESS_TOKEN = import.meta.env.VITE_APP_ACCESS_TOKEN

if (!(API_ROOT && IMAGE_ROOT && API_KEY && ACCESS_TOKEN)) {
  throw new Error('Environment variables incorrectly configured!')
}

export const formatDate = (input: string) => {
  return Intl.DateTimeFormat(
    'en-US', { day: 'numeric', month: 'short', year: 'numeric' }
  ).format(new Date(input))
}

export const formatTime = (minutes: number) => {
  return `${Math.floor(minutes / 60)} hours ${minutes % 60} minutes`
}