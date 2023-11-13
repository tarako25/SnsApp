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
        icon:<HomeIcon />
    },
    {
        MenuName: "プロフィール",
        link: "/2",
        icon:<ManageAccountsIcon />
    },
    {
        MenuName: "Goodした投稿",
        link: "/2",
        icon:<FavoriteIcon />
    },
    {
        MenuName: "メッセージ",
        link: "/2",
        icon:<MailOutlineIcon />
    },
    {
        MenuName: "ログアウト",
        link: "/2",
        icon:<LogoutIcon />
    },
    {
        MenuName: "アカウント削除",
        link: "/2",
        icon:<PersonRemoveIcon />
    }
    
]