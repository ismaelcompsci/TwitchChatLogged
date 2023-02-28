document.addEventListener("DOMContentLoaded", function () {
  // By default, submit button is disabled
  // document.querySelector("#log-search-button").disabled = true;

  // document.querySelector("#log-search-channel").onkeyup = () => {
  //   if (document.querySelector("#log-search-channel").value.length > 0) {
  //     document.querySelector("#log-search-button").disabled = false;
  //   } else {
  //     document.querySelector("#log-search-button").disabled = true;
  //   }
  // };

  document.querySelector("form").onsubmit = () => {
    document.querySelectorAll(".single-chat").forEach(function (element) {
      element.remove();
    });
    let chats = document.querySelectorAll(".xqc-offline-chat");
    if (chats) {
      chats.forEach(function (element) {
        element.remove();
      });
    }
    let buttons = document.querySelectorAll(".button-holder");
    if (buttons) {
      buttons.forEach(function (element) {
        element.remove();
      });
    }
    /*                                                                            
                                                                                      v contains button when clicked creates the chat log view
                                                                    <div id=root><div id=chatlog1></div><div>.....</div></div>
                                                                                      ^
                                                                                      |
        event                    promise                                            add button to a root div
          ^                        ^                                                  ^
          |                        |                                                  |
    search clicked -> query for logs avalibale [{year: "2023", month: "2"}] -> for each date create a button -> when clicked it loads that months logs 
                                                                                      |
                                                                                      v
                                                                                auto load current date 
                                                                                  (which is n in list)
    
    
    
    
    
    
    */
    // Query for logs avaliable
    const channel = document.querySelector("#log-search-channel").value;
    const username = document.querySelector("#log-search-username").value;

    let dates = search_channel_log_dates(channel);
    dates
      .then((dates) => dates.logs)
      .then((data) => {
        data.forEach((element) => {
          create_buttons(element, channel, username);
        });
      });

    return false;
  };
});

function create_buttons(element, channel, username) {
  // Create button that opens div when clicked
  let button = document.createElement("button");
  button.className = "btn btn-outline-success search";

  button.innerHTML = `SEARCH ${element.year}/${element.month}`; // get date

  let button_div = document.createElement("div");
  button_div.className = "button-holder";
  button.setAttribute("year", element.year); // from date
  button.setAttribute("month", element.month); // from date
  button.setAttribute("id", `${element.year}/${element.month}`);

  button.addEventListener("click", () => {
    // Create container to hold chat data
    let chat_container = `
    <div class="xqc-offline-chat">
      <div class="offline-chat-container">
        <ul class="offline-chats">
          <div class="list-chats">
            <div class="chat-height" id="${element.year}/${element.month}"></div>
        </div>
      </ul>
    </div>
  </div>
    `;
    button_div.innerHTML = chat_container;
    // Query for data of stuff
    let response = search_channel_log_spec(
      channel,
      username,
      element.year,
      element.month
    );
    response.then((data) => {
      chat_div(channel, username, data, element);
    });
  });
  button_div.append(button);

  let set_div = document.querySelector(".all-chats");

  set_div.append(button_div);
  open_current_date();
}
function open_current_date() {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;

  let current_chat = document.getElementById(`${year}/${month}`);
  current_chat.click();
}

function chat_div(channel, username, data, dates) {
  let chat_box = document.getElementById(`${dates.year}/${dates.month}`);

  if (data.detail) {
    alert("No logs Found");
    return;
  }

  data.messages.forEach((element) => {
    let single_msg_div = document.createElement("div");
    let li = document.createElement("li");
    let timestamp = document.createElement("span");
    let username = document.createElement("div");
    let message = document.createElement("div");

    // console.log(element);
    if (check_text_link(element.text)) {
      let link_text = check_text_link(element.text);
      message.innerHTML = link_text;
    } else {
      message.innerHTML = element.message;
    }

    message.className = "message";
    timestamp.className = "timestamp";
    li.className = "single-chat-text";
    single_msg_div.className = "single-chat";
    username.className = "username";

    timestamp.innerHTML = readableTime(element.timestamp);
    username.innerHTML = `${element.display_name}:`;

    let color_ = element.tags.color;

    let username_color = color_;

    username.style.color = username_color;

    li.append(timestamp);
    li.append(username);
    li.append(message);

    single_msg_div.appendChild(li);

    chat_box.append(single_msg_div);
  });
}
