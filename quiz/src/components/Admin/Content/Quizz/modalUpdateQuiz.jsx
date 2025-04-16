import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react";
import { FaCamera } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import _ from "lodash";
import { putUpdateQuizForAdmin } from "../../../../services/apiService";
import { FcMultipleCameras } from "react-icons/fc";

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const handleClose = () => {
        // Remove focus before hiding modal
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        setDataUpdate({});
    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            // console.log("dataUpdate >>> ", dataUpdate);
            //update state
            setDescription(dataUpdate.description);
            setName(dataUpdate.name);
            setType(dataUpdate.difficulty);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [props.dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }


    const handSubmitUpdateQuiz = async () => {
        if (!name) {
            toast.error('Invalid name')
            return;
        }

        if (!description) {
            toast.error('Invalid description')
            return;
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await props.fetchQuiz();
            handleClose();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={show}
            onOpenChange={setShow}
            backdrop="opaque"
            size="2xl"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Update the quiz</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="w-full"
                                    placeholder="Enter your name"
                                />

                                <Textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    label="Description"
                                    placeholder="Enter your description"
                                    className="w-full"
                                    minRows={4}
                                />

                                <Select
                                    className="w-full"
                                    label="Difficulty"
                                    selectedKeys={type ? [type] : []}
                                    onSelectionChange={(keys) => {
                                        const selected = Array.from(keys)[0];
                                        setType(selected);
                                    }}
                                >
                                    <SelectItem key="EASY">Easy</SelectItem>
                                    <SelectItem key="MEDIUM">Medium</SelectItem>
                                    <SelectItem key="HARD">Hard</SelectItem>
                                </Select>

                                <div className="w-full flex flex-col items-center justify-center gap-2">
                                    <label
                                        htmlFor="labelUpload"
                                        className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
                                    >
                                        <FcMultipleCameras 
                                            size={20}
                                        />
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        id="labelUpload"
                                        hidden
                                        onChange={(event) => handleUploadImage(event)}
                                    />
                                </div>


                                <div className="md:col-span-2 flex items-center justify-center border border-dashed rounded-xl h-[180px] bg-gray-50">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="max-h-[160px] object-contain"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">No image selected</span>
                                    )}
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="light" color="danger" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handSubmitUpdateQuiz}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalUpdateQuiz;
