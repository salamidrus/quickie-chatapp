import useHandleResponse from "../utilities/handleResponse";
import authHeader from "../utilities/authHeader";
import { useSnackbar } from "notistack";

export function useGetUsers() {
  const { enqueueSnackbar } = useSnackbar();
  const handleResponse = useHandleResponse();
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const getUsers = () => {
    return fetch("/api/users", requestOptions)
      .then(handleResponse)
      .catch(() =>
        enqueueSnackbar("Could not load Users", { variant: "error" })
      );
  };

  return getUsers;
}
