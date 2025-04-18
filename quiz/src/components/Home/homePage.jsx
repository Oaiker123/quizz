import { useTranslation } from "react-i18next";
import videoHomePage from "../../assets/video.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const account = useSelector(state => state.user.account);

  const navigate = useNavigate();

  console.log('isAuthenticated: ', isAuthenticated);
  console.log('account: ', account);

  const { t } = useTranslation();

  return (

    <div className="flex flex-wrap items-center justify-center gap-12 p-12 bg-[#f9f7fc]">
      <div className="w-full max-w-[700px]">
        <video autoPlay loop muted className="w-full rounded-xl">
          <source src={videoHomePage} type="video/mp4" />
        </video>
      </div>

      <div className="max-w-[500px] md:text-left">
        <p className="uppercase text-[#9a60c2] font-semibold tracking-wide text-sm mb-4">
          {
            t('homepage.title1')
          }
        </p>
        <h1 className="text-3xl font-bold text-[#2c2c2c] mb-4">
          {
            t('homepage.title2')
          }
        </h1>
        <p className="text-[#5a5a5a] text-base mb-6">
          {
            t('homepage.title3')
          }
        </p>
        {isAuthenticated === false ?
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-[#493B8E] text-white rounded-lg font-semibold hover:bg-[#F50067] transition-colors duration-300"
          >
            {
              t('homepage.title4.login')
            }
          </button>
          :
          <button
            onClick={() => navigate('/user')}
            className="px-6 py-3 bg-[#493B8E] text-white rounded-lg font-semibold hover:bg-[#F50067] transition-colors duration-300"
          >
            {
              t('homepage.title4.user')
            }
          </button>
        }
      </div>
    </div>
  );
};

export default HomePage;
