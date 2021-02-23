import { authenticationService } from "../services/authenticationService";
import { useSnackbar } from "notistack";

const useHandleResponse = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleResponse = async (response) => {
    let text = await response.text();
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        authenticationService.logout();
        enqueueSnackbar("User Unauthorized", {
          variant: "error",
        });
      }

      const error = (data && data.message) || response.statusText;
      return error;
    }

    return data;
  };

  return handleResponse;
};

export default useHandleResponse;
