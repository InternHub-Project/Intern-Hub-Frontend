/* eslint-disable react/prop-types */
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function PaginationJobs({
  totalElements,


  numberOfPage,
  ITEMS_PER_PAGE,
  route,
}) {
  const totalPages = Math.ceil(totalElements / ITEMS_PER_PAGE);
  const navigate = useNavigate();

  let paginationBtn = [];

  for (let i = 0 ; i < totalPages; i++) {


    paginationBtn.push(
      <Button
        variant={numberOfPage == i + 1 ? "filled" : "outline"}
        onClick={() => goToPage(i+1)}
      >
        {i+1}
      </Button>
    );
  }

  function goToPage(pageNum) {
    navigate(route + "/" + pageNum);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      {/* <Pagination
        total={totalPages}
        value={activePage}
        onChange={setPage}
        color="orange"
        size="xs"
        withEdges
        onClick={() => {
          goToPage(activePage);
          console.log(activePage);
        }}
      /> */}
      {paginationBtn}
    </div>
  );

}

