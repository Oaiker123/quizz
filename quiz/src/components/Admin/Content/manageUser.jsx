import { Button } from "@heroui/react";
import { useState } from "react";
import ModalCreateUser from "./modalCreateUser";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <Button color="primary" onPress={() => setShowModalCreateUser(true)}>
          Add New User
        </Button>
      </div>

      {/* You can put your users table or list here */}

      {/* Modal for creating a new user */}
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
      />
    </div>
  );
};

export default ManageUser;
