import { Role } from "@prisma/client";
// import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";

type LinkType = {
  to: string;
  icon: React.ReactNode;
  title: string;
  roles: Role[];
};

export const Links: LinkType[] = [
  {
    to: "/profile",
    icon: <div>test</div>,
    // icon: <SupervisedUserCircleIcon />,
    title: "Профиль",
    roles: [Role.ADMIN, Role.USER],
  },
  {
    to: "/users",
    // icon: <AccountBoxIcon />,
    icon: <div>test</div>,
    title: "Добавть сотрудника",
    roles: [Role.ADMIN],
  },
];

export const USE_QUERY_CONSTS = {
  SUBJECTS: "SUBJECTS",
  GROUPS: "GROUPS",
  USERS: "USERS",
};

export const OPEN_URLS = ["img"];

export const DATE_FORMAT = "DD.MM.YYYY";

export const DATE_MASK = "__.__.____";
