import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Question from "./question";
import ModalResult from "./modalResult";


const DetailQuiz = () => {
    const params = useParams();

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

    return (
        <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
            {/* Câu hỏi và lựa chọn */}
            <div className="w-full md:w-3/4 bg-white p-6 rounded-2xl shadow-lg">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-semibold">Quiz {quizId}: {location?.state?.quizTitle}</h3>
                </div>

                {/* Nội dung câu hỏi */}
                <Card className="p-4">
                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={
                            dataQuiz &&
                                dataQuiz.length > 0 ?
                                dataQuiz[index] : []
                        }
                    />
                </Card>

                <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
                    <div className="flex gap-2">
                        <Button
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            radius="full"
                            onPress={() => handlePrev()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Previous
                        </Button>
                        <Button
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            radius="full"
                            onPress={() => handleNext()}
                        >
                            Next
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </div>

                    <div className="md:mt-0">
                        <Button
                            color="primary"
                            onPress={() => handleFinishQuiz()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Submit Quiz
                        </Button>
                    </div>

                </div>
            </div>

            {/* Danh sách nút tròn chọn câu hỏi */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded-2xl shadow">
                <h3 className="text-lg font-semibold mb-4">Câu hỏi</h3>
                <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 10 }, (_, i) => (
                        <button
                            key={i}
                            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white text-sm font-semibold transition"
                            title={`Câu ${i + 1}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz