import {createContext} from 'react';
import Store from "../store";

interface IStore {
    store: Store
}
const store = new Store();

export const StoreContext = createContext<IStore>({
    store
})