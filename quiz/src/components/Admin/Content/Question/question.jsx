import { Button, Input, Link, Select, SelectItem } from "@heroui/react";
import _ from "lodash";
import { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { FcPlus, FcDeleteRow, FcDeleteDatabase, FcMultipleCameras } from "react-icons/fc";
import { v4 as uuidv4 } from 'uuid';

const Question = () => {

    const [selectQuiz, setSelectQuiz] = useState({});
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            question: 'question 1',
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false,
                },
            ],
        }
    ]);

    const handleAddRemoveQuestion = (type, id) => {
        // console.log(type, id);
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                question: '',
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


    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-xl mt-10 overflow-hidden">
            <h2 className="text-2xl font-bold text-center">Create a Question</h2>

            <Select
                className="max-w-xs"
                label="Select Quiz"
                defaultValue={selectQuiz}
                onChange={setSelectQuiz}
                variant="bordered"
            >
                <SelectItem key="USER" value="USER">
                    USER
                </SelectItem>
                <SelectItem key="ADMIN" value="ADMIN">
                    ADMIN
                </SelectItem>
            </Select>

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
                                            size={30}
                                        />
                                    </span>
                                }
                            </div>

                            <Input
                                label="Create a Description here..."
                                type="text"
                                variant="bordered"
                                value={question.question}
                            />

                            <div className="flex items-start gap-8">
                                <div className="flex flex-col items-center justify-center min-w-[180px] p-4">
                                    <label
                                        htmlFor="labelUpload"
                                        className="cursor-pointer flex items-center gap-2 text-blue-600"
                                    >
                                        <FcMultipleCameras size={20}/>
                                        <span className="font-medium">Upload File Image</span>
                                    </label>
                                    <input type="file" id="labelUpload" hidden />
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
                                                />
                                                <Input
                                                    placeholder={"Answer " + (index + 1)}
                                                    type="text"
                                                    variant="bordered"
                                                    value={answer.description}
                                                />
                                                <span onClick={() => handleAddRemoveAnswer("ADD", question.id)}>
                                                    <FcPlus
                                                        size={25}
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

            <div className="text-center">
                <Button
                    color="primary"
                    onPress={() => handleAddRemoveQuestion("ADD", '')}
                >
                    <FcPlus
                        size={20}
                    />
                    Add Question
                </Button>
            </div>
        </div>
    )

}
export default Question