import { Restaurant } from "./Restaurant";
import { Product } from "./Product";
import { User } from "./User";
export interface AppState {
  user: User;
  products: Product[];
  restaurants: Restaurant[];
}
