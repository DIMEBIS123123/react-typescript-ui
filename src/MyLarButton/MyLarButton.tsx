import { type FC, type ReactNode } from 'react'
import './MyLarButton.css' // Этот импорт нужен Vite для сборки CSS
export interface MyButtonProps {
	color?: string
	big?: boolean
	children: ReactNode
}
const MyLarButton: FC<MyButtonProps> = ({
	children,
	color,
	big,
	...props
}: MyButtonProps) => {
	const buttonClasses = ['my-button']
	if (big) {
		buttonClasses.push('big-btn')
	}
	return (
		<button
			style={{ color: color }}
			className={buttonClasses.join(' ')}
			{...props}
		>
			{children}
		</button>
	)
}

export default MyLarButton
