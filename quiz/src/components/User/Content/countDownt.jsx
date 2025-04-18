import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const CountDownt = (props) => {
    const [count, setCount] = useState(300);

    const { t } = useTranslation();

    const toHHMMSS = (secs) => {
        const secNum = parseInt(secs, 10);
        const hours = Math.floor(secNum / 3600);
        const minutes = Math.floor(secNum / 60) % 60;
        const seconds = secNum % 60;

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":");
    }

    useEffect(() => {
        if (count <= 0) {
            props.onTimeUp();
            return;
        };
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        return () => {
            clearInterval(interval)
        };
    }, [count])

    return (
        <div className="text-sm text-gray-500 md:text-right">
            {
                t('quizlist.timeelapsed')
            }: <span className="font-medium text-gray-800">
                {toHHMMSS(count)}
            </span>
        </div>
    )
}

export default CountDownt