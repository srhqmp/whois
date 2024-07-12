import { useState } from "react";
import { convertDate, truncateHostnames } from "../utils";

const DomainInformation = ({ domain, hidden }) => {
  const hostNamesExist =
    domain?.nameServers?.hostNames && domain.nameServers.hostNames.length;
  const [truncatedHostnames, setTruncatedHostnames] = useState(
    hostNamesExist && domain.nameServers.hostNames.join(", ").length > 25
  );

  if (hidden) return null;

  return (
    <div className="mt-8">
      <h3 className="information-header">Domain Information</h3>
      <div className="table-container">
        <table className="table">
          <thead className="font-bold">
            <tr>
              <th className="table-header">Domain Name</th>
              <th className="table-header">Registrar</th>
              <th className="table-header">Registration Date</th>
              <th className="table-header">Expiration Date</th>
              <th className="table-header">Estimated Domain Age</th>
              <th className="table-header">Hostnames</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="table-data">{domain?.domainName || "N/A"}</td>
              <td className="table-data">{domain?.registrarName || "N/A"}</td>
              <td className="table-data">
                {convertDate(domain?.createdDate) || "N/A"}
              </td>
              <td className="table-data">
                {convertDate(domain?.expiresDate) || "N/A"}
              </td>
              <td className="table-data">
                {domain?.estimatedDomainAge || "N/A"}
              </td>
              <td className="table-data">
                {hostNamesExist ? (
                  <div className="flex items-center flex-col gap-2">
                    {truncatedHostnames
                      ? truncateHostnames(domain.nameServers.hostNames, 25)
                      : domain.nameServers.hostNames.join(", ")}{" "}
                    <button
                      onClick={() => setTruncatedHostnames((curr) => !curr)}
                      className="btn-secondary"
                    >
                      {truncatedHostnames ? ">" : "<"}
                    </button>
                  </div>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomainInformation;
