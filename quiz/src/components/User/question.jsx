import { CheckboxGroup, Checkbox } from "@heroui/react";
import _ from "lodash";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

const Question = (props) => {
    const { data, index } = props;

    const [open, setOpen] = useState(false);

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleCheckBox = (event, aId, qId) => {
        // console.log("Checked: ", event.target.checked);
        // console.log("aId: ", aId, "qId: ", qId);
        props.handleCheckBox(aId, qId);

    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">
                Question {index + 1}: {data.questionDescription}
            </h2>

            {data.image ?
                <div>
                    <img
                        onClick={() => setOpen(true)}
                        src={`data:image/jpeg;base64,${data.image}`}
                        alt="quiz"
                        className="w-full max-h-52 object-contain rounded-lg mb-2"
                    />
                    {open === true && (
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
                :
                <div className="h-52">

                </div>
            }


            {data.answers && data.answers.length &&
                data.answers.map((a, index) => {
                    return (
                        <div
                            className="form-check"
                            key={`answer-${index}`}
                        >
                            <input
                                className="form-check-input border-2 border-blue-700 rounded-md"
                                type="checkbox"
                                checked={a.isSelected}
                                onChange={(event) => handleCheckBox(event, a.id, data.questionId)}
                            />
                            <label className="form-check-label">
                                {a.description}
                            </label>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default Question