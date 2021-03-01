import { BehaviorSubject } from "rxjs";
import { useSnackbar } from "notistack";

import useHandleResponse from "../utilities/handleResponse";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

export function useLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const handleResponse = useHandleResponse();

  const login = (username, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, requestOptions)
        .then(handleResponse)
        .then((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          currentUserSubject.next(user);
          resolve(user);
        })
        .catch((err) => {
          enqueueSnackbar("Failed to login!", {
            variant: "error",
          });
          reject(err);
        });
    });
  };
  return login;
}

export function useRegister() {
  const { enqueueSnackbar } = useSnackbar();
  const handleResponse = useHandleResponse();

  const register = (name, username, password, confirmPassword) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password, confirmPassword }),
    };

    return new Promise((resolve, reject) => {
      fetch(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        requestOptions
      )
        .then(handleResponse)
        .then((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          currentUserSubject.next(user);
          resolve(user);
        })
        .catch((response) => {
          enqueueSnackbar(response || "Failed to Register", {
            variant: "error",
          });
          reject(response);
        });
    });
  };

  return register;
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
