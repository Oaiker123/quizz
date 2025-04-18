import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useTranslation } from "react-i18next"
import { FcExpand } from "react-icons/fc"


const Language = () => {

    const { i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <div className="flex items-center cursor-pointer gap-2 relative">
                    {
                        i18n.language === 'vi' ? 'Việt Nam' : 'English'
                    }
                    <FcExpand />
                </div>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem
                    key="vi"
                    onPress={() => handleChangeLanguage('vi')}
                >
                    Việt Nam
                </DropdownItem>
                <DropdownItem
                    key="en"
                    onPress={() => handleChangeLanguage('en')}
                >
                    English
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

    )
}

export default Language