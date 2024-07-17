
const mp = new MercadoPago('APP_USR-0c416d7f-7422-47c5-ab37-15076be928ba', {
    locale: "es-AR",
});


document.getElementById("checkout-btn").addEventListener("click", async()=>{
  try{
    const orderData ={
        title: document.querySelector(".name").innerText,
        quantity: 1,
        price: 2000
    };

    const response = await fetch("http://localhost:3000/create-orden",{
        method: "POST",
        headers: {
            "Content-type": "application/json",   
        },
        body: JSON.stringify(orderData)
    });

    const preference = await response.json ();
    createCheckoutButton(preference.id)

    } catch(error){
        alert ("error en el client");
    }
});

const createCheckoutButton = (preferenceId) => {

    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
    if(window.checkoutButton) window.checkoutButton.unmount();//para desparcear si ya hay una preferencia hecha
       await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
            /*customization: {
                texts: {
                    valueProp: 'smart_option',
                },
            },*/
        });
 
    }

    renderComponent();

}