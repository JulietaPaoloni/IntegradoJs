/*======LOCALSTORAGE======*/

//traer productos
export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        return products;
    } else {
        return [];
    }
}

//guardar productos
export const setInLocalStorage = (productIn) => {
    if (productIn) {
        let prodcutInLocal = handleGetProductLocalStorage();

        const existingIndex = prodcutInLocal.findIndex((prodcutInLocal) =>
            prodcutInLocal.id === productIn.id
        );

        if (existingIndex !== -1) {
            prodcutInLocal[existingIndex] = productIn;
        } else {
            prodcutInLocal.push(productIn);
        }
        //setear un nuevo producto
        localStorage.setItem("products", JSON.stringify(prodcutInLocal));
    }
}