// import { toast } from "sonner";
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from "../../../../services/apiService";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";


const ModalDeleteQuiz = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuizForAdmin(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(
                <div>
                    <strong>Delete Quiz Success</strong>
                    <div>{data.EM}</div>
                </div>
            );
            setShow(false);
            await props.fetchQuiz();
        }

        if (data && data.EC !== 0) {
            toast.error(
                <div>
                    <strong>Delete Quiz Failed</strong>
                    <div>{data.EM}</div>
                </div>
            );
        }
    }

    return (
        <>
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
                            <ModalHeader>Confirm Delete Quiz</ModalHeader>
                            <ModalBody>
                                Are you sure to delete this quiz.
                                <b>ID = {dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmitDeleteQuiz}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};

export default ModalDeleteQuiz;