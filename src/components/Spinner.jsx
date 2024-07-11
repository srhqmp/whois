const Spinner = () => {
  return (
    <div className="fixed flex-col gap-2 top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16  border-b-4 border-secondary-100"></div>
      <div>Loading...</div>
    </div>
  );
};

export default Spinner;
