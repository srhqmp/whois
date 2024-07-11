import { convertDate, truncateHostnames } from "../utils";

const DomainInformation = ({ domain, hidden }) => {
  if (hidden) return null;

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

export default DomainInformation;
