import { convertDate, truncateHostnames } from "../utils";

const DomainInformation = ({ domain, hidden }) => {
  if (hidden) return null;

  return (
    <div className="mt-8">
      <h3 className="information-header">Domain Information</h3>
      <table className="table">
        <thead className="font-bold">
          <tr>
            <th>Domain Name</th>
            <th>Registrar</th>
            <th>Registration Date</th>
            <th>Expiration Date</th>
            <th>Estimated Domain Age</th>
            <th>Hostnames</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr>
            <td>{domain?.domainName || "N/A"}</td>
            <td>{domain?.registrarName || "N/A"}</td>
            <td>{convertDate(domain?.createdDate)}</td>
            <td>{convertDate(domain?.expiresDate)}</td>
            <td>{domain?.estimatedDomainAge || "N/A"}</td>
            <td>
              {domain.nameServers &&
              domain.nameServers.hostNames &&
              domain.nameServers.hostNames.length
                ? truncateHostnames(domain.nameServers.hostNames, 25)
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DomainInformation;
