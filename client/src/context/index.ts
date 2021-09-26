import {createContext, useContext} from 'react';
import Store from "../store";

interface IStore {
    store: Store
}
const store = new Store();

export const StoreContext = createContext<IStore>({
    store
})

export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStoreContext must be called with StoreContext.Provider')
    }
    return context;
}