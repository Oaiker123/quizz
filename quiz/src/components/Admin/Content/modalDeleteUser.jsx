import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleSubmitDeleteUser = () => {
            alert("Deleted user");
        };

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
                        <ModalHeader>Confirm Delete</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this user?
                            <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" color="danger" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmitDeleteUser}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalDeleteUser;

