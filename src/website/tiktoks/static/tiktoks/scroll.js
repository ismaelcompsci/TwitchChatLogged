document.addEventListener("DOMContentLoaded", async () => {
  const quotesEl = document.querySelector(".quotes");
  const loader = document.querySelector(".loader");

  const emotes = await getFfzChannelEmotes("71092938");
  var videoIDs = new Array();

  const getRandomEmote = () => {
    var item = emotes[Math.floor(Math.random() * emotes.length)];
    return item.urls[0][1];
  };

  // DOES NOT WORK TIKTOK WONT LOAD
  // USING
  const getTiktokEmbed = async (url) => {
    const API_URL = `https://www.tiktok.com/oembed?url=${url}`;
    const response = await fetch(API_URL, {
      headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
  };

  const getQuotes = async (page, limit) => {
    const API_URL = `http://127.0.0.1:8989/tikoks/channel/xqc?page=${page}&size=${limit}`;
    const response = await fetch(API_URL);
    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
  };

  const showQuotes = async (quotes) => {
    // GET CHAT TIKTOK LINKS
    quotes.forEach(async (quote) => {
      // GET TIKTOK VIDEO ID
      let link = quote.text.match(
        /\bhttps?:\/\/(?:m|www|vm)\.tiktok\.com\/\S*?\b(?:(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+)|(?=\w{7})(\w*?[A-Z\d]\w*)(?=\s|\/$))\b/
      );
      // IF TIKTOK VIDEO NOT ALREADY LOADED
      if (!videoIDs.includes(link[1])) {
        const quoteEl = document.createElement("blockquote");
        const quoteImg = document.createElement("img");
        quoteImg.src = getRandomEmote();
        quoteEl.classList.add("quote");

        // quoteEl.innerHTML = ` <span style='color: ${quote.tags.color}'>${quote.display_name}</span><lite-tiktok videoid="${link}" autoload></lite-tiktok><footer></footer><br>`;
        quoteEl.innerHTML = ` <span style='color: ${quote.tags.color}'> - ${quote.display_name} : </span><lite-tiktok videoid="${link[1]}" autoload></lite-tiktok><footer></footer><br>`;
        quoteEl.prepend(quoteImg);

        quotesEl.appendChild(quoteEl);
        videoIDs.push(link[1]);
      }
    });
  };

  const hideLoader = () => {
    loader.classList.remove("show");
  };
  const showLoader = () => {
    loader.classList.add("show");
  };

  let currentPage = 1;
  const limit = 9;
  let total = 0;

  const hasMoreQuotes = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  // LOAD QUOTES
  const loadQuotes = async (page, limit) => {
    // SHOW LOADER

    showLoader();
    setTimeout(async () => {
      try {
        // IF HAVING MORE QUOTES TO FETCH
        if (hasMoreQuotes(page, limit, total)) {
          // CALL THE API TO GET QUOTES
          const response = await getQuotes(page, limit);
          // SHOW QUOTES
          showQuotes(response.items);
          // UPDATE THE TOTAL
          total = response.total;
        }
      } catch (error) {
        console.log(error.message, "here");
      } finally {
        hideLoader();
      }
    }, 500);
  };

  window.addEventListener(
    "scroll",
    () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMoreQuotes(currentPage, limit, total)
      ) {
        currentPage++;
        loadQuotes(currentPage, limit);
      }
    },
    { passive: true }
  );
  ///////
  loadQuotes(currentPage, limit);
});
