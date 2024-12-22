const Error = ({ errMessage }) => {
  console.log(errMessage)
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h3 className="text-[20px] text-headingColor leading-[30px] font-semibold">
        {errMessage}
      </h3>
    </div>
  );
};

export default Error;
