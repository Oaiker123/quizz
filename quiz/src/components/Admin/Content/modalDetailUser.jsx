import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react";

const ModalDetailUser = ({ show, setShow, dataDetail }) => {
    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={show}
            onOpenChange={setShow}
        >
            <ModalContent>
                <ModalHeader>Detail User</ModalHeader>
                <ModalBody>
                    <div className="space-y-2">
                        <div><strong>Email:</strong> {dataDetail?.email}</div>
                        <div><strong>Username:</strong> {dataDetail?.username}</div>
                        <div><strong>Role:</strong> {dataDetail?.role}</div>
                        <div className="flex items-center justify-center border rounded-md h-[150px]">
                            {dataDetail?.image ? (
                                <img
                                    src={`data:image/jpeg;base64,${dataDetail.image}`}
                                    alt="avatar"
                                    className="max-h-[140px]"
                                />
                            ) : (
                                <span className="text-gray-400">No User Image</span>
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

export default ModalDetailUser;
