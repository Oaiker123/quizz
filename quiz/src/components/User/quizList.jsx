import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/apiService"
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const QuizList = () => {
    const [arrQuiz, setArrQuiz] = useState([]);

    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        QuizData();
    }, [])
    const QuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            console.log("Returned quiz data:", res.DT);
            setArrQuiz(res.DT);
        }
    }
    return (
        <div className="min-h-screen p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {arrQuiz && arrQuiz.length > 0 &&
                    arrQuiz.map((quiz, index) => {
                        return (
                            <Card key={`${index}-quiz`} className="w-full h-[450px] shadow-lg rounded-xl">
                                <CardBody className="overflow-visible p-0">
                                    <img
                                        src={`data:image/png;base64,${quiz.image}`}
                                        alt="Quiz"
                                        className="w-full h-[200px] object-cover rounded-t-lg"
                                    />
                                    <div className="p-6 min-h-[150px] flex flex-col justify-between">
                                        <h4 className="font-bold text-large">Quiz {index + 1}</h4>
                                        <p className="text-default-500 mt-2">
                                            {quiz.description}
                                        </p>
                                    </div>
                                </CardBody>
                                <CardFooter className="px-6 pb-6 pt-0">
                                    <Button
                                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                        radius="full"
                                        onPress={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                    >
                                        {
                                            t('quizlist.startquiz')
                                        }
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
                {arrQuiz && arrQuiz.length === 0 &&
                    <div className="col-span-full text-center text-gray-500 text-lg font-medium mt-10">
                        {

                            t('quizlist.youdonthaveany')
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default QuizList