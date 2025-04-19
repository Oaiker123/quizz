import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import _ from "lodash";

const Question = ({ data, index, isShowAnswer, handleCheckBox, isSubmitQuiz }) => {
    const [open, setOpen] = useState(false);

    if (_.isEmpty(data)) return null;

    const onCheck = (event, aId, qId) => {
        handleCheckBox(aId, qId);
    };

    return (
        <div className="flex flex-col gap-6 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold text-gray-800">
                Question {index + 1}:{" "}
                <span className="font-normal text-gray-700">{data.questionDescription}</span>
            </h2>

            {data.image ? (
                <div>
                    <img
                        onClick={() => setOpen(true)}
                        src={`data:image/jpeg;base64,${data.image}`}
                        alt="quiz"
                        className="w-full max-h-64 object-contain rounded-md cursor-pointer"
                    />
                    {open && (
                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={[
                                {
                                    src: `data:image/jpeg;base64,${data.image}`,
                                },
                            ]}
                        />
                    )}
                </div>
            ) : (
                <div className="h-52 bg-gray-100 rounded-md"></div>
            )}

            <div className="flex flex-col gap-3">
                {data.answers?.map((a, i) => (
                    <label
                        key={`answer-${i}`}
                        htmlFor={`checkbox-${i}-${index}`}
                        className={`flex items-center gap-3 p-3 border rounded-md transition-all cursor-pointer ${isSubmitQuiz ? "cursor-not-allowed opacity-90" : "hover:bg-gray-50"
                            } ${isShowAnswer && a.isCorrect
                                ? "border-green-500 bg-green-50"
                                : isShowAnswer && a.isSelected && !a.isCorrect
                                    ? "border-red-400 bg-red-50"
                                    : "border-gray-300"
                            }`}
                    >
                        <input
                            id={`checkbox-${i}-${index}`}
                            type="checkbox"
                            checked={a.isSelected}
                            disabled={isSubmitQuiz}
                            onChange={(e) => onCheck(e, a.id, data.questionId)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-800">{a.description}</span>

                        {isShowAnswer && (
                            <>
                                {a.isSelected && !a.isCorrect && (
                                    <IoIosClose className="text-red-500 text-xl ml-auto" size={30} />
                                )}
                                {a.isCorrect && (
                                    <IoIosCheckmark className="text-green-600 text-xl ml-auto" size={30} />
                                )}
                            </>
                        )}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Question;
