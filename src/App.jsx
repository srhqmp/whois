import { useEffect, useState } from "react";
import whois from "./services/whois";

const App = () => {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await whois.get(search);
      if (data?.ErrorMessage) {
        throw new Error(data.ErrorMessage.msg);
      }
      console.log(data);
      if (data) {
        setErrorMessage(null);
        setDomain(data);
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
    </div>
  );
};

export default App;
