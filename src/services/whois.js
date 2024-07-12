import axios from "axios";

const baseUrl = "https://www.whoisxmlapi.com/whoisserver/WhoisService";
const whoisApiKey = import.meta.env.VITE_WHOIS_API_KEY;

const get = (domainName) => {
  const request = axios.get(baseUrl, {
    params: {
      apiKey: whoisApiKey,
      domainName,
      outputFormat: "JSON",
    },
  });
  return request.then((res) => res.data);
};

export default { get };
