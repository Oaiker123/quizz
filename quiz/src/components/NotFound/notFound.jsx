import React from "react";
import { Button, Card, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        console.log("Navigating to home");
        navigate("/");
    };
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-content1 p-4">
            <Card className="max-w-lg w-full p-6 flex flex-col items-center gap-6" shadow="lg">
                <div className="w-full flex flex-col items-center gap-4">
                    <Icon
                        icon="lucide:file-question"
                        className="w-24 h-24 text-default-400"
                    />
                    <h1 className="text-4xl font-bold text-default-900">
                        Page Not Found
                    </h1>
                    <p className="text-center text-default-600">
                        The page you're looking for doesn't exist or has been moved.
                        Try searching for something else or return to the homepage.
                    </p>
                </div>

                <Button
                    variant="flat"
                    className="flex-1"
                    startContent={<Icon icon="lucide:home" />}
                    onPress={() => handleHome()}
                >
                    Go Home
                </Button>
            </Card>
        </main>
    )
}

export default NotFound