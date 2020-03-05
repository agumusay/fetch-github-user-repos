# Repositories list with Github API

> Create a widget (think of it as a reusable piece of UI and functionality) that given a Github username finds and displays that user's repositories.

1. User should be able to enter a Github username into a form, and on form submit a list of all user's repositories should be displayed below. Take a look at this example:

![preview](./demo.gif)

2. As this should be reusable, we should be able to specify a target container where the widget should be displayed. You can do this by passing an `options` object when you create the class instance. To test this, create two empty elements in your HTML, and pass them to two different class instances -> you should see two different widgets, working independantly.

3. By default, repositories will be sorted by `full_name`. You should be able to specify different sort order upon class initialization, for example by `created` (you can make use of the same `options` object).

Extra:

- Can you format the date? -> you could use [moment.js](https://momentjs.com/) -> [https://momentjs.com/docs/#/displaying/fromnow/](https://momentjs.com/docs/#/displaying/fromnow/)

## API docs

### List user repositories

Read more here: [https://developer.github.com/v3/repos/#list-user-repositories](https://developer.github.com/v3/repos/#list-user-repositories)

Github API base url: `https://api.github.com`

## Requirements

- Use ESNext `class` for this assignment
- Use ESNext literal strings for templating, all widget related HTML elements should be in JavaScript
- This is an individual assignment
- Deadline: 4 hours
