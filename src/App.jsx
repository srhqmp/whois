import { useState, useEffect } from "react";

import ContactInformation from "./components/ContactInformation";
import DomainInformation from "./components/DomainInformation";

import whois from "./services/whois";

const App = () => {
  const [search, setSearch] = useState("amazon.com");
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

    if (!search) {
      setErrorMessage("Please enter a domain name");
      return;
    }

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
    <div className="text-gray-600 font-body bg-gray-100 h-screen">
      <h1 className="text-gray-900 md:text-6xl text-2xl uppercase p-4 border-b border-gray-100 flex justify-center">
        Whois
      </h1>
      <div className="px-16 py-6">
        <div className="text-primary flex justify-center">
          Enter domain name
        </div>
        <form
          onSubmit={handleSubmit}
          className="my-6 flex justify-center items-center"
        >
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="border px-4 rounded"
          />
          <button
            type="submit"
            className="px-4 mx-1 bg-secondary-100 text-secondary-200 rounded"
          >
            search
          </button>
        </form>
        {errorMessage && (
          <div className="my-6 flex justify-center text-red-600 font-bold italic">
            {errorMessage}
          </div>
        )}
        {!errorMessage && domain && (
          <>
            <div className="flex items-center flex-col">
              <div className="pb-2">
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
                    className="mr-4"
                  />
                  Display Domain Information
                </label>
              </div>
              <div className="pb-2">
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
                    className="mr-4"
                  />
                  Display Contact Information
                </label>
              </div>
            </div>
            <DomainInformation
              domain={domain}
              hidden={!displayOptions.domain}
            />
            <ContactInformation
              domain={domain}
              hidden={!displayOptions.contact}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
