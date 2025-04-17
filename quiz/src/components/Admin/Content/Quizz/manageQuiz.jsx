import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ManageTableQuiz from "./ManageTableQuiz";
import ManageAddQuiz from "./manageAddQuiz";
import ModalDeleteQuiz from "./modalDeleteQuiz";
import ModalUpdateQuiz from "./modalUpdateQuiz";
import ModalDetailQuiz from "./modalDetailQuiz";



const ManageQuiz = () => {

    const [listQuiz, setListQuiz] = useState([]);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [isShowModalDetail, setIsShowModalDetail] = useState(false);

    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDetail, setDataDetail] = useState({});

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();

        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    const handleDelete = (quiz) => {
        setDataDelete(quiz);
        setIsShowModalDelete(true);
    }

    const handleUpdate = (quiz) => {
        setDataUpdate(quiz);
        setIsShowModalUpdate(true);
    }

    const handleDetail = (quiz) => {
        setDataDetail(quiz);
        setIsShowModalDetail(true);
    }

    return (
        <div class="mx-auto px-4 w-full max-w-screen-xl mt-4">
            <div className="max-w-3xl mx-auto mt-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                <ManageAddQuiz
                    fetchQuiz={fetchQuiz}
                />
            </div>
            <div className="flex justify-between items-center p-4 mb-6">
                <ManageTableQuiz
                    listQuiz={listQuiz}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    handleDetail={handleDetail}
                />

                <ModalDeleteQuiz
                    show={isShowModalDelete}
                    setShow={setIsShowModalDelete}
                    dataDelete={dataDelete}
                    fetchQuiz={fetchQuiz}
                />

                <ModalUpdateQuiz
                    show={isShowModalUpdate}
                    setShow={setIsShowModalUpdate}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchQuiz={fetchQuiz}
                />

                <ModalDetailQuiz
                    show={isShowModalDetail}
                    setShow={setIsShowModalDetail}
                    dataDetail={dataDetail}
                />

            </div>
        </div>
    )
}

export default ManageQuiz