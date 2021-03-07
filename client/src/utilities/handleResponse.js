import { authenticationService } from "../services/authenticationService";
import { useSnackbar } from "notistack";

const useHandleResponse = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleResponse = (response) => {
    return response.json().then((text) => {
      console.log(text, "--text");
      const data = text;
      if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
          authenticationService.logout();
          enqueueSnackbar("User Unauthorized", {
            variant: "error",
          });
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  };

  return handleResponse;
};

export default useHandleResponse;
