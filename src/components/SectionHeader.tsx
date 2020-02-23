import React from 'react'

interface SectionHeaderProps {
    title: string
    bgColor?: string
    fontColor?: string
}

function SectionHeader(props: SectionHeaderProps) {
    return (
        <div
            style={{
                textAlign: 'left',
                fontWeight: 'bold',
                padding: '10px',
                backgroundColor: props.bgColor ? props.bgColor : '#8258FA',
                color: props.fontColor ? props.fontColor : 'white'
            }}
        >
            {props.title}
        </div>
    )
}

export { SectionHeader }
