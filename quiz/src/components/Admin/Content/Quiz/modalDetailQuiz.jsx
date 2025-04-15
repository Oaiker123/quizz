import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react";

const ModalDetailQuiz = ({ show, setShow, dataDetail }) => {
    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={show}
            onOpenChange={setShow}
        >
            <ModalContent>
                <ModalHeader>Detail Quiz</ModalHeader>
                <ModalBody>
                    <div className="space-y-2">
                        <div><strong>Name:</strong> {dataDetail?.name}</div>
                        <div><strong>Description:</strong> {dataDetail?.description}</div>
                        <div><strong>Type:</strong> {dataDetail?.difficulty}</div>
                        <div className="flex items-center justify-center border rounded-md h-[150px]">
                            {dataDetail?.image ? (
                                <img
                                    src={`data:image/jpeg;base64,${dataDetail.image}`}
                                    alt="avatar"
                                    className="max-h-[140px]"
                                />
                            ) : (
                                <span className="text-gray-400">No Quiz Image</span>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={() => setShow(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalDetailQuiz;
