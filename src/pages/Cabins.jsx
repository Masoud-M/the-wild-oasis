import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://bbcprcrjaxmudkhtxpnr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-10-25T21%3A04%3A06.771Z" />
    </Row>
  );
}

export default Cabins;
