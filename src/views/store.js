//====STORE====
import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";



//Funcion que trae los elementos y llama al render
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
}

export const handleRenderList = (products) => {

    //Filtrado de arrays por categoria
    const burgers = products.filter((el) => el.categories === "Hamburguesas");
    const papas = products.filter((el) => el.categories === "Papas");
    const gaseosas = products.filter((el) => el.categories === "Gaseosas");

    //renderiza los elementos
    function renderProductGroup(productos, title) {
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `<div id="product-${producto.categories}-${index}" class="containerTargetItem">
                            <div>
                                <img src='${producto.imagen}'/>
                                <div>
                                    <h2>${producto.nombre}</h2>
                                </div>
                                <div class="targetProps">
                                    <p><b>Precio:</b> $ ${producto.precio}</p>
                                </div>
                            </div>
                        </div>`;
            });

            //Retorna la sección con todos los elementos dentro
            return `
                <section class="sectionStore">
                    <div class="containerTitleSelection"><h3>${title}</h3></div>
                    <div class="containerProductStore">
                        ${productosHTML.join("")}        
                    </div>
                </section>
            `;
        } else {
            return "";
        }
    }

    //renderizar cada uno de los productos dentro de su categoria
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(burgers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    //Añade los eventos de manera dinámica  id
    const addEvents = (products) => {
        products.forEach((element, index) => {
            const productContainer = document.getElementById(`product-${element.categories}-${index}`);
            productContainer.addEventListener('click', () => {
                setProductoActivo(element);
                openModal();
            })
        });
    }
    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);

};