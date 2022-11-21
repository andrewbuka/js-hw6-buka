const wrapper = document.querySelector('.wrapper');
const body = document.querySelector('body');
wrapper.classList.add('mx-0');
body.classList.add('body');

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    console.log(data.products);
    // Start here :)
    const { products } = data;
    cardsBilding(products);
    searchClick(products);
    searchEnter(products);
});

createHeader();

createWindow();

// header creating
function createHeader() {
  const header = createHeaderBox();
  body.prepend(header);
}

function createHeaderBox() {
  const inputAttributes = [
    {
      prop: 'type',
      value: 'search',
    },
  ];

  const btnAttributes = [
    {
      prop: 'type',
      value: 'button',
    },
  ];

  const linkAttributes = [
    {
      prop: 'href',
      value: '#',
    },
  ];

  const btnGreenHeader = createElement('button', ['my-btn-green-class'], btnAttributes, 'Your cart - 00.00$');
  const titleHeader = createElement('h1', ['my-title-header-class'], null, 'Our Shop');
  const link = createElement('a', ['my-link-class'], linkAttributes, null, [titleHeader], 'append');
  const inputHeader = createElement('input', ['my-input-class'], inputAttributes);
  const btnSearchHeader = createElement('button', ['my-btn-search-class'], btnAttributes, 'Search');
  const innerHeaderContainer = createElement('div', ['my-inner-header-class'], null, null, [btnGreenHeader, inputHeader, btnSearchHeader], 'append');
  const headerBox = createElement('header', ['my-header-class'], null, null, [link, innerHeaderContainer], 'append');
  return headerBox;
}

const btnSearch = document.querySelector('.my-btn-search-class');
const input = document.querySelector('.my-input-class');
const btnGreen = document.querySelector('.my-btn-green-class');

// SEARCH
function searchEnter(products) {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      wrapper.textContent = '';
      let value = input.value.trim();
      const rr = products.filter(position => position.title.toLowerCase().includes(`${value}`));

      rr.forEach((position) => {
        const imageContainer = createImageContainer(position);
        const titleDescriptionContainer = createDescriptionContainer(position);
        const priceRatingContainer = createPriceRatingContainer(position);
        const btnCard = createBtnCard(position);
        const innerWrapper = createCard();
        innerWrapper.append(imageContainer, titleDescriptionContainer, priceRatingContainer, btnCard);
        wrapper.append(innerWrapper);
      });
    }
  });
}

function searchClick(products) {
  btnSearch.addEventListener('click', () => {
    wrapper.textContent = '';
    let value = input.value.trim();
    const sort = products.filter(position => position.title.toLowerCase().includes(`${value}`));

    sort.forEach((position) => {
      const imageContainer = createImageContainer(position);
      const titleDescriptionContainer = createDescriptionContainer(position);
      const priceRatingContainer = createPriceRatingContainer(position);
      const btnCard = createBtnCard(position);
      const innerWrapper = createCard();
      innerWrapper.append(imageContainer, titleDescriptionContainer, priceRatingContainer, btnCard);
      wrapper.append(innerWrapper);
    });
  });
}

// window
function createWindow() {
  const btnAttributes = [
    {
      prop: 'type',
      value: 'button',
    },
  ];

  const greyBackground = createElement('div', ['grey-background-class', 'none']);
  const windowContent = createWindowContent();
  body.append(greyBackground, windowContent);

  function createWindowContent() {
    const innerWIndowContainer = createElement('div', ['inner-window-conainer-class'], null);
    const closeBtn = createElement('button', ['close-btn-class'], btnAttributes, 'X');
    const titleOrder = createElement('h2', ['title-order-class'], null, 'Your order');
    const total = createElement('p', ['total-class'], null, 'Total: 00.00$');
    const longBlueBtn = createElement('button', ['long-blue-button-class', 'none'], btnAttributes, 'Order');
    const longBlueBtnHidden = createElement('button', ['long-blue-button-hidden-class'], btnAttributes, 'Order');
    const totalOrderContainer = createElement('div', ['total-order-container-class'], null, null, [total, longBlueBtn, longBlueBtnHidden], 'append');
    const noOrders = createElement('p', ['no-orders-class'], null, `You don't have any items in order`);

    closeBtn.addEventListener('click', () => {
      windowContainer.classList.add('none');
      greyBackground.classList.add('none');
    });

    const windowContainer = createElement('div', ['window-container-class', 'none'], null, null,
    [innerWIndowContainer, closeBtn, titleOrder, totalOrderContainer, noOrders], 'append');

    return windowContainer;
  }
}

