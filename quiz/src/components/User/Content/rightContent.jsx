import { useState } from "react";
import { useTranslation } from "react-i18next";

const RightContent = (props) => {
    const { dataQuiz, setIndex } = props;
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(null);

    const getClassQuestion = (index, question) => {
        const baseClass = "w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-sm font-normal transition-all";

        if (index === currentIndex) {
            return `${baseClass} bg-primary-400 text-white`;
        }

        if (question && question.answers.length > 0) {
            const isAnswered = question.answers.some(a => a.isSelected === true);
            if (isAnswered) {
                return `${baseClass} bg-green-400`;
            }
        }

        return baseClass;
    }

    const handleClickQuestion = (index) => {
        setCurrentIndex(index);
        setIndex(index);
    }

    return (
        <div className="w-full lg:w-64 bg-white p-4 shadow-lg rounded-2xl border overflow-y-auto max-h-[calc(100vh-100px)]">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
                {
                    t('quizlist.question')
                }
            </h3>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => (
                        <button
                            key={index}
                            className={getClassQuestion(index, item)}
                            title={`Question ${index + 1}`}
                            onClick={() => handleClickQuestion(index)}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default RightContent;
