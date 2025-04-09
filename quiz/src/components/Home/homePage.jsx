import videoHomePage from "../../assets/video.mp4";

const HomePage = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12 p-12 bg-[#f9f7fc]">
      <div className="w-full max-w-[700px]">
        <video autoPlay loop muted className="w-full rounded-xl">
          <source src={videoHomePage} type="video/mp4" />
        </video>
      </div>

      <div className="max-w-[500px] md:text-left">
        <p className="uppercase text-[#9a60c2] font-semibold tracking-wide text-sm mb-4">
          Customer Intelligence
        </p>
        <h1 className="text-3xl font-bold text-[#2c2c2c] mb-4">
          🧠 Ready to Challenge Your Brain?
        </h1>
        <p className="text-[#5a5a5a] text-base mb-6">
          Welcome to the ultimate quiz experience – where learning meets fun,
          and every click brings a new discovery. Challenge yourself, expand
          your knowledge, and compete with others as you explore quizzes across
          countless exciting topics.
        </p>
        <button className="px-6 py-3 bg-[#493B8E] text-white rounded-lg font-semibold hover:bg-[#F50067] transition-colors duration-300">
          ✨ Let’s get started!
        </button>
      </div>
    </div>
  );
};

export default HomePage;
