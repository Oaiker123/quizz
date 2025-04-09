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
  addToast,
} from "@heroui/react";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

const ModalCreateUser = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("User");
    setImage("");
    setPreviewImage("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("User");
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
      toast("Email invalid!");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("userImage", image);

    try {
      axios.post("http://localhost:8081/api/v1/participant", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      addToast({
        title: "Success",
        description: "User created successfully!",
        variant: "solid",
        color: "success",
      });
      handleClose();
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to create user.",
        variant: "solid",
        color: "danger",
      });
      console.error("Error uploading file:", error);
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
                    <SelectItem key="User" value="User">
                      User
                    </SelectItem>
                    <SelectItem key="Admin" value="Admin">
                      Admin
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
                  <div>
                    <Toaster />
                    {/* <button onClick={() => toast("My first toast")}>
                      Give me a toast
                    </button> */}
                  </div>
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
