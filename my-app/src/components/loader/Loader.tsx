import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const Loader: React.FC = () => {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      <LinearProgress color="error" />
    </Stack>
  );
};

export default Loader;
