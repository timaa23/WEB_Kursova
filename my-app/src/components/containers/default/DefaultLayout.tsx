import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";
import { Container } from "@mui/system";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Loader from "../../loader";

const DefaultLayout: React.FC = () => {
  const { loading } = useTypedSelector((store) => store.product);

  return (
    <>
      <DefaultHeader />
      {loading ? <Loader /> : <></>}
      <Container fixed sx={{ p: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default DefaultLayout;
