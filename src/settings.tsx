import { Role } from "../types/roles";

export const Links = [
  {
    to: "/profile",
    icon: <div />,
    title: "Профиль",
    roles: [Role.ADMIN, Role.PREPOD],
  },
  // {to: '/orders', icon: <BookOutlined />, title: 'Заявки', roles: [Role.STUDENT, Role.ADMIN,  Role.PREPOD]},
  // {to: '/timetable', icon:  <FieldTimeOutlined />, title: 'Расписание', roles: [Role.PREPOD, Role.ADMIN]},
  // {to: '/professors', icon: <ContactsOutlined />, title: 'Преподаватели', roles: [Role.STUDENT, Role.ADMIN]},
  // {to: '/students', icon: <IdcardOutlined />, title: 'Студенты', roles: [Role.ADMIN]},
  // {to: '/statistic', icon: <PieChartOutlined />, title: 'Администратору', roles: [Role.ADMIN]},
];

export const USE_QUERY_CONSTS = {
  SUBJECTS: "SUBJECTS",
  GROUPS: "GROUPS",
};

export const OPEN_URLS = ["img"];

export const DATE_FORMAT = "DD.MM.YYYY";
