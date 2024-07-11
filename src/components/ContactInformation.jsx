const ContactInformation = ({ domain, hidden }) => {
  if (hidden) return null;

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

export default ContactInformation;
