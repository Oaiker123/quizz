import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FaCircleUser } from "react-icons/fa6";
import { MdQuiz } from 'react-icons/md';
import { FaQuestionCircle } from 'react-icons/fa';
import { RiQuestionAnswerFill } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { getOverview } from '../../../services/apiService';

const DashBoard = () => {

  const [dataOverview, setDataOverview] = useState([]);

  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, [])

  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);

      //set data for chart
      let Qz = 0, Qs = 0, As = 0;

      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          "name": "Quiz",
          "Qz": Qz,
        },
        {
          "name": "Question",
          "Qs": Qs,
        },
        {
          "name": "Answer",
          "As": As,
        },
      ]
      setDataChart(data);
    }
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-foreground">Welcome to Dashboard</h1>
        <p className="text-muted-foreground">This is your dashboard where you can manage your account, quizzes, and more.</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-4">
            <h2 className="text-lg font-semibold mb-4">Most visited pages</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-gray-100 border rounded-lg p-4 flex items-center gap-4">
                <div className="bg-blue-500 text-white rounded-full p-3">
                  <FaCircleUser
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Users</div>
                  <div className="text-xl font-bold text-gray-800">
                    {
                      dataOverview && dataOverview.users
                        && dataOverview.users.total ?
                        <>{dataOverview.users.total}</>
                        :
                        <>0</>
                    }
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 border rounded-lg p-4 flex items-center gap-4">
                <div className="bg-green-500 text-white rounded-full p-3">
                  <MdQuiz
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Quiz</div>
                  <div className="text-xl font-bold text-gray-800">
                    {
                      dataOverview && dataOverview.others
                        && dataOverview.others.countQuiz ?
                        <>{dataOverview.others.countQuiz}</>
                        :
                        <>0</>
                    }
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 border rounded-lg p-4 flex items-center gap-4">
                <div className="bg-purple-500 text-white rounded-full p-3">
                  <FaQuestionCircle
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                  <div className="text-xl font-bold text-gray-800">
                    {
                      dataOverview && dataOverview.others
                        && dataOverview.others.countQuestions ?
                        <>{dataOverview.others.countQuestions}</>
                        :
                        <>0</>
                    }
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 border rounded-lg p-4 flex items-center gap-4">
                <div className="bg-red-500 text-white rounded-full p-3">
                  <RiQuestionAnswerFill
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Answers</div>
                  <div className="text-xl font-bold text-gray-800">
                    {
                      dataOverview && dataOverview.others
                        && dataOverview.others.countAnswers ?
                        <>{dataOverview.others.countAnswers}</>
                        :
                        <>0</>
                    }
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-white p-4">
            <h2 className="text-lg font-semibold mb-4">Social media referrals</h2>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Qz" fill="#8884d8" />
                  <Bar dataKey="Qs" fill="#82ca9d" />
                  <Bar dataKey="As" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </>
  )
};

export default DashBoard;
