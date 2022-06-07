import { useState } from "react";

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
import { TimeTableWithEmployee } from "../../types/query-types";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import OrderList from "./OrderList";

function Row({ row }: { row: TimeTableWithEmployee }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          ...(open && { backgroundColor: "primary.main" }),
        }}
        hover={!open}
        onClick={() => setOpen((prev) => !prev && !!row.orders.length)}
      >
        <TableCell>
          {!!row.orders.length && (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{row.start}</TableCell>
        <TableCell>{row.end}</TableCell>
        <TableCell component="th" scope="row">
          {`${row.employee.surname ?? ""} ${row.employee.name}`}
        </TableCell>
        <TableCell align="center">{row.executed ? <CheckIcon /> : <CloseIcon />}</TableCell>
      </TableRow>
      {!!row.orders.length && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <OrderList data={row.orders} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

type Props = {
  data?: TimeTableWithEmployee[];
};

export default function TimeTableList({ data }: Props) {
  const [page, setPage] = useState<number>(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
            Смены
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="users">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Начало</TableCell>
                <TableCell>Окончание</TableCell>
                <TableCell>Сотрудник</TableCell>
                <TableCell align="center">Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page * 10, page * 10 + 10).map((row) => (
                <Row key={row.id} row={row} />
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
          onPageChange={(_, newPage: number) => setPage(newPage)}
        />
      </Paper>
    </Box>
  );
}
