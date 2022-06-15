import { observer } from "mobx-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";

import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import cartStore from "../../lib/store";

type Props = {
  isLoading?: boolean;
  onSubmit: () => void;
};

export default observer(function NewOrderForm({ isLoading, onSubmit }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{
          width: "100%",
          textAlign: "center",
          pb: "1rem",
        }}
      >
        Корзина
      </Typography>
      <Divider variant="middle" />
      <List
        sx={{
          width: "100%",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {cartStore.goods.map((g) => (
          <ListItem
            divider
            key={g.id}
            secondaryAction={
              <Stack direction="column">
                <Typography component="span" variant="h6">
                  {(g.count * g.price)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  &nbsp;₽
                </Typography>
                <Stack direction="row" gap={1} alignItems="center">
                  <ButtonGroup size="small" aria-label="actions">
                    <Button onClick={() => cartStore.sub(g)}>-</Button>
                    <Button disabled>{g.count}</Button>
                    <Button onClick={() => cartStore.add(g)} disabled={g.count === g.amount}>
                      +
                    </Button>
                  </ButtonGroup>
                  <IconButton edge="end" aria-label="delete" onClick={() => cartStore.remove(g)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            }
          >
            <ListItemText primary={g.name} secondary={`Кол. ${g.amount}`} />
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" />
      <Typography component="h3" variant="h4" width="100%" mt={3}>
        Итог:{" "}
        {cartStore.goods
          .reduce((prev, cur) => cur.count * cur.price + prev, 0)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        &nbsp;₽
      </Typography>
      <LoadingButton
        onClick={onSubmit}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!cartStore.goods.length}
        sx={{ mt: 3, mb: 2 }}
        loading={isLoading}
      >
        Заказать
      </LoadingButton>
    </Box>
  );
});
