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

import { GoodsWithAuthor } from "../../types/query-types";

interface HeadCell {
  id: keyof Partial<GoodsWithAuthor>;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Название",
  },
  {
    id: "amount",
    label: "Количество",
  },
  {
    id: "author",
    label: "Добавил",
  },
];

type Props = {
  data?: GoodsWithAuthor[];
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
};

export default function ProductList({ data, page, handleChangePage }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" id="products" component="div">
            Продукты
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="products">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page * 10, page * 10 + 10).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{`${row.author.surname ?? ""} ${row.author.name}`}</TableCell>
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
