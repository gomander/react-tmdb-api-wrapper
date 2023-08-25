import Button from 'react-bootstrap/Button'

interface Props {
	page: number
	totalPages: number
	hasPreviousPage: boolean
	hasNextPage: boolean
	onPreviousPage: () => void
	onNextPage: () => void
}

const Pagination = ({
	page, totalPages, hasPreviousPage, hasNextPage, onPreviousPage, onNextPage,
}: Props) => {
	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="prev">
				<Button
					disabled={!hasPreviousPage}
					onClick={onPreviousPage}
					variant="primary"
				>
          Previous Page
        </Button>
			</div>

			<div className="page">Page {page}/{totalPages}</div>

			<div className="next">
				<Button
					disabled={!hasNextPage}
					onClick={onNextPage}
					variant="primary"
				>
          Next Page
        </Button>
			</div>
		</div>
	)
}

export default Pagination
