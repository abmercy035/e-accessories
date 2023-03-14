const cart_tab = document.getElementById( "cart-tab" )
const cart_icon = document.getElementById( "cart-icon" )
const site_nav_icon = document.getElementById( "site-nav-icon" )
const cart_board = document.getElementById( 'aside' )
const nav_link = document.querySelectorAll( '.nav-link' )
const side_bar_nav = document.querySelector( '.site-side-bar' )
const site_body = document.querySelector( '#overlay' )
const cart_item_container = document.querySelector( '.cart-item-container' )
const products_containers = document.querySelectorAll( '.products' )
const price_total_digit = document.querySelector( ".price-total-digit" )
const search_input = document.getElementsByClassName( "search-input" )[ 0 ];
const search_button = document.getElementsByClassName( "search-button" )[ 0 ];
const cart_product_list = []
const showCart = () =>
{
  cart_board.style.width = "220px"
  site_body.style.display = "block"
}
const showSiteNav = () =>
{
  side_bar_nav.style.overflow = "hidden"
  side_bar_nav.style.width = "160px"
  site_body.style.display = "block"

}
const hideCartAndSiteNavForMobile = () =>
{
  site_body.style.display = "none",
    cart_board.style.overflow = "scroll",
    cart_board.style.width = "0%",
    side_bar_nav.style.width = "0%";
}
const hideCartAndSiteNavForTab = () =>
{
  site_body.style.display = "none",
    cart_board.style.width = "0%",
    console.log( "tab" );
}


site_nav_icon.addEventListener( "click", () =>
{
  showSiteNav()
  site_body.addEventListener( "click", hideCartAndSiteNavForMobile )
} )
cart_icon.addEventListener( "click", () =>
{
  showCart()
  site_body.addEventListener( "click", hideCartAndSiteNavForMobile )
  site_nav_icon.disable = true;

} )
cart_tab.addEventListener( "click", () =>
{
  showCart()
  site_body.addEventListener( "click", hideCartAndSiteNavForTab )
} )


nav_link.forEach( link =>
{
  link.addEventListener( "click", hideCartAndSiteNavForMobile )
} )

const pushToCart = ( img, name, price, id ) =>
{
  const isInCart = cart_product_list.filter( item => ( item.id === id ) )
  console.log( isInCart )
  if ( isInCart.length === 0 )
  {
    cart_product_list.push( { img, name, price, id, quantity: 1 } ) &&
      updateCart( img, name, price, id )
  }
  else
  {
    const popup = document.createElement( "div" );
    popup.style.position = "fixed"
    popup.style.top = "15%"
    popup.style.zIndex = "9"
    popup.style.borderRadius = "100px"
    popup.style.left = "10%"
    popup.style.padding = "10px"
    popup.style.backgroundColor = "red"
    popup.textContent = "Product Already in cart"
    document.querySelector( "body" ).appendChild( popup )
    setTimeout( () =>
    {
      popup.style.top = "10%"
      popup.style.opacity = "0.7"
      popup.style.fontSize = "12px"
      popup.style.padding = "5px"
      popup.style.backgroundColor = "red"
      setTimeout( () =>
      {
        popup.style.top = "8%"
        popup.style.opacity = "0.5"
        popup.style.fontSize = "8px"
        popup.style.padding = "5px"
        popup.style.backgroundColor = "red"
        setTimeout( () =>
        {
          document.querySelector( "body" ).removeChild( popup )
        }, 300 );
      }, 400 );

    }, 500 );
  }
}


const addToCart = ( cat, id ) =>
{
  fetch( "database/data.json" )
    .then( res => res.json() )
    .then( data =>
    {
      data[ cat ].forEach( item =>
        item.id === id && pushToCart( item.img, item.name, item.price, item.id ) )
    } )

}
const updateTotalPrice = () =>
{
  var total_price = 0;
  cart_product_list.forEach( item =>
  {
    total_price += ( Number( item.price ) * Number( item.quantity ) )
  } )
  price_total_digit.textContent = Math.floor( total_price ) + ".00"
  console.log( cart_product_list )
}

