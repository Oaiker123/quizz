import React, { useState } from "react";
import { Input, Button, Link, Card } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { postSignUp } from "../../../../services/apiService";
import Language from "../../../Header/language";
import { useTranslation } from "react-i18next";

const SignUp = () => {
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [username, setUsername] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const handleSignUp = async () => {
        // alert("Sign Up");
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

        //submit to server
        let data = await postSignUp(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/login");
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
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
                        <h1 className="text-2xl font-semibold text-foreground">
                            {
                                t('auth.createnewaccount')
                            }
                        </h1>
                        <p className="text-default-500 text-sm mt-1">
                            {
                                t('auth.itquickandeasy')
                            }
                        </p>
                    </div>

                    <Card className="p-4 space-y-4">
                        <div className="space-y-3">
                            <Input
                                label="Email (*)"
                                type="email"
                                variant="bordered"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                            <Input
                                label="Password (*)"
                                type={isVisible ? "text" : "password"}
                                variant="bordered"
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <Icon
                                                icon="lucide:eye-off"
                                                className="text-2xl text-default-400 pointer-events-none"
                                            />
                                        ) : (
                                            <Icon
                                                icon="lucide:eye"
                                                className="text-2xl text-default-400 pointer-events-none"
                                            />
                                        )}
                                    </button>
                                }
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                            <Input
                                label="UserName"
                                type="text"
                                variant="bordered"
                                onChange={(event) => setUsername(event.target.value)}
                                value={username}
                            />
                        </div>

                        <Button
                            color="primary"
                            size="lg"
                            radius="sm"
                            className="w-full font-semibold text-[1.0625rem]"
                            onPress={() => handleSignUp()}
                        >
                            {
                                t('auth.register')
                            }
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-default-500">
                                {
                                    t('auth.allreadyhaveanaccount')
                                }
                            </span>
                            {" "}
                            <Button
                                as="a"
                                href="#"
                                variant="light"
                                color="primary"
                                className="font-semibold"
                                onPress={() => navigate("/login")}
                            >
                                {
                                    t('auth.login')
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

export default SignUp