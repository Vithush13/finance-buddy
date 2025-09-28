import{LuTrophy, LuUsers,LuLayoutDashboard,LuHandCoins,LuWalletMinimal, LuLogOut} from"react-icons/lu";

export const SIDE_MENU_DATA =[
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/dashboard"
    },
    {
        id:"02",
        label:"Income",
        icon:LuWalletMinimal,
        path:"/income"
    },
    {
        id:"03",
        label:"Expense",
        icon:LuHandCoins,
        path:"/expense"
    },
    {
        id:"04",
        label:"Challenges",
        icon:LuTrophy,
        path:"/challenges"
    },
    {
        id:"05",
        label:"Friends",
        icon:LuUsers,
        path:"/friends"
    },
    {
        id:"06",
        label:"Logout",
        icon:LuLogOut,
        path:"logout",
        className: "text-red-500 hover:text-red-600"
    },
];