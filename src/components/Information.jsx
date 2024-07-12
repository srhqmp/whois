import { useState, useEffect } from "react";

import DomainInformation from "./DomainInformation";
import ContactInformation from "./ContactInformation";

const DisplayOptions = ({ displayOptions, setDisplayOptions }) => {
  return (
    <div className="flex items-center flex-col">
      <div className="pb-2">
        <label>
          <input
            type="checkbox"
            checked={displayOptions.domain}
            onChange={() =>
              setDisplayOptions((curr) => ({
                ...curr,
                domain: !curr.domain,
              }))
            }
            className="mr-4"
          />
          Display Domain Information
        </label>
      </div>
      <div className="pb-2">
        <label>
          <input
            type="checkbox"
            checked={displayOptions.contact}
            onChange={() =>
              setDisplayOptions((curr) => ({
                ...curr,
                contact: !curr.contact,
              }))
            }
            className="mr-4"
          />
          Display Contact Information
        </label>
      </div>
    </div>
  );
};

const Information = ({ domain }) => {
  const [displayOptions, setDisplayOptions] = useState({
    domain: true,
    contact: true,
  });

  // store display-options setting to local storage
  useEffect(() => {
    const storageDisplayOptions = localStorage.getItem("display-options");
    if (storageDisplayOptions) {
      setDisplayOptions(JSON.parse(storageDisplayOptions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("display-options", JSON.stringify(displayOptions));
  }, [displayOptions]);

  if (!domain) return null;

  return (
    <div>
      <DisplayOptions
        displayOptions={displayOptions}
        setDisplayOptions={setDisplayOptions}
      />
      <div className="my-16">
        <DomainInformation domain={domain} hidden={!displayOptions.domain} />
        <ContactInformation domain={domain} hidden={!displayOptions.contact} />
      </div>
    </div>
  );
};

export default Information;
