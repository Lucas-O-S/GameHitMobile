import { AuthHelper } from "./AuthHelper";

export const multipartHeader = {
  'Content-Type': 'multipart/form-data'
};

export const jsonHeader = {
  'Content-Type': 'application/json'
};

export const authHeader = () => {

  const accessToken = AuthHelper.getAccessToken();

  console.log("aaaaaaaaaa ", accessToken);
  if (accessToken) {
    return {

      'Authorization': `Bearer ${accessToken}`

    };

  }

  return {};
}