import "regenerator-runtime/runtime";

import moment from "moment";

export default class GenerateTemplate {
  constructor(destination) {
    this.destination = destination;
    this.generateHtmlForm();
    this.listUserRepos();
    this.listContainer = document.createElement("ul");
  }

  generateHtmlForm() {
    let gitForm = `
    <form class="form-container">
        <h1>GitHub Username Widget</h1>
        <div class="input-container">
          <input type="text" name="" id="" placeholder="Please enter Github Username" />
          <button type="submit">Submit</button>
        </div>
      </form>
    `;
    document.querySelector(this.destination).innerHTML = gitForm;
  }

  async listUserRepos() {
    try {
      document.querySelector("form").addEventListener("submit", async event => {
        event.preventDefault();
        let userName = await document.querySelector("input").value;
        console.log(userName);

        let response = await fetch(`https://api.github.com/users/${userName}/repos`);
        let gitArray = await response.json();
        let gitList = await gitArray.map(gitObject => {
          return `<li class="gitList">
          <div class="right-container">
            <h3 class="repo-name">${gitObject.name}</h3>
            <p class="description">${gitObject.description}</p>
          </div>
          <div class="left-container">
            <p class="date">${moment([gitObject.created_at]).fromNow()}</p>
          </div>
        </li>`;
        });

        this.listContainer.innerHTML = await gitList;
        return document.querySelector("main").appendChild(this.listContainer);
      });
    } catch (error) {
      console.log(error);
    }
  }
  calculateMonths() {}
}
