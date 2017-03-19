import React from 'react'
const Icon = {}

Icon.get = function({iconName, color}) {
    switch(iconName) {
        case 'star':
            return (
                <svg class={`c-icon c--star ${color ? `c--${color}-color` : ``}`} viewBox="0 0 32 32">
                    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
                </svg>
            )
        case 'halfStar':
            return (
                <svg class={`c-icon c--half-star ${color ? `c--${color}-color` : ``}`} viewBox="0 0 32 32">
                    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-0.029 0.015 0.029-17.837 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z"></path>
                </svg>
            )
        case 'timer':
            return (
                <svg class={`c-icon c--timer ${color ? `c--${color}-color` : ``}`} viewBox="0 0 32 32">
                    <path d="M16 6.038v-2.038h4v-2c0-1.105-0.895-2-2-2h-6c-1.105 0-2 0.895-2 2v2h4v2.038c-6.712 0.511-12 6.119-12 12.962 0 7.18 5.82 13 13 13s13-5.82 13-13c0-6.843-5.288-12.451-12-12.962zM22.071 26.071c-1.889 1.889-4.4 2.929-7.071 2.929s-5.182-1.040-7.071-2.929c-1.889-1.889-2.929-4.4-2.929-7.071s1.040-5.182 2.929-7.071c1.814-1.814 4.201-2.844 6.754-2.923l-0.677 9.813c-0.058 0.822 0.389 1.181 0.995 1.181s1.053-0.36 0.995-1.181l-0.677-9.813c2.552 0.079 4.94 1.11 6.754 2.923 1.889 1.889 2.929 4.4 2.929 7.071s-1.040 5.182-2.929 7.071z"></path>
                </svg>
            )
        case 'distance':
            return (
                <svg class={`c-icon c--road ${color ? `c--${color}-color` : ``}`} viewBox="0 0 24 24">
                    <path d="M18 4l-4 4h3v7c0 1.1-.9 2-2 2s-2-.9-2-2V8c0-2.21-1.79-4-4-4S5 5.79 5 8v7H2l4 4 4-4H7V8c0-1.1.9-2 2-2s2 .9 2 2v7c0 2.21 1.79 4 4 4s4-1.79 4-4V8h3l-4-4z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            )
        case 'elevate':
            return (
                <svg class={`c-icon c--road ${color ? `c--${color}-color` : ``}`} viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                </svg>
            )
        default:
            return null
    }
}

export default Icon
