import { useEffect, useState } from "react";
import moment from "moment";
import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { toast } from "react-toastify";
import { getQuizHistory } from "../../services/apiService";

const QuizHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = async () => {
        const res = await getQuizHistory();
        console.log("Kết quả từ API:", res);
        if (res && res.EC === 0) {
            setHistory(res.DT?.data || []);
        } else {
            toast.error(
                <div>
                    <strong>Error</strong>
                    <div>{res?.EM || "Đã xảy ra lỗi khi lấy lịch sử."}</div>
                </div>
            );
        }
    };

    return (
        <div className="overflow-x-auto w-full">
            <Table
                aria-label="Quiz history table"
                color="primary"
                selectionMode="single"
            >
                <TableHeader>
                    <TableColumn>STT</TableColumn>
                    <TableColumn>TÊN QUIZ</TableColumn>
                    <TableColumn>MÔ TẢ</TableColumn>
                    <TableColumn>SỐ CÂU HỎI</TableColumn>
                    <TableColumn>ĐÚNG</TableColumn>
                    <TableColumn>THỜI GIAN</TableColumn>
                </TableHeader>
                <TableBody>
                    {history && history.length > 0 ? (
                        history.map((item, index) => (
                            <TableRow key={item.id || index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.quizHistory?.name || "N/A"}</TableCell>
                                <TableCell>{item.quizHistory?.description || "N/A"}</TableCell>
                                <TableCell>{item.total_questions}</TableCell>
                                <TableCell>{item.total_correct}</TableCell>
                                <TableCell>
                                    {moment(item.updatedAt).format("HH:mm DD/MM/YYYY")}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Không có dữ liệu lịch sử
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default QuizHistory;
