const cart_tab = document.getElementById( "cart-tab" )
const cart_icon = document.getElementById( "cart-icon" )
const site_nav_icon = document.getElementById( "site-nav-icon" )
const cart_board = document.getElementById( 'aside' )
const side_bar_nav = document.querySelector( '.site-side-bar' )
const site_body = document.querySelector( '#overlay' )

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
  // side_bar_nav.style.overflow = "scroll",
  side_bar_nav.style.width = "0%",
  console.log( "moblie" );
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
} )
cart_tab.addEventListener( "click", () =>
{
 showCart()
 site_body.addEventListener( "click", hideCartAndSiteNavForTab )
} )