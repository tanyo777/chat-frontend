import { IEnvVariables } from "../types/env";

export const envVariables: IEnvVariables = {
  backendUrl: process.env.REACT_APP_SERVER as string,
};
