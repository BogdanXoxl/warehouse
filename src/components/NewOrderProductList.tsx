import { useState } from "react";
import { observer } from "mobx-react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import ToggleButton from "@mui/material/ToggleButton";
import TablePagination from "@mui/material/TablePagination";

import AddIcon from "@mui/icons-material/Add";
import Check from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

import cartStore from "../lib/store";

import { GoodsWithAuthor } from "../../types/query-types";

type Props = {
  data?: GoodsWithAuthor[];
  onSearch: (value: string | null) => void;
};

export default observer(function NewOrderProductList({ data, onSearch }: Props) {
  const [page, setPage] = useState<number>(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" id="products" component="div">
            Продукты
          </Typography>
          <Autocomplete
            freeSolo
            sx={{ minWidth: "150px" }}
            size="small"
            onChange={(e, v) => onSearch(v)}
            options={data?.map((option) => option.name) || []}
            renderInput={(params) => <TextField {...params} label="Поиск" />}
          />
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="products">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Кол.</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page * 5, page * 5 + 5).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell align="right">
                    <ToggleButton
                      value="check"
                      disabled={cartStore.inCart(row.id) || !row.amount}
                      onChange={() => cartStore.add(row)}
                    >
                      {row.amount ? (
                        !cartStore.inCart(row.id) ? (
                          <AddIcon />
                        ) : (
                          <Check />
                        )
                      ) : (
                        <DoNotDisturbIcon />
                      )}
                    </ToggleButton>
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
          rowsPerPage={5}
          page={page}
          onPageChange={(_, _page) => setPage(_page)}
        />
      </Paper>
    </Box>
  );
});
