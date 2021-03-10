$(document).ready(() => {
  ajax("navbar", function (respone) {
    displayNavLinks(respone);
  });
  ajax("carouselLinks", function (response) {
    displayCarouselBars(response);
  });
  ajax("carouselItems", function (response) {
    displayCarouselItems(response);
  });
  ajax("services", function (response) {
    displayServices(response);
  });
  ajax("sectionTitle", function (response) {
    displaySectionTitles(response);
  });
  ajax("aboutCompany", function (response) {
    displayAboutCompany(response);
  });
  ajax("contactForm", function (response) {
    displayContactForm(response);
  });
  ajax("footer", function (response) {
    displayFooter(response);
  });
  ajax("products", function (response) {
    const bestsellers = [];
    for (let p of response) {
      if (p.bestseller) bestsellers.push(p);
    }
    displayFeaturedProducts(response);

    displayBestSellers(bestsellers);
    displayAllProducts(response);
    search(response);
  });
  ajax("brands", function (response) {
    displayBrands(response);
  });
  ajax("genders", function (response) {
    displayGender(response);
  });
  ajax("sort", function (response) {
    displaySort(response);
  });
  ajax("aboutMe",function(response){
    displayAuthor(response);
})
  displayCart();
  const sort = $("#sort");
  sort.on("change", filterDisplay);
  const remove = document.querySelectorAll(".remove");
  console.log(remove);
});
//ajax callback
function ajax(item, result) {
  $.ajax({
    url: "data/" + item + ".json",
    method: "get",
    datatype: "json",
    success: result,
    error: function (err) {
      console.log(err);
    },
  });
}
//prikaz navbara
function displayNavLinks(links) {
  var html = "";
  for (let link of links) {
    if (link.name == "Cart") {
      html += `
            <li class="nav-item" >
                <a href="${
                  link.href
                }" class="nav-link cart"><i class="fas fa-shopping-cart"></i><span class="ml-2">${onLoadCartNumbers()}</span></a>
            </li>`;
    } else {
      html += `
                <li class="nav-item">
                    <a href="${link.href}" class="nav-link">${link.name}</a>
                </li>`;
    }
  }
  $("#navbarLinks").html(html);
}
//prikaz slider
function displayCarouselBars(bars) {
  let html = "";
  for (let bar of bars) {
    if (bar.id == 0) {
      html += `
            <li data-target="#Carousel" data-slide-to="${bar.id}"class="active"></li>
            `;
    } else {
      html += `
            <li data-target="#Carousel" data-slide-to="${bar.id}"></li>
            `;
    }
  }
  $("#CarouselBars").html(html);
}
function displayCarouselItems(items) {
  let html = "";
  for (let item of items) {
    if (item.id == 1) {
      html += `
            <!--Carousel Item-->
            <div class="carousel-item carousel-image-${item.id} active">
                <div class="container">
                    <div class="carousel-caption d-none d-sm-block text-right mb-5">
                        <h1 class="display-3 title-color">${item.title}</h1>
                        <p class="lead">${item.lead}<p>
                        <a href="${item.button.href}" class="btn btn-color slide-btn btn-lg">
                            ${item.button.text}
                        </a>
                    </div>
                </div>
            </div>
            <!-- End of Carousel Item-->
            `;
    } else if (item.id == 3) {
      html += `
            <!--Carousel Item-->
            <div class="carousel-item carousel-image-${item.id}">
                <div class="container">
                    <div class="carousel-caption d-none d-sm-block text-right mb-5">
                        <h1 class="display-3 title-color">${item.title}</h1>
                        <p class="lead">${item.lead}<p>
                        <a href="${item.button.href}" class="btn btn-color slide-btn btn-lg">
                            ${item.button.text}
                        </a>
                    </div>
                </div>
            </div>
            <!-- End of Carousel Item-->
            <a href="#Carousel" data-slide="prev" class="carousel-control-prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a href="#Carousel" data-slide="next" class="carousel-control-next">
                <span class="carousel-control-next-icon"></span>
            </a>
            `;
    } else {
      html += `
            <!--Carousel Item-->
            <div class="carousel-item carousel-image-${item.id}">
                <div class="container">
                    <div class="carousel-caption d-none d-sm-block text-right mb-5">
                        <h1 class="display-3 title-color">${item.title}</h1>
                        <p class="lead">${item.lead}<p>
                        <a href="${item.button.href}" class="btn btn-color slide-btn btn-lg">
                            ${item.button.text}
                        </a>
                    </div>
                </div>
            </div>
            <!-- End of Carousel Item-->
            `;
    }
  }
  $("#CarouselItems").html(html);
}
//prikaz services
function displayServices(services) {
  let html = "";
  for (let service of services) {
    html += `
        <!--Single Service-->
        <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
            <span class="service-icon">
                <i class="${service.icon}"></i>
            </span>
            <h5 class="font-weight-bold text-uppercase">
                ${service.title}
            </h5>
            <p class="text-capitalize">${service.description}</p>
        </div>
        <!--End of Single Service-->
        `;
  }
  $("#services").html(html);
}
//prikaz naslova
function displaySectionTitles(titles) {
  let html = "";
  for (let title of titles) {
    html += `
            <div class="col-10 mx-auto col-sm-6 text-center">
                    <h1 class="text-capitalize product-title">
                        ${title.title}
                    </h1>
                </div>
            `;
    $(title.location).html(html);
    html = "";
  }
}
//prikaz izdvojenih proizvoda
function displayFeaturedProducts(products) {
  let html = "";
  for (let product of products) {
    if (product.featured) {
      html += `
            <div class="col-10 col-sm-8 col-lg-4 mx-auto my-3">
                    <div class="card single-item">
                        <div class="img-container">
                            <img src="${product.image.src}" alt="${
        product.image.alt
      }"class="card-img-top img-thumbnail product-img">
                        </div>
                        <div class="card-body">
                            <div class="card-text d-flex justify-content-between text-capitalize">
                                <h5 id="item-name">${product.model}</h5>
                                <span><i class="fas fa-dollar-sign"></i>${Intl.NumberFormat(
                                  "de-DE"
                                ).format(product.price)}</span>
                            </div>
                            <div class="card-text">
                                <span>${product.brand.name}</span>
                                <p>${product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
  }
  $("#product-items").html(html);
}
//prikaz o kompaniji
function displayAboutCompany(info) {
  let html = `
    <div class="col-lg-5 text-center">
        <img src="${info.img.src}" alt="${info.img.alt}" width="450" height="150" class="img-fluid watch-img">
    </div>
    <div class="col-lg-7 text-lg-right text-center text-color about-text">
        <h1>${info.title}</h1>
        <p class="text">${info.description}</p>
    </div>`;
  $("#aboutCompany").html(html);
}
//prikaz kontakt forme + obrada
function displayContactForm(inputs) {
  let html = `<h2 class="section-heading text-center">Contact Us</h2>
    <form class="col-lg-6 offset-lg-3" id="contactForm">`;
  for (let input of inputs) {
    if (input.type == "textarea") {
      html += `
            <div class="form-group">
                <label for="${input.name}">${input.placeholder}</label>
                <textarea  id="${input.name}" cols="30" rows="10" class="form-control" placeholder="${input.placeholder}" ></textarea>
            </div>                    <div class="col-sm-6">
            <div class="seller-item">
            
            </div>
            
        </div>
            `;
    } else if (input.type == "checkbox") {
      html += `
            <div class="form-group form-check">
                <input type="${input.type}"  id="${input.name}" class="form-check-input">
                <label for="${input.name}" class="form-check-label">${input.placeholder}</label>
        </div>
        `;
    } else if (input.type == "button") {
      html += `
            <span  id="errors"class=alert></span>
            <div class="text-center mt-4">
                <button id ="${input.name}"class="btn btn-lg btn-color cont-btn">${input.placeholder}</button>
            </div>
            `;
    } else {
      html += `
            <div class="form-group">
                <label for="${input.name}">${input.placeholder}</label>
                <input type="${input.type}" id="${input.name}" class="form-control" placeholder="${input.placeholder}">
            </div>
            `;
    }
  }
  html += `
    
    </form>
    `;
  $("#contactForm").html(html);
  //kontakt form
  const email = $("#email");
  const name = $("#name");
  const message = $("#message");
  const button = $("#button");
  const check = $("#check");

  button.on("click", function (e) {
    e.preventDefault();
    const errorSpan = $("#errors");
    let err = 0;
    if (email.val() == "" || name.val() == "" || message.val() == "") {
      err++;
      errorSpan.addClass("alert-danger");
      errorSpan.html("All Fields Must Be Filled In!");
    } else {
      errorSpan.removeClass("alert-danger");
      errorSpan.html("");
      if (!testEmail(email.val())) {
        err++;
        errorSpan.addClass("alert-danger");
        errorSpan.html("Invalid Email\n(example: user@mail.com)");
      } else {
        errorSpan.removeClass("alert-danger");
        errorSpan.html("");
        if (!testName(name.val())) {
          err++;
          errorSpan.addClass("alert-danger");
          errorSpan.html("Invalid Name\n(example: John Doe)");
        } else {
          errorSpan.removeClass("alert-danger");
          errorSpan.html("");
          if (message.val().length > 250) {
            err++;
            errorSpan.addClass("alert-danger");
            errorSpan.html("Maximum characters in message is 250");
          } else {
            errorSpan.addClass("alert-success");
            errorSpan.html("Message Send!");
            if (check.prop("checked") == true) {
              alert("Thanks for subscribing to out newletter!");
            }
          }
        }
      }
    }
  });
}
//regEx Email
function testEmail(email) {
  re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
}
//regEx Name
function testName(name) {
  re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
  return re.test(name);
}
//prikaz footer-a
function displayFooter(footer) {
  let html = `
    <div class="text-center py-5">
        <h2 class="py-3">${footer.companyName}</h2>
    <div class="mx-auto heading-line"></div>
    <div class="container">
        <div class="container">
            <div class="row mb-3">
                <div class="col-lg-8 offset-lg-2 text-center">
                    <p>${footer.description}</p>
                    <div class="justify-content-center">
                        <a href="${footer.social.facebook.href}"><i class="${footer.social.facebook.icon}"></i></a>
                        <a href="${footer.social.instagram.href}"><i class="${footer.social.instagram.icon}"></i></a>
                        <a href="${footer.social.twitter.href}"><i class="${footer.social.twitter.icon}"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright text-center py-3 border-top text-light">${footer.copyright}</div>
    </div>
 </div>`;
  $("#footer").html(html);
}
//prikaz best-sellera
function displayBestSellers(products) {
  let html = "";
  for (let i = 0; i < products.length; i++) {
    if (i == 0) {
      html += `
        <div class="row container-fluid" id="bestsellers">
            <div class="col-sm-6">
                <div class="seller-item">
                <img src="${products[i].image.src}" alt="${products[i].image.alt}" class="img-fluid photo">
                <p>${products[i].image.alt}</p>
            </div>
        </div>
        <div class="col-sm-6 d-flex flex-column justify-content-between">
        `;
    } else if (i == 1 || i == 3) {
      html += `
        
                        <!--small row-->
                        <div class="row">
                            <!--img1-->
                            <div class="col-sm-6">
                                <div class="seller-item">
                                    <img src="${products[i].image.src}" alt="${products[i].image.alt}" class="img-fluid seller-img">
                                    <p>${products[i].image.alt}</p>
                                </div>
                            </div>
                            <!--end of img1-->
        `;
    } else {
      html += `
        <!--img1-->
                            <div class="col-sm-6">
                                <div class="seller-item">
                                    <img src="${products[i].image.src}" alt="${products[i].image.alt}" class="img-fluid seller-img">
                                    <p>${products[i].image.alt}</p>
                                </div>
                            </div>
                            <!--end of img1-->
                        </div>
        `;
    }
  }
  html += `</div>`;
  $("#bestsellers").html(html);
}
//prikaz brendova + filtriranje
function displayBrands(brands) {
  let html = `<li class="list-group-item" data-brand="0">
        <a href="#" class="btn-brand" >Show All</a>
    </li>   
 `;
  for (let brand of brands) {
    html += `
        <li class="list-group-item" data-brand="${brand.id}" >
            <a href="#" class="btn-brand" >${brand.name}</a>
        </li>
        `;
  }
  $("#brands").html(html);
  //FILTRIRANJE PO BRENDU
  const brandList = $("#brands").children();
  for (let listItem of brandList) {
    listItem.addEventListener("click", function () {
      for(let l of brandList) l.classList.remove('active');
      (this).classList.add('active');
      let id = listItem.dataset.brand;
      console.log(id);
      ajax("products", function (products) {
        let porductList = [];
        if (id == 0) {
          displayAllProducts(products);
        } else {
          for (let product of products) {
            if (id == product.brand.id) {
              porductList.push(product);
            }
          }
          displayAllProducts(porductList);
        }
      });
    });
  }
}
//prikaz pola
function displayGender(genders) {
  let html = `<li class="list-group-item" data-gender="0">
    <a href="# ">Show Both</a>
 </li>`;
  for (let gender of genders) {
    html += `
        <li class="list-group-item" data-gender="${gender.id}">
        <a href="#" class="btn-brand" >${gender.name}</a>
    </li>
        `;
  }
  $("#gender").html(html);
  //FILTRIRANJE
  const genderList = $("#gender").children();
  for (let gender of genderList) {
    gender.addEventListener("click", function (e) {
      for(let g of genderList) g.classList.remove('active');
      (this).classList.add('active');
    e.preventDefault()
      let id = gender.dataset.gender;
      ajax("products", function (products) {
        let porductList = [];
        if (id == 0) {
          displayAllProducts(products);
        } else {
          for (let product of products) {
            if (id == product.gender.id) {
              porductList.push(product);
            }
          }
          displayAllProducts(porductList);
        }
      });
    });
  }
}
//prikaz svih proizvoda
function displayAllProducts(products) {
  products = sort(products);
  let html = "";
  for (let product of products) {
    html += `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100" data-cat="${product.brand.id}">
                <a href="#"><img class="card-img-top" src="${
                  product.image.src
                }" alt="${product.image.alt}"></a>
                <div class="card-body">
                    <h4 class="card-title product-card">
                        <a href="#">${product.model}</a>
                    </h4>
                <h6>${product.brand.name}</h6>
                <h5>$${Intl.NumberFormat("de-DE").format(product.price)}</h5>
                <p class="card-text">
                    ${product.gender.name}
                </p>
                <p class="card-text">${product.description}</p>
                <button class="btn btn-color"><a class="add-to-cart" href="#">Add to Cart</a></button>
            </div>
        </div>
        </div>
        `;
  }
  //DODAVANJE U KORPu
  $("#products").html(html);
  const addToCart = document.querySelectorAll(".add-to-cart");
  for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", function (e) {
      e.preventDefault();
      cartNumbers(products[i]);
      totalCost(products[i].price);
    });
  }
}
//cart nav
function onLoadCartNumbers() {
  if (localStorage.getItem("cartNumbers") == null) {
    return 0;
  } else {
    return localStorage.getItem("cartNumbers");
  }
}
//broj proizvoda u korpi
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    setItemToLocalStorage("cartNumbers", productNumbers + 1);
    $(".cart span").html(productNumbers + 1);
  } else {
    setItemToLocalStorage("cartNumbers", 1);
    $(".cart span").html(1);
  }
  setItems(product);
}
//dodavanje porizvoda u korpu
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.model] == undefined) {
      cartItems = {
        ...cartItems,
        [product.model]: product,
      };
    }
    cartItems[product.model].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.model]: product,
    };
  }
  setItemToLocalStorage("productsInCart", JSON.stringify(cartItems));
}
//ukupna cena
function totalCost(price) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    setItemToLocalStorage("totalCost", cartCost + price);
  } else {
    setItemToLocalStorage("totalCost", price);
  }
}
//prikaz korpe
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let cartCost = localStorage.getItem("totalCost");
  cartItems = JSON.parse(cartItems);
  let productContainer = $(".cart-products");
  if (cartItems && productContainer && cartItems.length!=0) {
    html = "";
    Object.values(cartItems).map((item) => {
      html += `
            <div class="row cart-cart p-5 my-5">
            <div class="cart-product  float-right">
                <span class="remove" onclick="removeItem(${item.id})  "><i class="far fa-window-close"></i></span>
                <img src="${item.image.src}"alt="${
        item.image.alt
      }" class="img-fluid rounded-circle img-cart">
                <span>${item.image.alt}</span>
            </div>
            <div class="price mx-5">$${Intl.NumberFormat("de-DE").format(
              item.price
            )}</div>
            <div class="quantity pt-5 ml-lg-5">
            <span>${item.inCart}</span>
            </div>
            <div class="total ml-5 pl-2float-right">$${Intl.NumberFormat(
              "de-DE"
            ).format(item.inCart * item.price)}</div>
            </div>
            `;
    });
    html += `<div class="row float-right">
        <div class="basketTotalContainer ">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal ">
                $${Intl.NumberFormat("de-DE").format(cartCost)}
            </h4>
            <button onclick="shopAlert()"class="btn btn-danger">Clear Cart</button>
            <button onclick="shopAlert()"class="btn btn-color">Buy</button>
        </div>
        </div>
        `;
    productContainer.html(html);
  } else {
    html = `<div class="emptyCart col-12 m-5 text-center"><h1>YOUR CART IS EMPTY<h1></div>`;
    $(".cart-container").html(html);
  }
}
//remove item
function removeItem(id){
  var cartnumber = localStorage.getItem('cartNumbers')
  cartnumber = JSON.parse(cartnumber)
  cartnumber--
  if(cartnumber===0){
    localStorage.removeItem('cartNumbers')
  }
  else{
    localStorage.setItem('cartNumbers',cartnumber)
  }
  var totalCost = localStorage.getItem('totalCost')
  totalCost = JSON.parse(totalCost)
  var cart = localStorage.getItem('productsInCart')
  cart = JSON.parse(cart)
  cart = Object.values(cart)
  var product = cart.find(x=>x.id==id)
  totalCost-=product.price
  if(totalCost===0){
    localStorage.removeItem('totalCost')
  }
  else{
    localStorage.setItem('totalCost', totalCost)
  }
  cart = cart.filter(x=>x.id!=id)
  localStorage.setItem('productsInCart',JSON.stringify(cart))
  location.reload();
}
//klik na buy
function shopAlert() {
  alert("Thank you for your purchase!");
  localStorage.clear();
  location.reload();
}
//clearCart
function shopAlert(){
  localStorage.clear();
  location.reload();
}
//local-storage
function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, value); 
}
//search function
function search(products) {
  const search = $("#search");
  search.on("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.model.toLowerCase().includes(searchString) ||
        product.description.toLowerCase().includes(searchString) ||
        product.brand.name.toLowerCase().includes(searchString)
      );
    });
    displayAllProducts(filtered);
  });
}
// sortiranje
function displaySort(items) {
  let html = ` <option value="0" selected>Select</option>`;
  for (let item of items) {
    html += `
        <option value="${item.id}">${item.name}</option>
        `;
  }
  $("#sort").html(html);
}
function sort(products) {
  const sortType = document.getElementById("sort").value;
  if (sortType == 1) {
    return products.sort((a, b) => (a.price > b.price ? 1 : -1));
  } else if (sortType == 2) {
    return products.sort((a, b) => (a.price < b.price ? 1 : -1));
  } else if (sortType == 3) {
    return products.sort((a, b) => (a.model > b.model ? 1 : -1));
  } else if (sortType == 4) {
    return products.sort((a, b) => (a.model < b.model ? 1 : -1));
  } else {
    return products;
  }
}
function filterDisplay(){
    ajax('products',displayAllProducts);
}
//prikaz autora
function displayAuthor(author){
  html = `
  <div class="row">
  <div class="col-lg-6">
      <img class="img-fluid rounded"src="${author.image.src}" alt="${author.image.alt}">
  </div>
  <div class="col-6 text-center pt-5">
      <h1>${author.ime} ${author.prezime}</h1>
      <h2>${author.index.broj}/${author.index.godina}</h2>
      <p>${author.kratakOpis}</p>
  </div>
</div>
  `
  $(".author").html(html)
}