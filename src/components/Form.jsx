import { useState } from "react";

const Form = ({ handleSubmit, setErrorMessage }) => {
  const [search, setSearch] = useState("amazon.com");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!search) {
      setErrorMessage("Please enter a domain name");
    } else {
      handleSubmit(search);
    }
  };

  return (
    <div>
      <div className="text-primary flex justify-center">Enter domain name</div>
      <form
        onSubmit={onSubmit}
        className="my-6 flex justify-center items-center gap-1"
      >
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="input-text"
          autoFocus
        />
        <button type="submit" className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 w-4 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Form;
