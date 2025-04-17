import { useEffect, useState } from 'react';
import Select from 'react-select'
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { FcPlus } from 'react-icons/fc';
import { Button } from '@heroui/react';
import { toast } from 'react-toastify';

const AssignQuiz = () => {
    const [selectQuiz, setSelectQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const [listUser, setListUser] = useState([]);
    const [selectUser, setSelectUser] = useState({});

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            });
            setListQuiz(newQuiz);
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            });
            setListUser(users);
        }
    }

    const handleAssign = async() => {
        let res = await postAssignQuiz(selectQuiz.value, selectUser.value);
        if (res && res.EC === 0) {
            toast.success(
                <div>
                    <strong>Success</strong>
                    <div>{res.EM}</div>
                </div>
            )
        }else {
            toast.error(
                <div>
                    <strong>Error</strong>
                    <div>{res.EM}</div>
                </div>
            )
        }
    }

    return (
        <div className='max-w-3xl mx-auto p-6 space-y-6 bg-white'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Select
                        defaultValue={selectQuiz}
                        onChange={setSelectQuiz}
                        variant="bordered"
                        options={listQuiz}
                        CreatableSelect isClearable
                    />
                </div>
                <div>
                    <Select
                        defaultValue={selectUser}
                        onChange={setSelectUser}
                        variant="bordered"
                        options={listUser}
                        CreatableSelect isClearable
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Button
                    color="primary"
                    onPress={() => handleAssign()}
                >
                    <FcPlus size={16} />
                    Assign
                </Button>
            </div>
        </div>
    )
}

export default AssignQuiz