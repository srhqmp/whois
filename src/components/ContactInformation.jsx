const ContactInformation = ({ domain, hidden }) => {
  if (hidden) return null;

  return (
    <div className="mt-8 overflow-x-auto">
      <h3 className="information-header">Contact Information</h3>
      <div className="table-container">
        <table className="table">
          <thead className="font-bold">
            <tr>
              <th className="table-header">Registrant Name</th>
              <th className="table-header">Technical Contact Name</th>
              <th className="table-header">Administrative Contact Name</th>
              <th className="table-header">Contact Email</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="table-data">
                {domain?.registrant?.name || "N/A"}
              </td>
              <td className="table-data">
                {domain?.technicalContact?.name || "N/A"}
              </td>
              <td className="table-data">
                {domain?.administrativeContact?.name || "N/A"}
              </td>
              <td className="table-data">{domain?.contactEmail || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactInformation;
