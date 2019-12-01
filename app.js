const url = `https://api.github.com/users`;

const btn = document.getElementById("btn_users");
const search = document.getElementById("user_search");

let user_name = [],
  user_images = [],
  user_links = [];
let count = 0;
btn.addEventListener("click", e => {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();

  request.onload = function() {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        let element = JSON.parse(data);
        user_name = Object.values(element)
          .map(user => user["login"])
          .map(name => name.charAt(0).toUpperCase() + name.slice(1));
        user_images = Object.values(element).map(user => user["avatar_url"]);
        user_links = Object.values(element).map(user => user["html_url"]);

        for (let i = 0; i < user_name.length; i++) {
          let row = document.createElement("div");
          row.className = "row";
          row.style.marginLeft = "30px";
          let main_div = document.createElement("div");
          main_div.classList.add("card");
          main_div.classList.add("mr-5");
          main_div.style.width = "18rem";
          let image = document.createElement("img");
          image.className = "card-img-top";
          image.src = `${user_images[i]}`;
          main_div.appendChild(image);
          let card_bodyy = document.createElement("div");
          card_bodyy.className = "card-body";
          let user_title = document.createElement("h5");
          user_title.className = "card-title";
          user_title.textContent = `${user_name[i]}`;
          user_title.style.textTransform = "capitalize";
          card_bodyy.appendChild(user_title);
          let link = document.createElement("a");
          link.className = "btn";
          link.classList.add("btn-primary");
          link.href = `${user_links[i]}`;
          link.textContent = `${user_name[i]}'s Github Profile`;
          card_bodyy.appendChild(link);
          main_div.appendChild(card_bodyy);
          row.appendChild(main_div);

          document.getElementById("cards").appendChild(row);
        }

        count = 1;
        displayAlert("Some Github Users", "success");
      });
  };
});

search.addEventListener("keyup", e => {
  let search_user = e.target.value.toLowerCase();

  let cards = document.getElementsByClassName("card");
  let titles = document.getElementsByTagName("h5");

  for (let i = 0; i < cards.length; i++) {
    let parent_div = cards[i].lastElementChild;
    var item_name = parent_div.firstElementChild.textContent;
    if (item_name.toLowerCase().indexOf(search_user) !== -1) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }

  let count_cards = document.getElementsByClassName("card");
  let temp = 0;
  for (let c of count_cards) {
    0;
    if (c.style.display === "block") {
      temp += 1;
      break;
    }
  }

  if (temp === 0) {
    displayAlert("No matching User found", "warning");
  }
});

function displayAlert(display_message, message) {
  const display_alert = document.getElementById("alertt");
  display_alert.classList.add(`alert-${message}`);
  display_alert.textContent = `${display_message}`;
  display_alert.style.visibility = "visible";
  search.style.visibility = "visible";
  setTimeout(() => {
    display_alert.style.visibility = "hidden";
  }, 3000);
}
