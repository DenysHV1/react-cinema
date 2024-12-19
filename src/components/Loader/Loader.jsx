import { Vortex } from "react-loader-spinner";

const Loader = () => {
  const style = {
    margin: "0 auto",
    display: "flex",
    alineSelf: "center",
    justifyContent:'center'
  };
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={style}
      wrapperClass="vortex-wrapper"
      colors={["red", "green", "blue", "yellow", "orange", "purple"]}
    />
  );
};

export default Loader;
