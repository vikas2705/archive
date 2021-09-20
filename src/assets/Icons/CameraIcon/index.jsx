export default function CameraIcon() {
    return (
        <svg width='62' height='62' viewBox='0 0 62 62' fill='none'>
            <g filter='url(#filter0_d)'>
                <circle cx='31' cy='25' r='25' fill='#0073E6' />
            </g>
            <path
                d='M32.875 25.875C32.875 26.9109 32.0359 27.75 31 27.75C29.9641 27.75 29.125 26.9109 29.125 25.875C29.125 24.8391 29.9641 24 31 24C32.0359 24 32.875 24.8391 32.875 25.875Z'
                fill='white'
            />
            <path
                d='M40.375 18.9996H35.3746L34.1242 16.5H27.8746L26.6242 18.9996H21.625C20.5621 18.9996 19.75 19.8117 19.75 20.8746V30.8742C19.75 31.8738 20.5621 32.7492 21.625 32.7492H40.375C41.4379 32.7492 42.25 31.8738 42.25 30.8742V20.8746C42.25 19.8129 41.4379 18.9996 40.375 18.9996ZM31 30.2496C28.5625 30.2496 26.6254 28.3125 26.6254 25.875C26.6254 23.4375 28.5625 21.5004 31 21.5004C33.4375 21.5004 35.3746 23.4375 35.3746 25.875C35.3746 28.3125 33.4375 30.2496 31 30.2496Z'
                fill='white'
            />
            <defs>
                <filter
                    id='filter0_d'
                    x='0'
                    y='0'
                    width='62'
                    height='62'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                >
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    />
                    <feOffset dy='6' />
                    <feGaussianBlur stdDeviation='3' />
                    <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.19859 0'
                    />
                    <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow'
                    />
                    <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow'
                        result='shape'
                    />
                </filter>
            </defs>
        </svg>
    );
}
