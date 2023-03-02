async function get_chat_tiktoks(channel, page, size) {
  let data = await fetch(
    `http://127.0.0.1:8989/tikoks/channel/${channel}?page=${page}&size=${size}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
  return data;
}

// GET FFZ CHANNEL EMOTES
const getFfzChannelEmotes = async (channelId) => {
  const response = await fetch(
    `https://api.7tv.app/v2/users/${channelId}/emotes`
  );
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  }
  const emotes = [];
  data = await response.json();

  for (var id in data) {
    var emote = {};

    emote.id = data[id].id;
    emote.urls = data[id].urls;
    emote.name = data[id].name;

    emotes.push(emote);
  }
  return emotes;
};

// const tiktokEmb = async (id) => {
//   const response = await fetch(`https://vm.dstn.to/${id}/video.mp4`, {
//     headers: { "Access-Control-Allow-Origin": "origin" },
//   });
//   if (!response.ok) {
//     throw new Error(`An error occurred: ${response.status}`);
//   }
//   console.log(response);
//   return await response;
// };
