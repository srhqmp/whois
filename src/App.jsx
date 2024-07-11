import { useState, useEffect } from "react";

import ContactInformation from "./components/ContactInformation";
import DomainInformation from "./components/DomainInformation";
import Footer from "./components/Footer";

import whois from "./services/whois";
import Spinner from "./components/Spinner";

const App = () => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    if (!search) {
      setErrorMessage("Please enter a domain name");
    } else {
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
    }
    setLoading(false);
  };

  return (
    <div className="main">
      <h1 className="logo">Whois</h1>
      <div className="container">
        <div className="text-primary flex justify-center">
          Enter domain name
        </div>
        <form
          onSubmit={handleSubmit}
          className="my-6 flex justify-center items-center gap-1"
        >
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input-text"
            autoFocus
          />
          <button type="submit" className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 w-4 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
        {loading && <Spinner />}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
            <div className="my-16">
              <DomainInformation
                domain={domain}
                hidden={!displayOptions.domain}
              />
              <ContactInformation
                domain={domain}
                hidden={!displayOptions.contact}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
