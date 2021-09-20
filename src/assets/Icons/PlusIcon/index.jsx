export default function PlusIcon() {
    return (
        <svg
            width='72'
            height='72'
            viewBox='0 0 72 72'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g filter='url(#filter0_d)'>
                <circle cx='36' cy='30' r='30' fill='#0073E6' />
            </g>
            <path
                d='M37.8832 37.118H34.8023V31.575H29.9039V28.6617H34.8023V23.4539H37.8832V28.6617H42.7688V31.575H37.8832V37.118Z'
                fill='white'
            />
            <defs>
                <filter
                    id='filter0_d'
                    x='0'
                    y='0'
                    width='72'
                    height='72'
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
