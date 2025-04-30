import { ApiResponce } from "../utils/api-responce.js";

const healthCheck = (req, res) => {
  return res
    .status(200)
    .json(new ApiResponce(200, { messae: "Server is up and OK " }));
};

export { healthCheck };
