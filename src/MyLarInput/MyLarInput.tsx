import { type FC } from 'react'
import './MyLarInput.css'

export interface MyLarInputProps {
	big?: boolean
	placeholder?: string
	label?: string
}

const MyLarInput: FC<MyLarInputProps> = ({
	big,
	placeholder,
	label,
	...props
}: MyLarInputProps) => {
	const classes = ['my-input']
	if (big) {
		classes.push('my-big-input')
	}
	return (
		<label>
			{label ? label : ''}
			<input
				type='text'
				{...props}
				placeholder={placeholder ? placeholder : ''}
				className={classes.join(' ')}
			/>
		</label>
	)
}

export default MyLarInput
