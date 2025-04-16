import {
    Button,
    Input,
    NumberInput,
    Select,
    Textarea,
    SelectItem,
    Accordion,
    AccordionItem
} from "@heroui/react";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "sonner";
import { FcCheckmark, FcFaq, FcInspection, FcBriefcase, FcMms, FcMultipleCameras } from "react-icons/fc";


const ManageAddQuiz = ({ fetchQuiz }) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target?.files?.[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {

        //validate
        if (!name) {
            toast.error("Invalid Name");
            return;
        }

        if (!description) {
            toast.error("Invalid Description");
            return;
        }

        let res = await postCreateNewQuiz(description, name, type, image);
        // console.log("check res:", res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setType("");
            setImage(null);
            setImagePreview(null);
            fetchQuiz();//cập nhật lại table

        } else {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Accordion>
                <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title={
                        <div className="flex items-center gap-2">
                            <FcFaq 
                                size={20}
                            />
                            <span>Create New Quiz</span>
                        </div>
                    }
                >
                    <form className="space-y-6">
                        <div>
                            <Input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                label={
                                    <div className="flex items-center gap-2">
                                        <FcBriefcase 
                                            size={20}
                                        />
                                        <span>Your Quiz Name</span>
                                    </div>
                                }
                                type="text"

                            />
                        </div>

                        <div>
                            <Textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="max-w"
                                label={
                                    <div className="flex items-center gap-2">
                                        <FcInspection
                                            size={20}
                                        />
                                        <span>Your Quiz Description</span>
                                    </div>
                                }
                                placeholder="Enter your description"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Select
                                    className="max-w-xs"
                                    label="Difficulty"
                                    value={type}
                                    onChange={(event) => setType(event.target.value)}
                                >
                                    <SelectItem key="EASY" value="EASY">
                                        EASY
                                    </SelectItem>
                                    <SelectItem key="MEDIUM" value="MEDIUM">
                                        MEDIUM
                                    </SelectItem>
                                    <SelectItem key="HARD" value="HARD">
                                        HARD
                                    </SelectItem>
                                </Select>
                            </div>

                            {/* <div>
                        <NumberInput label="🏆 Điểm tối đa" variant="flat" />
                    </div> */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left: Upload button */}
                            <div className="flex flex-col items-center justify-center">
                                <label
                                    htmlFor="labelUpload"
                                    className="cursor-pointer flex items-center gap-2 text-blue-600"
                                >
                                    <FcMultipleCameras  
                                        size={20}
                                    />
                                    Upload File Image
                                </label>
                                <input
                                    type="file"
                                    id="labelUpload"
                                    hidden
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </div>

                            {/* Right: Image preview */}
                            <div className="flex items-center justify-center border rounded-md h-[150px]">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-[140px]"
                                    />
                                ) : (
                                    <span className="text-gray-400">Preview Image</span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button
                                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                radius="full"
                                onPress={() => handleSubmitQuiz()}
                            >
                                <FcCheckmark />
                                Submit Quiz
                            </Button>
                        </div>
                    </form>
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default ManageAddQuiz