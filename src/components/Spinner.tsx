import { useIsFetching } from '@tanstack/react-query'
import MoonLoader from 'react-spinners/MoonLoader'

const Spinner = () => {
  const isFetching = useIsFetching()

	return isFetching ? (
		<div id="loading-spinner-wrapper">
			<MoonLoader color="#007bff" />
		</div>
	) : null
}

export default Spinner