const updateCart = ( img, name, price, id ) =>
{
  updateTotalPrice()
  //item-container
  const new_cart_items = document.createElement( 'div' )
  new_cart_items.className = "cart-items"

  //product 
  const product_items = document.createElement( 'div' )
  product_items.className = "product-items"

  //product img container 
  const new_item_img = document.createElement( 'div' )
  new_item_img.className = "item-img"
  //product img 
  const new_product_items_img = document.createElement( 'img' )
  new_product_items_img.src = img
  new_product_items_img.alt = "item-img"
  new_item_img.appendChild( new_product_items_img )

  const new_item_price = document.createElement( 'div' )
  new_item_price.className = "item-price"
  new_item_price.innerText = "$" + price;

  const new_item_name = document.createElement( 'div' )
  new_item_name.className = "item-name"
  new_item_name.innerText = name.slice( 0, 35 ) + "...";

  //remove from-cart
  const remove_from_button = document.createElement( 'div' )
  remove_from_button.className = "remove-from-cart"
  remove_from_button.innerText = "remove"
  remove_from_button.addEventListener( "click", ( e ) =>
  {
    // console.log( e.target.parentElement.parentElement.parentElement )
    cart_item_container.removeChild( e.target.parentElement.parentElement.parentElement )
    cart_product_list.forEach( ( item, item_index ) =>
    {
      ( item.id == id ) && console.log( cart_product_list.splice( item_index, 1 ) )
    }
    )
    updateTotalPrice()
  } )



  //cart item info
  const new_item_info = document.createElement( 'div' )
  new_item_info.className = "item-info"
  new_item_info.appendChild( new_item_name )
  new_item_info.appendChild( new_item_price )
  new_item_info.appendChild( remove_from_button )

  //appending to product item
  product_items.appendChild( new_item_img )
  product_items.appendChild( new_item_info )

  //price
  const product_quantity_container = document.createElement( 'div' )
  product_quantity_container.className = "product-quantity"
  const increment_btn_container = document.createElement( 'div' )
  const increment_btn_img = document.createElement( 'img' )
  increment_btn_img.src = "icons/caret_up.svg"
  increment_btn_img.className = "increment-qunatity"
  increment_btn_img.addEventListener( "click", ( e ) =>
  {
    ++( e.target.parentElement.parentElement.children[ 1 ].innerText )
    cart_product_list.forEach( ( item ) =>
    {
      ( item.id == id ) && ++item.quantity
      updateTotalPrice()
    }
    )
  } )
  increment_btn_container.appendChild( increment_btn_img )
  const decrement_btn_container = document.createElement( 'div' )
  const decrement_btn_img = document.createElement( 'img' )
  decrement_btn_img.src = "icons/caret_down.svg"
  decrement_btn_img.className = "increment-qunatity"
  decrement_btn_img.addEventListener( "click", ( e ) =>
  {
    Number( e.target.parentElement.parentElement.children[ 1 ].innerText ) && --( e.target.parentElement.parentElement.children[ 1 ].innerText );
    cart_product_list.forEach( item =>
    {
      ( item.id == id ) && item.quantity && --item.quantity
      updateTotalPrice()
    } )
  } )
  decrement_btn_container.appendChild( decrement_btn_img )
  const item_quantity = document.createElement( 'div' )
  item_quantity.className = "item-quantity"
  item_quantity.innerText = 1;
  product_quantity_container.appendChild( increment_btn_container )
  product_quantity_container.appendChild( item_quantity )
  product_quantity_container.appendChild( decrement_btn_container )


  new_cart_items.appendChild( product_items )
  new_cart_items.appendChild( product_quantity_container )

  cart_item_container.appendChild( new_cart_items )
}


const productFragment = ( cat, name, price, id, img ) =>
{
  //item-name 
  const new_item_eLem_name = document.createElement( 'div' )
  new_item_eLem_name.className = "item-name"
  new_item_eLem_name.innerText = name;
  //price
  const new_item_eLem_price = document.createElement( 'div' )
  new_item_eLem_price.className = "item-price"
  new_item_eLem_price.innerText = "$" + price;

  //add-to-cart
  const add_to_cart_button = document.createElement( 'div' )
  add_to_cart_button.className = "add-to-cart-button"
  add_to_cart_button.innerText = "Add To Cart"
  add_to_cart_button.addEventListener( "click", ( e ) =>
  {
    addToCart( cat, id )
    updateTotalPrice()
  } )

  //img-container
  const new_item_eLem_img = document.createElement( 'img' )
  new_item_eLem_img.src = img
  new_item_eLem_img.loading = "eager"
  new_item_eLem_img.alt = "item-img"
  const new_item_eLem_img_container = document.createElement( 'div' )
  new_item_eLem_img_container.className = "item-img"
  new_item_eLem_img_container.appendChild( add_to_cart_button )
  new_item_eLem_img_container.appendChild( new_item_eLem_img )

  //info
  const new_item_eLem_info = document.createElement( 'div' )
  new_item_eLem_info.className = "item-info"
  new_item_eLem_info.appendChild( new_item_eLem_price )
  new_item_eLem_info.appendChild( new_item_eLem_name )

  //product-items
  const new_item_eLem = document.createElement( 'div' );
  new_item_eLem.className = "product-items";
  new_item_eLem.appendChild( new_item_eLem_img_container )
  new_item_eLem.appendChild( new_item_eLem_info )
  return (
    new_item_eLem
  )
}

const DisplayAllProducts = ( seacrh_input_value = "" ) =>
{
  seacrh_input_value && products_containers.forEach( ( container, containerIndex ) =>
  {
    container.innerHTML = ""
  } )

  // console.log( container.innerHTML )
  products_containers.forEach( ( container, containerIndex ) =>
  {
    var num = 0
    const product_name_list = [ "phones", "tabs", "laptops", "monitors" ]

    fetch( "database/data.json" )
      .then( res => res.json() )
      .then( data =>
      {
        // console.log( product_name_list[ containerIndex ] )
        data[ product_name_list[ containerIndex ] ].forEach( item =>
        {
          // container.appendChild( productFragment( product_name_list[ containerIndex ], item.name, item.price, item.id, item.img ) )
          item.name.includes( seacrh_input_value ) &&
            container.appendChild( productFragment( product_name_list[ containerIndex ], item.name, item.price, item.id, item.img ) )
        } )
        // console.log( container.innerHTML )
      } )
  } )
}

DisplayAllProducts()
search_input.addEventListener( 'keyup', () =>
{
  DisplayAllProducts( search_input.value )
} )