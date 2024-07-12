const Spinner = () => {
  return (
    <div className="fixed flex-col gap-2 top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white px-4 py-6 rounded-lg flex items-center justify-center flex-col gap-2">
        <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-4 border-secondary-100"></div>
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default Spinner;
