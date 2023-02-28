function readableTime(d) {
  let date = d.split("T");

  let y_m_d = date[0].split("-");
  let h_s_m = date[1].split(":");

  let year = y_m_d[0];
  let month = y_m_d[1];
  let day = y_m_d[2];
  let hour = h_s_m[0];
  let minute = h_s_m[1];
  let second = h_s_m[2];

  let d1 = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  // console.log(d1);s

  let options = { year: "numeric", month: "2-digit", day: "2-digit" };
  let optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  let full_date_human = `<span id="brack">[</span>${d1.toLocaleDateString(
    undefined,
    options
  )} ${d1.toLocaleTimeString(
    undefined,
    optionsTime
  )}<span id="brack">] </span>`;
  console.log(full_date_human);
  return full_date_human;
}

// taken from https://stackoverflow.com/a/1144788
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
// taken from https://stackoverflow.com/a/1144788
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function check_text_link(text) {
  normalString = "";
  // console.log(text);
  textArray_ = text.split(/(\s+)/);

  textArray_.forEach(function (text) {
    if (/\s/g.test(text)) {
      normalString += " ";
      return;
    }
    if (isValidHttpUrl(text)) {
      let a = document.createElement("a");
      a.href = text;
      a.innerHTML = text;
      normalString += a.outerHTML;
    } else {
      normalString += text;
    }
  });
  return normalString;
}
