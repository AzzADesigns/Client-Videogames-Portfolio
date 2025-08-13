'use client'

import { IconType } from 'react-icons'

type NavIconProps = {
  Icon: IconType
}

export default function NavIcon({ Icon }: NavIconProps) {
  return (
    <Icon className="text-4xl text-background hover:text-background transition-colors icon-rgb" />
  )
}
