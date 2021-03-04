import useHandleResponse from "../utilities/handleResponse";
import authHeader from "../utilities/authHeader";
import { useSnackBar } from "notistack";

export function useGetUsers() {
  const { enqueueSnackbar } = useSnackBar();
  const handleResponse = useHandleResponse();
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const getUsers = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users`, requestOptions)
      .then(handleResponse)
      .catch(() =>
        enqueueSnackbar("Could not load Users", { variant: "error" })
      );
  };

  return getUsers;
}
