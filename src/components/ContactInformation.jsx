const ContactInformation = ({ domain, hidden }) => {
  if (hidden) return null;

  return (
    <div className="mt-8">
      <h3 className="information-header">Contact Information</h3>
      <table className="table">
        <thead className="font-bold">
          <tr>
            <th>Registrant Name</th>
            <th>Technical Contact Name</th>
            <th>Administrative Contact Name</th>
            <th>Contact Email</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr>
            <td>{domain?.registrant?.name || "N/A"}</td>
            <td>{domain?.technicalContact?.name || "N/A"}</td>
            <td>{domain?.administrativeContact?.name || "N/A"}</td>
            <td>{domain?.contactEmail || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactInformation;
