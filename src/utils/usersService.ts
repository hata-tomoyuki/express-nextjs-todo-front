import { Users } from "../../schema/Users";
import { API_CONFIG } from "@/config/apiConfig";

export const createUsersInstance = () => {
  return new Users({
    baseUrl: API_CONFIG.baseUrl,
  });
};