const windowContent = document.querySelector('.window-container-class');
const windowGrey = document.querySelector('.grey-background-class');

btnGreen.addEventListener('click', () => {
  windowContent.classList.remove('none');
  windowGrey.classList.remove('none');
});

// Adding of card elements
function cardsBilding(products) {
  products.forEach((position) => {
    const imageContainer = createImageContainer(position);
    const titleDescriptionContainer = createDescriptionContainer(position);    
    const priceRatingContainer = createPriceRatingContainer(position);
    const btnCard = createBtnCard(position);
    const innerWrapper = createCard();
    innerWrapper.append(imageContainer, titleDescriptionContainer, priceRatingContainer, btnCard);
    wrapper.append(innerWrapper);
  });
}

// card
function createCard () {
  return createElement('div', ['col-12', 'col-md-2', 'card', 'mx-2', 'my-2',
  'my-width-inner-wrapper', 'px-0']);
}

// image
function createImageContainer(position) {
  const imageAttributes = [
    {
      prop: 'src',
      value: position.thumbnail,
    },
    {
      prop: 'alt',
      value: position.title,
    },
  ];
  const image = createElement('img', ['card-img-top'], imageAttributes);
  const imageBox = createElement('div', ['my-height-image', 'overflow-hidden',
  'card-img-top'],null, null, [image], 'append');
  return imageBox;
}

// description
function createDescriptionContainer(position) {
  const titleItem = createElement('h5', ['card-title'], null, position.title);
  const descriptionItem = createElement('p', ['card-text'], null, position.description);
  const descriptionBox = createElement('div', ['card-body'], null, null, [titleItem, descriptionItem], 'append');
  return descriptionBox;
}

// price-rating
function createPriceRatingContainer(position) {
  const priceItem = createElement('p', ['my-3'], null, `Price: ${position.price}$`);
  const ratingItem = createElement('p', ['my-3'], null, `Rating: ${position.rating}`);
  const priceRatingBox = createElement('div', ['d-flex', 'justify-content-around', 'align-items-center',
  'card-footer', 'mx-3', 'my-3', 'p-0', 'my-height-footer'], null, null, [priceItem, ratingItem], 'append');
  return priceRatingBox;
}

const orderLongBtn = document.querySelector('.long-blue-button-class');
const orderLongBtnHeaden = document.querySelector('.long-blue-button-hidden-class');
const noOrdersWindow = document.querySelector('.no-orders-class');
const windowBox = document.querySelector('.inner-window-conainer-class');
let total = document.querySelector('.total-class');
let priceValue = 1;
let clickAmount = 0;

