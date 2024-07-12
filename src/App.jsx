import { useState } from "react";

import Form from "./components/Form";
import Footer from "./components/Footer";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";
import Information from "./components/Information";

import whois from "./services/whois";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // fetch domain information
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
        <Spinner loading={loading} />
        <ErrorMessage message={errorMessage} />
        {!errorMessage && <Information domain={domain} />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
