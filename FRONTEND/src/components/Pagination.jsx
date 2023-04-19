import { Button, ButtonGroup } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { ButtonStyle } from "../utils/styles";

export default function Pagination({ lastEl }) {
  let { search } = window.location;
  const [searchParams, setSearchParams] = useSearchParams(search);
  const curr = Object.fromEntries([...searchParams]);
  let { page = 1 } = curr;

  const handlePage = (event) => {
    let value = event.target.value;
    setSearchParams({ ...curr, page: +page + +value });
  };
  return (
    <>
      <form onClick={(e) => handlePage(e)}>
        <ButtonGroup fontWeight="bolder" {...ButtonStyle}>
          <Button value={-1} isDisabled={page == 1}>
            {+page - 1}
          </Button>
          <Button fontWeight={"bold"} value={0}>
            {page}
          </Button>
          <Button value={+1} isDisabled={!lastEl}>
            {+page + 1}
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}
