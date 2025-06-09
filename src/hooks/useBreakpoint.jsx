import { useState, useEffect } from 'react'

import { MOBILE, TABLET, DESKTOP } from '../constants/constants'

const useBreakpoint = () => {
	const getBreakpoint = () => {
		const width = window.innerWidth

		switch (true) {
			case width >= 320 && width < 768:
				return MOBILE
			case width >= 768 && width < 1440:
				return TABLET
			default:
				return DESKTOP
		}
	}

	const [breakpoint, setBreakpoint] = useState(getBreakpoint())

	useEffect(() => {
		const handleResize = () => {
			setBreakpoint(getBreakpoint())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return breakpoint
}

export default useBreakpoint
