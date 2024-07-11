import { useState } from "react";
import whois from "./services/whois";

const DomainInformation = ({ domain }) => {
  console.log({ domain });
  return (
    <div>
      <h3>Domain Information</h3>
      <table>
        <thead>
          <th>Domain Name</th>
          <th>Registrar</th>
          <th>Registration Date</th>
          <th>Expiration Date</th>
          <th>Estimated Domain Age</th>
          <th>Hostnames</th>
        </thead>
        <tbody>
          <tr>
            <td>{domain.domainName}</td>
            <td>{domain.registrarName}</td>
            <td>{domain.createdDate}</td>
            <td>{domain.expiresDate}</td>
            <td>{domain.estimatedDomainAge}</td>
            <td>
              {domain.nameServers.hostNames.join(", ").slice(0, 25 - 3) + "..."}
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
            <td>{domain.registrant.name}</td>
            <td>{domain.technicalContact.name}</td>
            <td>{domain.administrativeContact.name}</td>
            <td>{domain.contactEmail}</td>
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
      {domain && (
        <>
          <DomainInformation domain={domain.WhoisRecord} />
          <ContactInformation domain={domain.WhoisRecord} />
        </>
      )}
    </div>
  );
};

export default App;
