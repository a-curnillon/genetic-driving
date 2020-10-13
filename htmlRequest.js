function askForInformation() {
  let url = "https://api.github.com/repos/a-curnillon/genetic-driving/branches/master";
  httpDo(url, "GET", "json", function(res) {
    info = res;
  });
}

function updateInformation() {
  if (info) {
    let author = createDiv(info.commit.commit.author.name);
    author.parent('author');
    let date = createDiv(info.commit.commit.author.date.slice(0, 10).replace("-"," ").replace("-"," "));
    date.parent('date');
    info = null;
  }
}
