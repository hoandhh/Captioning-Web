import plane from "../../../../assets/videos/plane.gif";
const Home = () => {
  return (
    <div
      className="h-full"
      style={{
        backgroundImage: `url(${plane})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default Home;
