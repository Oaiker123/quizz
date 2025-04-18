import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Question from "./question";
import ModalResult from "./modalResult";
import RightContent from "./Content/rightContent";
import CountDownt from "./Content/countDownt";
import { useTranslation } from "react-i18next";


const DetailQuiz = () => {
    const params = useParams();

    const { t } = useTranslation();

    const location = useLocation();
    // console.log(location);
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);

    const [dataModalResult, setDataModalResult] = useState({});
    useEffect(() => {
        fetchQuestion();
    }, [quizId])

    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);
        // console.log("check res", res);
        if (res && res.EC === 0) {
            // console.log(res.DT);
            let raw = res.DT;
            let data = _.chain(raw)

                .groupBy("id")

                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;

                    value.forEach((item, index) => {
                        // console.log("item at index", index, item);
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                        // console.log("item", item.answers);
                    })
                    // console.log("key", key, "value", value);


                    return {
                        questionId: key,
                        answers,
                        questionDescription,
                        image
                    };
                })
                .value();

            // console.log(data);
            setDataQuiz(data);
        }
    }
    // console.log("Check data quiz", dataQuiz);

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }



    }

    // xu ly check box
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);

        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            // console.log("question", question);
            // console.log("b", b);
            question.answers = b;
        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinishQuiz = async () => {
        // console.log("dataQuiz", dataQuiz);
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {

                let questionId = question.questionId;
                let userAnswerId = [];

                //todo: get userAnswerId
                question.answers.forEach(answer => {
                    if (answer.isSelected === true) {
                        userAnswerId.push(answer.id);
                    }
                })
                answers.push({

                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            // console.log("payload", payload);
            //todo: call api
            let res = await postSubmitQuiz(payload);
            console.log("res", res);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
            } else {
                alert("Something went wrong!");
            }
        }
    }

    const onTimeUp = () => {
        handleFinishQuiz();
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 w-full h-full">

            {/* Main Content */}
            <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Quiz {quizId}: {location?.state?.quizTitle}
                    </h3>
                    <CountDownt
                        onTimeUp={onTimeUp}
                    />
                </div>

                <Card className="p-4 shadow-lg rounded-2xl bg-white border">
                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </Card>

                {/* Navigation Buttons */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <Button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                            radius="full"
                            onPress={handlePrev}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {
                                t('quizlist.pre')
                            }
                        </Button>

                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            radius="full"
                            onPress={handleNext}
                        >
                            {
                                t('quizlist.next')
                            }
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </div>

                    <Button
                        color="primary"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md"
                        onPress={handleFinishQuiz}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {
                            t('quizlist.submitquiz')
                        }
                    </Button>
                </div>
            </div>

            {/* Sidebar - Question Selector */}
            <RightContent
                dataQuiz={dataQuiz}
                handleFinishQuiz={handleFinishQuiz}
                setIndex={setIndex}
            />


            {/* Modal */}
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>

    )
}

export default DetailQuiz