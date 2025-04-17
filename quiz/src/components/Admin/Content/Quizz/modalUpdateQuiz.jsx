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
// import { Toaster, toast } from "sonner";
import { toast } from 'react-toastify';
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

    const handleUploadImages = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }


    const handSubmitUpdateQuiz = async () => {
        if (!name) {
            toast.error(
                <div>
                    <strong>Invalid Name</strong>
                    <div>Please enter a valid name.</div>
                </div>
            )
            return;
        }

        if (!description) {
            toast.error(
                <div>
                    <strong>Invalid Description</strong>
                    <div>Please enter a valid description.</div>
                </div>
            )
            return;
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image);
        if (data && data.EC === 0) {
            toast.success(
                <div>
                    <strong>Update Quiz Success</strong>
                    <div>{data.EM}</div>
                </div>
            );
            await props.fetchQuiz();
            handleClose();
        }

        if (data && data.EC !== 0) {
            toast.error(
                <div>
                    <strong>Update Quiz Failed</strong>
                    <div>{data.EM}</div>
                </div>
            );
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
                                <div>
                                    <Input
                                        label="Name"
                                        type="text"
                                        value={name}
                                        variant="bordered"
                                        onChange={(event) => setName(event.target.value)}
                                        className="w-full"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <Select
                                        className="w-full"
                                        label="Difficulty"
                                        variant="bordered"
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
                                </div>
                            </div>

                            <div>
                                <Textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    label="Description"
                                    placeholder="Enter your description"
                                    className="w-full"
                                    variant="bordered"
                                    minRows={4}
                                />

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col items-center justify-center">
                                    <label
                                        htmlFor="labelUploads"
                                        className="cursor-pointer flex items-center gap-2 text-blue-600"
                                    >
                                        <FcMultipleCameras
                                            size={20}
                                        />
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        id="labelUploads"
                                        hidden
                                        onChange={(event) => handleUploadImages(event)}
                                    />
                                </div>


                                <div className="flex items-center justify-center border rounded-md h-[150px]">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="max-h-[150px] object-contain"
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
