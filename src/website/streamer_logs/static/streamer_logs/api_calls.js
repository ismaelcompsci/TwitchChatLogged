async function search_channel_log_dates(channel) {
  let url = `http://127.0.0.1:8989/list/all/channel/${channel}/users?reverse=true`;
  let data = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.detail == "Channel not being logged") {
        alert("Channel not being logged");
        return;
      }
      return data;
    });
  return data;
}

async function search_channel_log_spec(channel, username, year, month) {
  let url = `http://127.0.0.1:8989/channel/${channel}/username/${username}/${year}/${month}`;
  let data = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
  return data;
}

async function search_channel_username(channel, username) {
  let url = `http://127.0.0.1:8989/channel/${channel}/username/${username}`;
  let data = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
  return data;
}
