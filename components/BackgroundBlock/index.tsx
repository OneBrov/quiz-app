import clsx from 'clsx'
import styles from './BackgroundBlock.module.scss'

interface BackgroundBlockProps{
    children: React.ReactNode
    width?: string
    height?: string
    className?: string
}

export const BackgroundBlock:React.FC<BackgroundBlockProps> = ({children, width, height, className}) => {
    return (
        <div
            className={clsx(className, styles.box)}
            style={{width:width, height:height}}
        >
            {children}
        </div>
    )
}
