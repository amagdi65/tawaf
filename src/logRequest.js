import axios from "axios";

export const log = (actionType, uuid, language = "ar", doaa_id = 9999) => {
  axios.post(
    "https://eserv.wmn.gov.sa/haram-api/public/api/vss/TawafActionLog",
    {
      action_type: actionType,
      language,
      uuid,
      doaa_id,
    }
  );
};
