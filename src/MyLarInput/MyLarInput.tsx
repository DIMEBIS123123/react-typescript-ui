import React, { type FC } from 'react'

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
	return <input type='text' />
}

export default MyLarInput
