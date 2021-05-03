import ReactLoader from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="Loader">
      <ReactLoader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
