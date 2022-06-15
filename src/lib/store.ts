import { makeAutoObservable } from "mobx";
import { GoodsWithAuthor } from "../../types/query-types";

class Cart {
  goods: (GoodsWithAuthor & { count: number })[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add = (good: GoodsWithAuthor) => {
    if (this.goods.find((g) => g.id === good.id)) {
      this.goods = this.goods.map((g) => (g.id === good.id ? { ...g, count: g.count + 1 } : g));
    } else {
      this.goods.push({ ...good, count: 1 });
    }
  };

  sub = (good: GoodsWithAuthor & { count: number }) => {
    if (good.count < 2) {
      this.remove(good);
    } else {
      this.goods = this.goods.map((g) => (g.id === good.id ? { ...g, count: g.count - 1 } : g));
    }
  };

  remove = (good: GoodsWithAuthor) => (this.goods = this.goods.filter((g) => g.id !== good.id));

  inCart = (id: string) => !!this.goods.find((g) => g.id === id);

  clear = () => (this.goods = []);
}

export default new Cart();
