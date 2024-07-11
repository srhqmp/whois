import { useState, useEffect } from "react";

import ContactInformation from "./components/ContactInformation";
import DomainInformation from "./components/DomainInformation";

import whois from "./services/whois";

const App = () => {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayOptions, setDisplayOptions] = useState({
    domain: true,
    contact: true,
  });

  useEffect(() => {
    const storageDisplayOptions = localStorage.getItem("display-options");
    if (storageDisplayOptions) {
      setDisplayOptions(JSON.parse(storageDisplayOptions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("display-options", JSON.stringify(displayOptions));
  }, [displayOptions]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await whois.get(search);
      if (data?.ErrorMessage) {
        throw new Error(data.ErrorMessage.msg);
      }
      console.log(data);
      if (data?.WhoisRecord) {
        setErrorMessage(null);
        setDomain(data.WhoisRecord);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div>Enter domain name</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">search</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      {domain && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.domain}
                onChange={() =>
                  setDisplayOptions((curr) => ({
                    ...curr,
                    domain: !curr.domain,
                  }))
                }
              />
              Display Domain Information
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={displayOptions.contact}
                onChange={() =>
                  setDisplayOptions((curr) => ({
                    ...curr,
                    contact: !curr.contact,
                  }))
                }
              />
              Display Contact Information
            </label>
          </div>
          <DomainInformation domain={domain} hidden={!displayOptions.domain} />
          <ContactInformation
            domain={domain}
            hidden={!displayOptions.contact}
          />
        </>
      )}
    </div>
  );
};

export default App;
