'use client'

type TooltipProps = {
    label: string
}

export default function Tooltip({ label }: TooltipProps) {
    return (
        <span className="
            absolute mb-2 lg:left-30 top-[-30] left-8 lg:top-5 transform -translate-x-1/2
            text-lg whitespace-nowrap select-none z-50
            tooltip-rgb-text flex items-start justify-center
        ">
            {label}
        </span>
    )
}
