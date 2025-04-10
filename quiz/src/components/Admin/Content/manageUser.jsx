import { Button } from "@heroui/react";
import ModalCreateUser from "./modalCreateUser";
import TableUser from "./tableUser";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./modalUpdateUser";
import ModalDeleteUser from "./modalDeleteUser";

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [dataDelete, setDataDelete] = useState({});

  const [listUser, setListUser] = useState([

  ]);

  useEffect(() => {
    fetchListUser();
  }, [])

  const fetchListUser = async () => {
    let res = await getAllUsers();
    console.log(res);
    if (res && res.EC === 0) {
      setListUser(res.DT);
    }
  }

  const handleClickButtonUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
    console.log(user);
  }

  const resetUpdateData = () => {
    setDataUpdate({});
  }

  const handleClickButtonDelete = (user) => {
    console.log('data delete',user);
    setShowModalDeleteUser(true);
    setDataDelete(user);

  };


  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <Button color="primary" endContent={<PlusIcon />} onPress={() => setShowModalCreateUser(true)}>
          Add New User
        </Button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <TableUser
          listUser={listUser}
          handleClickButtonUpdate={handleClickButtonUpdate}
          handleClickButtonDelete={handleClickButtonDelete}
        />
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUser={fetchListUser}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUser={fetchListUser}
        resetUpdateData={resetUpdateData}
      />
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        dataDelete={dataDelete}
      />
    </div>
  );
};

export default ManageUser;
