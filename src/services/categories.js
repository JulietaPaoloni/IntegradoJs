import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";
import { categoriaActiva } from "../../main";

const handleFilterProductsByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage() || []; // Asegúrate de que sea un array
    switch (categoryIn) {
        case categoriaActiva:
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el) => el.categories === categoryIn);
            handleRenderList(result);
            break;
        case "mayorPrecio":
            const resultPreciMayor = [...products].sort((a, b) => b.precio - a.precio);
            handleRenderList(resultPreciMayor);
            break;
        case "menorPrecio":
            const resultPreciMenor = [...products].sort((a, b) => a.precio - b.precio);
            handleRenderList(resultPreciMenor);
            break;
        default:
            console.warn(`Categoría no reconocida: ${categoryIn}`);
            break;
    }
};

// Render de la vista categorías
export const renderCategories = () => {
    const ulList = document.getElementById("listFilter");
    if (!ulList) {
        console.error("Elemento 'listFilter' no encontrado.");
        return;
    }

    ulList.innerHTML = `
        <li id="Todo">Todos los productos</li>
        <li id="Hamburguesas">Hamburguesas</li>
        <li id="Papas">Papas</li>
        <li id="Gaseosas">Gaseosas</li>
        <li id="mayorPrecio">Mayor Precio</li>
        <li id="menorPrecio">Menor Precio</li>
    `;

    const liElements = ulList.querySelectorAll("li");

    const handleClick = (elemento) => {
        handleFilterProductsByCategory(elemento.id);
        liElements.forEach((el) => {
            el.classList.remove("liActive"); // Limpiar todos los elementos
        });
        elemento.classList.add("liActive"); // Activar el elemento actual
    };

    liElements.forEach((lieElement) => {
        lieElement.addEventListener('click', () => {
            handleClick(lieElement);
        });
    });
};

