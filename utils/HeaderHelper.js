import { AuthHelper } from "./AuthHelper";

export const multipartHeader = {
  'Content-Type': 'multipart/form-data'
};

export const jsonHeader = {
  'Content-Type': 'application/json'
};

export const authHeader = () => {

  const accessToken = AuthHelper.getAccessToken();

  if (accessToken) {

    return {

      'Authorization': `Bearer ${accessToken}`

    };

  }

  return {};
}