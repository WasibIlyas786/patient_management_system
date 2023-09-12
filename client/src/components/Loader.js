import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#1976d2"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#1976d2"
      strokeWidth={5}
      strokeWidthSecondary={3}
    />
  );
};

export default Loader;
