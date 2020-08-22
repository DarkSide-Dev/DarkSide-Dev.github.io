const selecionar = (e)=> {return document.querySelector(e)};
const selecionarTodos = (el)=> {return document.querySelectorAll(el)};
let modalQT = 1; // Quantidade de pizza
let cart = []; // Carrinho de compras
let modalKey = 0; // índice das pizzas

// DENTRO DO MAP

pizzaJson.map((pizza, index)=>{ // Comando para preencher a tela de acordo com a quantidade de pizzas

    let pizzaItem = selecionar('.models .pizza-item').cloneNode(true); // Clona a div junto com seu conteúdo

    pizzaItem.setAttribute('data-key', index); // Adiciona um atributo com o valor do index da pizza

    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name; // Insere o nome da pizza
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description; // Insere a descrição da pizza
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2).replace(".",",")}`; // Insere e formata o preço da pizza
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img; // Insere o caminho da imagem a ser pega

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{ // Adiciona um evento do tipo click no botão

        e.preventDefault(); // Previne a ação padrão

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
                // Target refere-se a um novo alvo, no caso o próprio item
                // Closest pega o 'item' mais próximo com o nome referido
                // GetAttribute pega o valor do atributo referido

        console.log('Clicou na pizza ' + key);

        modalQT = 1;
        modalKey = key;

        selecionar('.pizzaBig img').src = pizzaJson[key].img;

        selecionar('.pizzaInfo h1').innerHTML = pizzaJson[key].name;

        selecionar('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        selecionar('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace(".",",")}`;

        selecionar('.pizzaInfo--size.selected').classList.remove('selected');

        selecionarTodos('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        selecionar('.pizzaInfo--qt').innerHTML = modalQT;

        selecionar('.pizzaWindowArea').style.opacity = 0;
        selecionar('.pizzaWindowArea').style.display = 'flex';

        setTimeout(()=>{

            selecionar('.pizzaWindowArea').style.opacity = 1;

        }, 200)
    })
    
    selecionar('.pizza-area').append(pizzaItem); // Append adiciona
});

// FORA DO MAP

// EVENTOSS

function closeModal(){ // Fechar clicando no botão

    selecionar('.pizzaWindowArea').style.opacity = 0;

    setTimeout(()=>{

        selecionar('.pizzaWindowArea').style.display = 'none';

    }, 500);

};

selecionarTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{ // Irá adicionar a função de fechamento nos botões
    item.addEventListener('click', closeModal);
});

selecionar('.pizzaInfo--qtmenos').addEventListener('click',()=>{ // Função adicionada no botão '-' para diminuir a quantidade

    if(modalQT > 1){
        modalQT--;
        selecionar('.pizzaInfo--qt').innerHTML = modalQT;
    }

});

selecionar('.pizzaInfo--qtmais').addEventListener('click',()=>{ // Função adicionada no botão '+' para aumentar a quantidade

    modalQT++;
    selecionar('.pizzaInfo--qt').innerHTML = modalQT;

});

selecionarTodos('.pizzaInfo--size').forEach((size, sizeIndex)=>{

    size.addEventListener('click', (e)=>{

        selecionar('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected'); // Adiciona a classe selected ao botão clicado

    });

});

selecionar('.pizzaInfo--addButton').addEventListener('click', ()=>{

    // Qual a pizza

    console.log('Pizza: ', modalKey);

    // Tamanho

    let size =  parseInt(selecionar('.pizzaInfo--size.selected').getAttribute('data-key'));
    console.log('Tamanho: ', size);

    // Quantas

    console.log('Quantidade: ', modalQT);

    let identifier = pizzaJson[modalKey].id+"@"+size; // Variável criada com o objetivo de impedir a criação de arrays iguais
    // Seu valor será definido através do id da pizza, acrescentado de '@' e logo após, o valor de seu tamanho

    let key = cart.findIndex((item)=>{ // Dentro da array cart, será rodado uma função para todos seus valores
        // E caso não exista um identifier equivalente ao que será processado, um novo item será feito
        // Caso contrário, apenas serão somadas as quantidades do item que será processado, ao que já foi processado

        return item.identifier == identifier;

    });

    if(key != -1){
        
        cart[key].qt += modalQT;

    }
    else{

        cart.push({ // Comando push, feito para adicionar itens no array em questão (cart)

            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQT
        });

    }

    updateCart();

    closeModal();

});

function updateCart(){

    selecionar('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) { // Caso a quantidade de itens dentro do carrinho seja maior que 0

        selecionar('aside').classList.add('show');

        selecionar('.cart').innerHTML = '';

        let total = 0;
        let subtotal = 0;
        let desconto = 0;

        for(let i in cart){

            let pizzaItem = pizzaJson.find((item)=>{

                return item.id == cart[i].id;

            });

            subtotal += pizzaItem.price * cart[i].qt;

            console.log('Está presente no carrinho: ', pizzaItem);

            let cartItem = selecionar('.models .cart--item').cloneNode(true); // Clonando a área selecionada, juntamente ao seu conteúdo

            selecionar('.cart').append(cartItem); // Adicionando a área selecionada

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;

                case 1:
                    pizzaSizeName = 'M';
                    break;

                case 2:
                    pizzaSizeName = 'G';
                    break;

            
                default:
                    pizzaSizeName = 'ERRO';
                    break;
            }
            
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML =   cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{

                if (cart[i].qt > 1){

                    cart[i].qt--;

                }
                else{

                    cart.splice(i, 1);

                }
                updateCart();

            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{

                cart[i].qt++;
                updateCart();

            });

        };

        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        
        selecionar('.subtotal span:last-child').innerHTML = subtotal.toFixed(2).replace('.',','); 
        selecionar('.desconto span:last-child').innerHTML = desconto.toFixed(2).replace('.',',');
        selecionar('.total span:last-child').innerHTML = total.toFixed(2).replace('.',',');

    } else {
              
        selecionar('aside').classList.remove('show');

    };

};

selecionar('.menu-openner').addEventListener('click',()=>{

    if(cart.length > 0){
        
        selecionar('aside').style.left = '0px';

    }

});

selecionar('.menu-closer').addEventListener('click',()=>{

    if(cart.length > 0){
        
        selecionar('aside').style.left = '100vw';

    }

});