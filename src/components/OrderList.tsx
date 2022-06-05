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

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { OrderWithEmployee } from "../../types/query-types";

function Row({ row }: { row: OrderWithEmployee }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} hover onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell component="th" scope="row">
          {`${row.employee.surname ?? ""} ${row.employee.name}`}
        </TableCell>
        <TableCell align="right">{row.summary}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Товары
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell align="right">Цена</TableCell>
                    <TableCell align="right">Количество</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.goods.map((g) => (
                    <TableRow key={g.good.id}>
                      <TableCell component="th" scope="row">
                        {g.good.name}
                      </TableCell>
                      <TableCell align="right">{g.good.price}</TableCell>
                      <TableCell align="right">{g.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

type Props = {
  data?: OrderWithEmployee[];
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
};

export default function OrderList({ data, page, handleChangePage }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" id="products" component="div">
            Заказы
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="products">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Дата</TableCell>
                <TableCell>Сотрудник</TableCell>
                <TableCell align="right">Сумма</TableCell>
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
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
