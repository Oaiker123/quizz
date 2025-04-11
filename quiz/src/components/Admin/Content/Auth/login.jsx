import React, { useState } from "react";
import { Input, Button, Link, Card, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../../services/apiService";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../../redux/action/userAction";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            toast.error("Invalid Email");
            return;
        }

        if (!password) {
            toast.error("Invalid Password");
            return;
        }

        setIsLoading(true);

        //submit to server
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data.DT));
            toast.success(data.EM);
            setIsLoading(false);
            navigate("/")
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-[396px] space-y-4">
                <div className="text-center mb-8">
                    <img
                        src="/quizz_logo.png"
                        alt="Logo Quizz"
                        className="w-[150px] mx-auto"
                    />
                    <p className="text-default-500 text-sm mt-1">
                        It's quick and easy.
                    </p>
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
                        <span>Login</span>
                    </Button>

                    <div className="text-center">
                        <Link href="#" color="primary" className="text-sm">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-divider"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-content1 px-4 text-sm text-default-500">
                                or
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            color="primary"
                            variant="bordered"
                            onPress={() => navigate("/signup")}
                        >
                            Create new account
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
                            &#60;&#60; Go to home page
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login