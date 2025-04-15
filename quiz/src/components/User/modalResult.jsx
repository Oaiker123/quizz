import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    console.log("dataModalResult", dataModalResult);

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
                        <ModalHeader>Your Result...</ModalHeader>
                        <ModalBody>
                            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xl font-semibold text-gray-700">Total Questions: <b>{dataModalResult.countTotal}</b></div>
                                        <div className="text-xl font-semibold text-gray-700">Total Correct Answer: <b>{dataModalResult.countCorrect}</b></div>
                                    </div>
                                    <div className="bg-green-100 text-green-600 p-3 rounded-full">
                                        {/* 🎯 SVG Target icon (Lucide-inspired or custom) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 12m-8,0a8,8 0 1,0 16,0a8,8 0 1,0 -16,0 M12 8v4l3 3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onClose}>
                                Show Answers
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalResult;

