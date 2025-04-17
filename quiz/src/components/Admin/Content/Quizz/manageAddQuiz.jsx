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
// import { toast } from "sonner";
import { toast } from 'react-toastify';
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
            toast.error(
                <div>
                    <strong>Invalid Name</strong>
                    <div>Please enter a valid name.</div>
                </div>
            );
            return;
        }

        if (!description) {
            toast.error(
                <div>
                    <strong>Invalid Description</strong>
                    <div>Please enter a valid description.</div>
                </div>
            );
            return;
        }

        if (!image) {
            toast.error(
                <div>
                    <strong>Invalid Image</strong>
                    <div>Please enter a valid image.</div>
                </div>
            );
            return;
        }

        let res = await postCreateNewQuiz(description, name, type, image);
        // console.log("check res:", res);
        if (res && res.EC === 0) {
            toast.success(
                <div>
                    <strong>Create New Quiz Success</strong>
                    <div>{res.EM}</div>
                </div>
            );
            setName("");
            setDescription("");
            setType("");
            setImage(null);
            setImagePreview(null);
            fetchQuiz();//cập nhật lại table

        } else {
            toast.error(
                <div>
                    <strong>Create New Quiz Failed</strong>
                    <div>{res.EM}</div>
                </div>
            );
        }
    }

    return (
        <>
            <form className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            label="Quiz Name"
                            variant="bordered"
                            type="text"

                        />
                    </div>

                    <div>
                        <Select
                            label="Difficulty"
                            value={type}
                            variant="bordered"
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

                </div>

                <div>
                    <Textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="max-w"
                        label="Description"
                        variant="bordered"
                        placeholder="Enter your description"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <div className="flex items-center justify-center border rounded-md h-[150px]">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-[150px]"
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
        </>
    )
}

export default ManageAddQuiz