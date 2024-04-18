import ReactPaginate from "react-paginate";

export const Pagination = ({ getPageNumber }) => {
	const pageCount = 3;
	const handlePageClick = (data) => {
		getPageNumber(data.selected + 1);
	};
	return (
		<ReactPaginate
			breakLabel="..."
			nextLabel="next>"
			onPageChange={handlePageClick}
			marginPagesDisplayed={1}
			pageRangeDisplayed={2}
			pageCount={pageCount}
			previousLabel="<previous"
			containerClassName="pagination justify-content-center p-3"
			pageClassName="page-item"
			pageLinkClassName="page-link"
			previousClassName="page-item"
			nextClassName="page-item"
			breakClassName="page-link"
			breakLinkClassName="page-link"
			previousLinkClassName="page-link"
			nextLinkClassName="page-link"
			activeClassName="active"
		/>
	);
};

export default Pagination;
