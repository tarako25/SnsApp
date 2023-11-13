import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export const MenuElements = [
    {
        MenuName: "ホーム",
        link: "/1",
        icon:<HomeIcon />,
        class:"default"
    },
    {
        MenuName: "プロフィール",
        link: "/2",
        icon:<ManageAccountsIcon />,
        class:"default"
    },
    {
        MenuName: "Goodした投稿",
        link: "/2",
        icon:<FavoriteIcon />,
        class:"default"
    },
    {
        MenuName: "メッセージ",
        link: "/2",
        icon:<MailOutlineIcon />,
        class:"default"
    },
    {
        MenuName: "ログアウト",
        link: "/2",
        icon:<LogoutIcon />,
        class:"none"
    },
    {
        MenuName: "アカウント削除",
        link: "/2",
        icon:<PersonRemoveIcon />,
        class:"none"
    }
    
]