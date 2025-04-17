import { Button, Input, Link, SelectItem } from "@heroui/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { FcPlus, FcDeleteRow, FcDeleteDatabase, FcMultipleCameras, FcCheckmark } from "react-icons/fc";
import { v4 as uuidv4 } from 'uuid';
import Lightbox from "yet-another-react-lightbox";
import { getAllQuizForAdmin, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz } from "../../../../services/apiService";
import Select from 'react-select'
import { toast } from "react-toastify";

const Question = () => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
            ],
        }
    ]
    const [listQuiz, setListQuiz] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectQuiz, setSelectQuiz] = useState({});
    const [questions, setQuestions] = useState(
        initQuestion
    );

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            });
            setListQuiz(newQuiz);
        }
    }

    // console.log("listQuiz", listQuiz);

    const handleAddRemoveQuestion = (type, id) => {
        // console.log(type, id);
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            }
            setQuestions([...questions, newQuestion]);
        }
        if (type === "REMOVE") {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === "REMOVE") {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === "QUESTION") {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
            }
            setQuestions(questionsClone);
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            // console.log(">>Check file", event.target.files[0]);
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        // console.log(type, questionId, answerId, value, index);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer
                })
        }
        setQuestions(questionsClone);
    }

    const handleSubmitQuestionForQuiz = async () => {

        //validate

        if (_.isEmpty(selectQuiz)) {
            toast.error(
                <div>
                    <strong>Invalid Quiz</strong>
                    <div>Please select a valid quiz.</div>
                </div>
            );
            return;
        }

        for (const question of questions) {
            if (_.isEmpty(question.description)) {
                toast.error(
                    <div>
                        <strong>Invalid Question</strong>
                        <div>Please enter a valid question.</div>
                    </div>
                );
                return;
            }


            let hasCorrectAnswer = false;//kiểm tra câu trả lời
            for (const answer of question.answers) {
                if (_.isEmpty(answer.description)) {
                    toast.error(
                        <div>
                            <strong>Invalid Answer</strong>
                            <div>Please enter a valid answer.</div>
                        </div>
                    );
                    return;
                }

                if (answer.isCorrect) {
                    hasCorrectAnswer = true; // Mark if there's at least one correct answer
                }
            }

            // If no answer is marked as correct, show an error
            if (!hasCorrectAnswer) {
                toast.error(
                    <div>
                        <strong>Invalid Answer</strong>
                        <div>Please select at least one correct answer for each question.</div>
                    </div>
                );
                return;
            }
            setQuestions(initQuestion);
        }
        
        
        //submit question
        // await Promise.all(questions.map(async (question) => {
        //     const q = await postCreateNewQuestionForQuiz(
        //         +selectQuiz.value,
        //         question.description,
        //         question.imageFile
        //     );

        //     //submit answer
        //     await Promise.all(question.answers.map(async (answer) => {
        //         await postCreateNewAnswerForQuestion(
        //             answer.description,
        //             answer.isCorrect,
        //             q.DT.id
        //         );
        //     }))
        // }))  

        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectQuiz.value,
                question.description,
                question.imageFile
            );

            //submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                );
            }
        }

        toast.success(
            <div>
                <strong>Create Question Success</strong>
                <div>All questions and answers submitted successfully!</div>
            </div>
        );
    }



    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-xl mt-10 overflow-hidden">
            <h2 className="text-2xl font-bold text-center">Create a Question</h2>

            <Select
                defaultValue={selectQuiz}
                onChange={setSelectQuiz}
                variant="bordered"
                options={listQuiz}
                CreatableSelect isClearable
            />

            {
                questions && questions.length > 0 && questions.map((question, index) => {
                    return (
                        <div
                            key={question.id}
                            className="border p-4 rounded-lg shadow-sm bg-gray-50 space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <label className="font-semibold">Câu hỏi {index + 1}</label>
                                {
                                    questions.length > 1 &&
                                    <span onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}>
                                        <FcDeleteDatabase
                                            size={25}
                                        />
                                    </span>
                                }
                            </div>

                            <Input
                                label="Create a Description here..."
                                type="text"
                                variant="bordered"
                                value={question.description}
                                onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                            />

                            <div className="flex items-start gap-8">
                                <div className="flex items-center gap-2 py-2">
                                    <label
                                        htmlFor={
                                            `${question.id}`
                                        }
                                    >
                                        <FcMultipleCameras size={20} />
                                    </label>
                                    <input
                                        type="file"
                                        id={
                                            `${question.id}`
                                        }
                                        hidden
                                        onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                    />
                                    <span className="font-medium" >
                                        {
                                            question.imageName ?
                                                <span onClick={() => {
                                                    setSelectedImage(question.imageFile);
                                                    setOpen(true);
                                                }}>
                                                    {question.imageName}
                                                </span>
                                                :
                                                "Upload 0 File Image"
                                        }
                                    </span>
                                </div>
                            </div>


                            <div className="space-y-2">
                                {
                                    question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-blue-600"
                                                    title="Correct answer"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <Input
                                                    placeholder={"Answer " + (index + 1)}
                                                    type="text"
                                                    variant="bordered"
                                                    value={answer.description}
                                                    onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                />
                                                <span onClick={() => handleAddRemoveAnswer("ADD", question.id)}>
                                                    <FcPlus
                                                        size={20}
                                                    />
                                                </span>
                                                {
                                                    question.answers && question.answers.length > 1 &&
                                                    <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                                        <FcDeleteRow
                                                            size={25}
                                                        />
                                                    </span>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }

            <div className="text-center mt-4">
                <div className="inline-block mx-2">
                    <Button
                        color="primary"
                        onPress={() => handleAddRemoveQuestion("ADD", '')}
                    >
                        <FcPlus size={16} />
                        Add Question
                    </Button>
                </div>
                {
                    questions && questions.length > 0 &&
                    <div className="inline-block mx-2">
                        <Button
                            color="primary"
                            onPress={() => handleSubmitQuestionForQuiz()}
                        >
                            <FcCheckmark size={16} />
                            Save Question
                        </Button>
                    </div>
                }
            </div>
            {
                open === true && selectedImage &&
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={[
                        { src: URL.createObjectURL(selectedImage) }
                    ]}
                />
            }
        </div>
    )

}
export default Question