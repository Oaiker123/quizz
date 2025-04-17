import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { getDeleteUsers } from "../../../services/apiService";
// import { Toaster, toast } from "sonner";
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleSubmitDeleteUser = async() => {
        const data = await getDeleteUsers(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(
                <div>
                    <strong>Delete User Success</strong>
                    <div>{data.EM}</div>
                </div>
            );
            setShow(false);
            // await fetchListUser();
            props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
        }

        if (data && data.EC !== 0) {
            toast.error(
                <div>
                    <strong>Delete User Failed</strong>
                    <div>{data.EM}</div>
                </div>
            );
        }
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
                            <b className="text-red-600">{dataDelete?.email || "Unknown Email"}</b>
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

