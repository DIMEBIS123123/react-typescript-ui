import { type FC, type ReactNode } from 'react'

export interface MyButtonProps {
	color: string
	big: boolean
	children: ReactNode
}
const MyLarButton: FC<MyButtonProps> = ({
	children,
	color,
	...props
}: MyButtonProps) => {
	return (
		<button style={{ color: color }} {...props}>
			{children}
		</button>
	)
}

export default MyLarButton
