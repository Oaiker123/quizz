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
} from "@heroui/react";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { postCreateUser } from "../../../services/apiService";

const ModalCreateUser = (props) => {
  const { show, setShow} = props;

  const handleClose = () => {
    // Remove focus before hiding modal
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = (event) => {
    if (event.target?.files?.[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/i);
  };

  const handleSaveUser = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (!password) {
      toast.error("Invalid Password", {
        description: "Please enter a valid password.",
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    const data = await postCreateUser(email, password, username, role, image);
    console.log("Component res: ", data);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUser();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
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
            <ModalHeader>Add New User</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div>
                  <Select
                    className="max-w-xs"
                    label="Select Role"
                    onChange={(event) => setRole(event.target.value)}
                    value={role}
                  >
                    <SelectItem key="USER" value="USER">
                      USER
                    </SelectItem>
                    <SelectItem key="ADMIN" value="ADMIN">
                      ADMIN
                    </SelectItem>
                  </Select>
                </div>
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
                    onChange={handleUploadImage}
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
              <Button color="primary" onPress={handleSaveUser}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateUser;
