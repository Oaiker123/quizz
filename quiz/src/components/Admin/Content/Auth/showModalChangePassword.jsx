import { Button, Card, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useState } from "react";
import { postChangePassword } from "../../../../services/apiService";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";

const ModalChangePasswod = (props) => {
    const { show, setShow } = props;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async () => {
        let res = await postChangePassword(currentPassword, newPassword);
        if (res && res.EC === 0) {
            toast.success(
                <div>
                    <strong>success</strong>
                    <div>{res.EM}</div>
                </div>
            );
            setCurrentPassword('');
            setNewPassword('');
        } else {
            toast.error(
                <div>
                    <strong>error</strong>
                    <div>{res?.EM}</div>
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
                        <ModalHeader>Thay Đổi Mật Khẩu</ModalHeader>
                        <ModalBody>
                            <div className="w-full flex items-center justify-center bg-background p-4">
                                <div className="w-full max-w-[396px] space-y-4">
                                    <div className="text-center mb-8">
                                        <img
                                            src="/quizz_logo.png"
                                            alt="Logo Quizz"
                                            className="w-[150px] mx-auto"
                                        />
                                    </div>

                                    <Card className="p-4 space-y-4">
                                        <div className="space-y-3">
                                            <Input
                                                label="Current password (*)"
                                                type={isVisible ? "text" : "password"}
                                                variant="bordered"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />

                                            <Input
                                                label="New password (*)"
                                                type={isVisible ? "text" : "password"}
                                                variant="bordered"
                                                endContent={
                                                    <button
                                                        className="focus:outline-none"
                                                        type="button"
                                                        onClick={toggleVisibility}
                                                    >
                                                        {isVisible ? (
                                                            <Icon
                                                                icon="lucide:eye-off"
                                                                className="text-2xl text-default-400 pointer-events-none"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="lucide:eye"
                                                                className="text-2xl text-default-400 pointer-events-none"
                                                            />
                                                        )}
                                                    </button>
                                                }
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" color="danger" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={() => handleSubmit()}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
};
export default ModalChangePasswod;