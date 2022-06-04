import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { USE_QUERY_CONSTS } from "../settings";
import UserService from "../utils/services/user.service";
import { User } from "@prisma/client";

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

export default function UserList() {
  const [page, setPage] = React.useState(0);
  const { data } = useQuery([USE_QUERY_CONSTS.USERS, page], UserService.getUsers, {
    initialData: [],
  });

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
            Сотрудники
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page * 10, page * 10 + 10).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  <TableCell component="th" scope="row">{`${row.surname ?? ""} ${
                    row.name
                  }`}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.carierStart}</TableCell>
                  <TableCell>{row.role}</TableCell>
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
