import { useState } from "react";

import whois from "./services/whois";
import { convertDate, truncateHostnames } from "./utils";

const DomainInformation = ({ domain }) => {
  return (
    <div>
      <h3>Domain Information</h3>
      <table>
        <thead>
          <tr>
            <th>Domain Name</th>
            <th>Registrar</th>
            <th>Registration Date</th>
            <th>Expiration Date</th>
            <th>Estimated Domain Age</th>
            <th>Hostnames</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{domain.domainName || "N/A"}</td>
            <td>{domain.registrarName || "N/A"}</td>
            <td>{convertDate(domain.createdDate)}</td>
            <td>{convertDate(domain.expiresDate)}</td>
            <td>{domain.estimatedDomainAge || "N/A"}</td>
            <td>
              {truncateHostnames(domain.nameServers.hostNames, 25) || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ContactInformation = ({ domain }) => {
  return (
    <div>
      <h3>Contact Information</h3>
      <table>
        <thead>
          <th>Registrant Name</th>
          <th>Technical Contact Name</th>
          <th>Administrative Contact Name</th>
          <th>Contact Email</th>
        </thead>
        <tbody>
          <tr>
            <td>{domain.registrant.name || "N/A"}</td>
            <td>{domain.technicalContact.name || "N/A"}</td>
            <td>{domain.administrativeContact.name || "N/A"}</td>
            <td>{domain.contactEmail || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

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
          <DomainInformation domain={domain} />
          <ContactInformation domain={domain} />
        </>
      )}
    </div>
  );
};

export default App;
