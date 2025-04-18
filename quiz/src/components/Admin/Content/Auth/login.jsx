import React, { useState } from "react";
import { Input, Button, Link, Card, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../../services/apiService";
// import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../../redux/action/userAction";
import { toast } from 'react-toastify';
import Language from "../../../Header/language";
import { useTranslation } from "react-i18next";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        // alert("Login");
        //validate email and password
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error(
                <div>
                    <strong>Invalid Email</strong>
                    <div>Please enter a valid email address.</div>
                </div>
            )
            return;
        }

        if (!password) {
            toast.error(
                <div>
                    <strong>Invalid Password</strong>
                    <div>Please enter a valid password.</div>
                </div>
            );
            return;
        }

        setIsLoading(true);

        //submit to server
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data.DT));
            toast.success(
                <div>
                    <strong>Success</strong>
                    <div>{data.EM}</div>
                </div>
            );
            setIsLoading(false);
            navigate("/")
        }

        if (data && data.EC !== 0) {
            toast.error(
                <div>
                    <strong>Error</strong>
                    <div>{data.EM}</div>
                </div>
            );
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    }
    return (
        <>
            <div
                className="absolute top-4 right-4"
            >
                <Language />
            </div>
            <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
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
                                label="Email"
                                type="email"
                                variant="bordered"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                variant="bordered"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </div>

                        <Button
                            color="primary"
                            size="lg"
                            radius="sm"
                            className="w-full font-semibold text-[1.0625rem]"
                            onPress={() => handleLogin()}
                            disabled={isLoading}
                        >
                            {isLoading === true &&
                                <Spinner variant="spinner" color="warning" size="sm" />
                            }
                            <span>
                                {
                                    t('auth.login')
                                }
                            </span>
                        </Button>

                        <div className="text-center">
                            <Link href="#" color="primary" className="text-sm">
                                {
                                    t('auth.forgot')
                                }
                            </Link>
                        </div>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-divider"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-content1 px-4 text-sm text-default-500">
                                    {
                                        t('auth.or')
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button
                                color="primary"
                                variant="bordered"
                                onPress={() => navigate("/signup")}
                            >
                                {
                            
                                    t('auth.createnewaccount')
                                }
                            </Button>
                        </div>
                    </Card>
                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-divider"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span
                                className="bg-content1 px-4 text-sm text-default-500"
                                onClick={() => navigate("/")}
                            >
                                &#60;&#60; {
                                    t('auth.gotohomepage')
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login