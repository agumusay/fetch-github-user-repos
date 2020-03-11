import "regenerator-runtime/runtime";
import moment from "moment";

export default class GenerateTemplate {
  constructor(destination) {
    this.sortTemp = `
        <button class="name" type="button">Name</button><button class="date" type="button">Date</button>
      `;
    this.destination = destination;
    this.generateHtmlForm();
    this.listUserRepos();
    this.div = document.createElement("div");
    this.sortContainer = document.createElement("nav");
    this.listContainer = document.createElement("ul");
    this.storeUserName = "";
  }

  async fetchAndMap() {

  }

  generateHtmlForm() {
    let gitForm = `
    <form class="form-container" onsubmit="return false">
      <div header-container>
         <h1 class="header"><i class="fab fa-github"></i> GitHub Repositories</h1>
         </div>
        <div class="input-container">
          <input type="text" id="username" placeholder="Please enter Github Username" />
          <button type="submit">Submit</button>
        </div>
      </form>
    `;
    document.querySelector(this.destination).innerHTML = gitForm;
  }



  generateList(arr) {
    return arr.map(obj => {
      return `<li class="gitList">
          <a href="${obj.html_url}" class="git-link">
          <div class="right-container">
            <h3 class="repo-name">${obj.name}</h3>
            <p class="description">${obj.description}</p>
          </div>
          <div class="left-container">
            <p class="date">${moment([obj.created_at]).fromNow()}</p>
          </div>
          </a>
        </li>`;
    })
  }

  async fetchUrl(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  listUserRepos() {
    try {
      document.querySelector("form").addEventListener("submit", async event => {
        event.preventDefault();
        let userName = await document.querySelector("input").value;
        this.storeUserName = document.cookie = userName;
        let gitArray = await this.fetchUrl(`https://api.github.com/users/${userName}/repos`)
        let gitList = this.generateList(gitArray)
        console.log(gitList)
        this.listContainer.innerHTML = await gitList.join("\n");
        this.div.classList.add("first-container");
        this.sortContainer.innerHTML = this.sortTemp;
        document.querySelector(this.destination).appendChild(this.div);
        this.div.appendChild(this.sortContainer);
        this.div.appendChild(this.listContainer);
        document.querySelectorAll("nav button").forEach(async button => {
          button.addEventListener("click", async event => {
            if (event.target.classList.contains("name")) {
              let gitArray = await this.fetchUrl(`https://api.github.com/users/${this.storeUserName}/repos`)
              let gitList = this.generateList(gitArray)
              document.querySelector("ul").innerHTML = await gitList.join("\n");
            } else {
              let gitArray = await this.fetchUrl(`https://api.github.com/users/${this.storeUserName}/repos?sort=created&direction=desc`)
              let gitList = this.generateList(gitArray)
              document.querySelector("ul").innerHTML = await gitList.join("\n");
            }
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
