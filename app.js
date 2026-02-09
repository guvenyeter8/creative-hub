let posts = JSON.parse(localStorage.getItem("posts")) || [];

function addPost() {
  const title = document.getElementById("title").value;
  const video = document.getElementById("video").value;
  const story = document.getElementById("story").value;

  if (!title) return alert("Başlık gerekli");

  posts.unshift({
    title,
    video,
    story,
    comments: []
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  document.getElementById("title").value = "";
  document.getElementById("video").value = "";
  document.getElementById("story").value = "";
  render();
}

function addComment(i, inputId) {
  const text = document.getElementById(inputId).value;
  if (!text) return;

  posts[i].comments.push(text);
  localStorage.setItem("posts", JSON.stringify(posts));
  render();
}

function render() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach((p, i) => {
    const videoEmbed = p.video
      ? `<iframe src="${p.video.replace("watch?v=", "embed/")}" allowfullscreen></iframe>`
      : "";

    container.innerHTML += `
      <div class="post">
        <h3>${p.title}</h3>
        ${videoEmbed}
        <p>${p.story || ""}</p>

        <h4>Yorumlar</h4>
        ${p.comments.map(c => `<div class="comment">💬 ${c}</div>`).join("")}

        <input id="c${i}" placeholder="Yorum yaz...">
        <button onclick="addComment(${i}, 'c${i}')">Gönder</button>
      </div>
    `;
  });
}

render();
