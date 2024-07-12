import { useState, useEffect } from "react";

import Form from "./components/Form";
import ContactInformation from "./components/ContactInformation";
import DomainInformation from "./components/DomainInformation";
import Footer from "./components/Footer";

import whois from "./services/whois";
import Spinner from "./components/Spinner";

const App = () => {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (name) => {
    setLoading(true);

    try {
      const data = await whois.get(name);
      if (data?.ErrorMessage) {
        throw new Error(data.ErrorMessage.msg);
      }
      if (data?.WhoisRecord) {
        setErrorMessage(null);
        setDomain(data.WhoisRecord);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="main">
      <h1 className="logo">Whois</h1>
      <div className="container">
        <Form handleSubmit={handleSubmit} setErrorMessage={setErrorMessage} />
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
