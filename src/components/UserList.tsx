import { User } from "@prisma/client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface HeadCell {
  id: keyof Partial<User>;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Имя",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "carierStart",
    label: "Дата начала карьеры",
  },
  {
    id: "role",
    label: "Роль",
  },
];

type Props = {
  data?: (User & { carierStart: string })[];
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
};

export default function UserList({ data, page, handleChangePage }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
            Сотрудники
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="users">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
                <TableCell align="center">Подтвердил</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page * 10, page * 10 + 10).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row">{`${row.surname ?? ""} ${
                    row.name
                  }`}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.carierStart}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell align="center">
                    {row.emailVerified ? <CheckIcon /> : <CloseIcon />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={data?.length ?? 0}
          rowsPerPageOptions={[]}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