// Blue btn events
function createBtnCard (position) {
  const btnAttributes = [
    {
      prop: 'type',
      value:'button',
    },
  ];

  const blueBtn = createElement('button', ['my-blue-btn-class'], btnAttributes, 'Add to cart');
  

  blueBtn.addEventListener('click', () => {
    orderLongBtn.classList.remove('none');
    orderLongBtnHeaden.classList.add('none');

    // changing of common btn
    let stringBtnHeader = btnGreen.textContent;
    let toMassive = stringBtnHeader.split(' ');
    let lastChildMassive = toMassive[toMassive.length-1];
    let toMassive2 = lastChildMassive.split('$');
    let numberFromHeader = Number(toMassive2[0]);
    btnGreen.textContent = `Your cart - ${(numberFromHeader + position.price).toFixed(2)}$`;

    // changing of total
    let totalContent = total.textContent;
    let totalToMassive = totalContent.split(' ');
    let lastItem = totalToMassive[totalToMassive.length - 1];
    let tolastItemMasssive = lastItem.split('$');
    let numberFromTotal = Number(tolastItemMasssive[0]);

    let stringBtnHeader2 = btnGreen.textContent;
    let toMassive4 = stringBtnHeader2.split(' ');
    let lastChildMassive2 = toMassive4[toMassive4.length - 1];
    let toMassive5 = lastChildMassive2.split('$');
    let numberFromHeader2 = Number(toMassive5[0]);
    numberFromTotal = numberFromHeader2;

    tolastItemMasssive[0] = numberFromTotal.toFixed(2);
    let totalToStringSecond = tolastItemMasssive.join('$');
    totalToMassive[totalToMassive.length - 1] = totalToStringSecond;
    let totalToStringFirst = totalToMassive.join(' ');
    total.textContent = totalToStringFirst;

    if (clickAmount === 0) {
      createOrderItem();
      clickAmount++;
      noOrdersWindow.classList.add('none');
      return;
    }

    const imageAttributes = [
      {
        prop: 'src',
        value: position.thumbnail,
      },
      {
        prop: 'alt',
        value: position.title,
      },
    ];

    const imageWindow = createElement('img', ['image-window'], imageAttributes);
    const btnPlus = createElement('button', ['btn-plus-class'], btnAttributes, '+');
    const btnBlueWindow = createElement('button', ['btn-blue-window-class'], btnAttributes, `${priceValue++} X ${position.price}`);
    const btnMinusHidden = createElement('button', ['btn-minus-hidden-class', 'none'], btnAttributes, '-');
    const btnMinus = createElement('button', ['btn-minus-class'], btnAttributes, '-');
    const btnRed = createElement('button', ['btn-red-class'], btnAttributes, 'Remove from order');

    btnPlus.addEventListener('click', onPlusClick);
    btnMinus.addEventListener('click', onMinusClick);
    btnRed.addEventListener('click', onDeleteClick);

    function onPlusClick() {
      priceValue++;

       // changing of digital
      let string = itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent;
      let toMassive = string.split(' ');
      let number = Number(toMassive[0]);
      number += 1;
      toMassive[0] = number;
      let toString2 = toMassive.join(' ');
      itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent = toString2;
      if (number > 1) {
        btnMinusHidden.classList.add('none');
        btnMinus.classList.remove('none');
      }

       // changing of value of blue btn
      let amount = Number(toMassive[2]);
      let stringBtnHeader = btnGreen.textContent;
      let toMassive2 = stringBtnHeader.split(' ');
      let lastChildMassive = toMassive2[toMassive2.length - 1];
      let toMassive3 = lastChildMassive.split('$');
      let numberFromHeader = Number(toMassive3[0]);
      btnGreen.textContent = `Your cart - ${(numberFromHeader + amount).toFixed(2)}$`;

      // changing of total if +
      let totalContent = total.textContent;
      let totalToMassive = totalContent.split(' ');
      let lastItem = totalToMassive[totalToMassive.length - 1];
      let tolastItemMasssive = lastItem.split('$');
      let numberFromTotal = Number(tolastItemMasssive[0]);
      let stringBtnHeader2 = btnGreen.textContent;
      let toMassive4 = stringBtnHeader2.split(' ');
      let lastChildMassive2 = toMassive4[toMassive4.length - 1];
      let toMassive5 = lastChildMassive2.split('$');
      let numberFromHeader2 = Number(toMassive5[0]);
      numberFromTotal = numberFromHeader2;
      tolastItemMasssive[0] = numberFromTotal.toFixed(2);
      let totalToStringSecond = tolastItemMasssive.join('$');
      totalToMassive[totalToMassive.length - 1] = totalToStringSecond;
      let totalToStringFirst = totalToMassive.join(' ');
      total.textContent = totalToStringFirst;
    };    

    function onMinusClick() {
      priceValue--;

      //changing of digital
      let string = itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent;
      let toMassive = string.split(' ');
      let number = Number(toMassive[0]);
      number -= 1;
      toMassive[0] = number;
      let toString2 = toMassive.join(' ');
      itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent = toString2;
      if (number < 2) {
        btnMinusHidden.classList.remove('none');
        btnMinus.classList.add('none');
      } 

      // changing of value of blue btn if -
      let amount = Number(toMassive[2]);
      let stringBtnHeader = btnGreen.textContent;
      let toMassive2 = stringBtnHeader.split(' ');
      let lastChildMassive = toMassive2[toMassive2.length - 1];
      let toMassive3 = lastChildMassive.split('$');
      let numberFromHeader = Number(toMassive3[0]);
      btnGreen.textContent = `Your cart - ${(numberFromHeader - amount).toFixed(2) }$`;

      //changing of value of total btn if -
      let totalContent = total.textContent;
      let totalToMassive = totalContent.split(' ');
      let lastItem = totalToMassive[totalToMassive.length - 1];
      let tolastItemMasssive = lastItem.split('$');
      let numberFromTotal = Number(tolastItemMasssive[0]);

      let stringBtnHeader2 = btnGreen.textContent;
      let toMassive4 = stringBtnHeader2.split(' ');
      let lastChildMassive2 = toMassive4[toMassive4.length - 1];
      let toMassive5 = lastChildMassive2.split('$');
      let numberFromHeader2 = Number(toMassive5[0]);
      numberFromTotal = numberFromHeader2;

      tolastItemMasssive[0] = numberFromTotal.toFixed(2);
      let totalToStringSecond = tolastItemMasssive.join('$');

      totalToMassive[totalToMassive.length - 1] = totalToStringSecond;
      let totalToStringFirst = totalToMassive.join(' ');
      total.textContent = totalToStringFirst;
    };

    // Remove  
    function onDeleteClick(event)  {
      event.target.parentElement.remove();

       // taking of value from window btn
      let string = itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent;
      let toMassive = string.split(' ');
      let number = Number(toMassive[0]);
      let amount = Number(toMassive[2]);

      // changing of value of common btn if delete
      let stringBtnHeader = btnGreen.textContent;
      let toMassive2 = stringBtnHeader.split(' ');
      let lastChildMassive = toMassive2[toMassive2.length - 1];
      let toMassive3 = lastChildMassive.split('$');
      let numberFromHeader = Number(toMassive3[0]);
      btnGreen.textContent = `Your cart - ${(numberFromHeader - amount * number).toFixed(2) }$`;

      // changing of value of total btn if delete
      let totalContent = total.textContent;
      let totalToMassive = totalContent.split(' ');
      let lastItem = totalToMassive[totalToMassive.length - 1];
      let tolastItemMasssive = lastItem.split('$');
      let numberFromTotal = Number(tolastItemMasssive[0]);

      let stringBtnHeader2 = btnGreen.textContent;
      let toMassive4 = stringBtnHeader2.split(' ');
      let lastChildMassive2 = toMassive4[toMassive4.length - 1];
      let toMassive5 = lastChildMassive2.split('$');
      let numberFromHeader2 = Number(toMassive5[0]);
      numberFromTotal = numberFromHeader2;

      tolastItemMasssive[0] = numberFromTotal.toFixed(2);
      let totalToStringSecond = tolastItemMasssive.join('$');

      totalToMassive[totalToMassive.length - 1] = totalToStringSecond;
      let totalToStringFirst = totalToMassive.join(' ');
      total.textContent = totalToStringFirst;

      if (numberFromTotal === 0) {
        noOrdersWindow.classList.remove('none');
      }

      if (numberFromTotal === 0) {
        btnGreen.textContent = `Your cart - 00.00$`;
      }
      
      if (numberFromTotal === 0) {
        orderLongBtnHeaden.classList.remove('none');
        orderLongBtn.classList.add('none');
      }
    };
  
    const btnContainer = createElement('div', ['btn-container-class'], null, null,
    [btnMinus, btnMinusHidden, btnBlueWindow, btnPlus], 'append');
    const imgWindowContainer = createElement('div', ['img-window-container-class'], null, null,
    [imageWindow], 'append');
    const nameItnem = createElement('div', ['name-item'], null, `${position.title}`);
    const itemContainer = createElement('div', ['item-container-class'], null, null,
    [imgWindowContainer, nameItnem, btnContainer, btnRed], 'append');
    windowBox.append(itemContainer);
 
    if (itemContainer.previousSibling?.firstChild.nextSibling.textContent === itemContainer.firstChild.nextSibling.textContent ) {
      itemContainer.previousSibling.remove();
    }  else {
        itemContainer.remove();
        priceValue = 1;
        createOrderItem();
      } 

    if (numberFromTotal > 0) {
      noOrdersWindow.classList.add('none');
    }
   
    function createOrderItem () {
      const btnAttributes = [
        {
          prop: 'type',
          value: 'button',
        },
      ];

      const imageAttributes = [
        {
          prop: 'src',
          value: position.thumbnail,
        },
        {
          prop: 'alt',
          value: position.title,
        },
      ];

      const imageWindow = createElement('img', ['image-window'], imageAttributes);
      const btnPlus = createElement('button', ['btn-plus-class'], btnAttributes, '+');
      const btnBlueWindow = createElement('button', ['btn-blue-window-class'], btnAttributes, `${priceValue++} X ${position.price}`);
      const btnMinusHidden = createElement('button', ['btn-minus-hidden-class'], btnAttributes, '-');
      const btnMinus = createElement('button', ['btn-minus-class', 'none'], btnAttributes, '-');
      const btnRed = createElement('button', ['btn-red-class'], btnAttributes, 'Remove from order');

      btnPlus.addEventListener('click', onPlusClick);
      btnMinus.addEventListener('click', onMinusClick); 
      btnRed.addEventListener('click', onDeleteClick);

      function onPlusClick() {
        priceValue++;

        // changing of digital
        let string = itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent;
        let toMassive = string.split(' ');
        let number = Number(toMassive[0]);
        number += 1;
        toMassive[0] = number;
        let toString2 = toMassive.join(' ');
        itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent = toString2;

        if (number > 1) {
          btnMinusHidden.classList.add('none');
          btnMinus.classList.remove('none');
        }

        // blue btn if+
        let amount = Number(toMassive[2]);
        let stringBtnHeader = btnGreen.textContent;
        let toMassive2 = stringBtnHeader.split(' ');
        let lastChildMassive = toMassive2[toMassive2.length - 1];
        let toMassive3 = lastChildMassive.split('$');
        let numberFromHeader = Number(toMassive3[0]);
        btnGreen.textContent = `Your cart - ${(numberFromHeader + amount).toFixed(2) }$`;

        // total if +
        let totalContent = total.textContent;
        let totalToMassive = totalContent.split(' ');
        let lastItem = totalToMassive[totalToMassive.length - 1];
        let tolastItemMasssive = lastItem.split('$');
        let numberFromTotal = Number(tolastItemMasssive[0]);

        let stringBtnHeader2 = btnGreen.textContent;
        let toMassive4 = stringBtnHeader2.split(' ');
        let lastChildMassive2 = toMassive4[toMassive4.length - 1];
        let toMassive5 = lastChildMassive2.split('$');
        let numberFromHeader2 = Number(toMassive5[0]);
        numberFromTotal = numberFromHeader2;

        tolastItemMasssive[0] = numberFromTotal.toFixed(2);
        let totalToStringSecond = tolastItemMasssive.join('$');

        totalToMassive[totalToMassive.length - 1] = totalToStringSecond;
        let totalToStringFirst = totalToMassive.join(' ');
        total.textContent = totalToStringFirst;
      }

      function onMinusClick() {
        priceValue--;

        //digital
        let string = itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent;
        let toMassive = string.split(' ');
        let number = Number(toMassive[0]);
        number -= 1;
        toMassive[0] = number;
        let toString2 = toMassive.join(' ');
        itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent = toString2;

        if (number < 2) {
          btnMinusHidden.classList.remove('none');
          btnMinus.classList.add('none');
        }

        // blue btn if -
        let amount = Number(toMassive[2]);
        let stringBtnHeader = btnGreen.textContent;
        let toMassive2 = stringBtnHeader.split(' ');
        let lastChildMassive = toMassive2[toMassive2.length - 1];
        let toMassive3 = lastChildMassive.split('$');
        let numberFromHeader = Number(toMassive3[0]);
        btnGreen.textContent = `Your cart - ${(numberFromHeader - amount).toFixed(2) }$`;

        //total if -
        let totalContent = total.textContent;
        let totalToMassive = totalContent.split(' ');
        let lastItem = totalToMassive[totalToMassive.length - 1];
        let tolastItemMasssive = lastItem.split('$');
        let numberFromTotal = Number(tolastItemMasssive[0]);

        let stringBtnHeader2 = btnGreen.textContent;
        let toMassive4 = stringBtnHeader2.split(' ');
        let lastChildMassive2 = toMassive4[toMassive4.length - 1];
        let toMassive5 = lastChildMassive2.split('$');
        let numberFromHeader2 = Number(toMassive5[0]);
        numberFromTotal = numberFromHeader2;

        tolastItemMasssive[0] = numberFromTotal.toFixed(2);
        let totalToStringSecond = tolastItemMasssive.join('$');


        totalToMassive[totalToMassive.length - 1] = totalToStringSecond;
        let totalToStringFirst = totalToMassive.join(' ');
        total.textContent = totalToStringFirst;
      }

      function onDeleteClick(event) {
        // value of btn from window
        event.target.parentElement.remove();
        let string = itemContainer.lastChild.previousSibling.firstChild.nextSibling.nextSibling.textContent;
        let toMassive = string.split(' ');
        let number = Number(toMassive[0]);
        let amount = Number(toMassive[2]);

        // common btn if delete
        let stringBtnHeader = btnGreen.textContent;
        let toMassive2 = stringBtnHeader.split(' ');
        let lastChildMassive = toMassive2[toMassive2.length - 1];
        let toMassive3 = lastChildMassive.split('$');
        let numberFromHeader = Number(toMassive3[0]);
        btnGreen.textContent = `Your cart - ${(numberFromHeader - amount * number).toFixed(2)}$`;

        // total if delete
        let totalContent = total.textContent;
        let totalToMassive = totalContent.split(' ');
        let lastItem = totalToMassive[totalToMassive.length - 1];
        let tolastItemMasssive = lastItem.split('$');
        let numberFromTotal = Number(tolastItemMasssive[0]);

        let stringBtnHeader2 = btnGreen.textContent;
        let toMassive4 = stringBtnHeader2.split(' ');
        let lastChildMassive2 = toMassive4[toMassive4.length - 1];
        let toMassive5 = lastChildMassive2.split('$');
        let numberFromHeader2 = Number(toMassive5[0]);
        numberFromTotal = numberFromHeader2;

        tolastItemMasssive[0] = numberFromTotal.toFixed(2);
        let totalToStringSecond = tolastItemMasssive.join('$');


        totalToMassive[totalToMassive.length - 1] = totalToStringSecond;
        let totalToStringFirst = totalToMassive.join(' ');
        total.textContent = totalToStringFirst;

        if (numberFromTotal === 0) {
          noOrdersWindow.classList.remove('none');
        }

        if (numberFromTotal === 0) {
          btnGreen.textContent = `Your cart - 00.00$`;
        }

        if (numberFromTotal === 0) {
          orderLongBtnHeaden.classList.remove('none');
          orderLongBtn.classList.add('none');
        }

      };

      const btnContainer = createElement ('div', ['btn-container-class'], null, null,
      [btnMinus, btnMinusHidden, btnBlueWindow, btnPlus], 'append');
      const imgWindowContainer = createElement('div', ['img-window-container-class'], null, null,
      [imageWindow], 'append');
      const nameItnem = createElement('div', ['name-item'], null, `${position.title}`);
      const itemContainer = createElement('div', ['item-container-class'], null, null,
      [imgWindowContainer, nameItnem, btnContainer, btnRed], 'append');
      windowBox.append(itemContainer);
    }
  });

  return blueBtn;
}

// creating of any element
function createElement (tag, classList, attributes, textContent, children, insertType) {
  const element = document.createElement(tag);

  if (classList?.length) {
    element.classList.add(...classList);
  }

  if (attributes?.length) {
    attributes.forEach(({ prop, value }) => {
      element.setAttribute(prop, value);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (children) {
    element[insertType](...children);
  }

  return element;
}
