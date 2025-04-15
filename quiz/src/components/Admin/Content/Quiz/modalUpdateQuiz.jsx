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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Name"
                                    type="text"
                                    disabled
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <Textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="max-w"
                                    label="📝 description"
                                    placeholder="Enter your description"
                                />
                                <Select
                                    className="max-w-xs"
                                    label="Difficulty"
                                    selectedKeys={type ? [type] : []}
                                    onSelectionChange={(keys) => {
                                        const selected = Array.from(keys)[0];
                                        setType(selected);
                                    }}
                                >
                                    <SelectItem key="EASY">EASY</SelectItem>
                                    <SelectItem key="MEDIUM">MEDIUM</SelectItem>
                                    <SelectItem key="HARD">HARD</SelectItem>
                                </Select>

                                <div>
                                    <label
                                        htmlFor="labelUpload"
                                        className="cursor-pointer flex items-center gap-2 text-blue-600"
                                    >
                                        <FaCamera />
                                        Upload File Image
                                    </label>
                                    <input
                                        type="file"
                                        id="labelUpload"
                                        hidden
                                        onChange={(event) => handleUploadImage(event)}
                                    />
                                    <div></div>
                                </div>
                                <div className="flex items-center justify-center border rounded-md h-[150px]">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="max-h-[140px]"
                                        />
                                    ) : (
                                        <span className="text-gray-400">Preview Image</span>
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
