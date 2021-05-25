# Brown Banana: High-fidelity prototype (DP4)

You can access the prototype on our [Github Pages](https://parkgunou.github.io/cs374-brownbanana)!

## Frameworks and external packages used

In this project we used the following frameworks:
* [React](https://reactjs.org/)
* [Ant Design](https://ant.design/)

We have used [Firebase](https://firebase.google.com/) for our database and file storage, for image uploads to our prototype.

We are also making use of [Github Pages](https://pages.github.com/) to host our prototype.

## Code structure

The main entrypoint of our project is through [index.js](src/index.js), which directly renders our [HomeScreen](layouts/HomeScreen.js).

Our project is mainly divided into three distinct parts, grouped by the directories.
* `layouts/` contain the page-level html that should be rendered as a whole.
* `components/` contain the reusable components that can be used by the pages in `layouts/`.
* `css/` contain all the stylesheets, which are separated by layout view and components, for ease of import.

There are additional helper files/directories, such as:
* `Firebase.js`: helpers for using the Firebase DB.
* `models/`: helpers for unmarshalling the DB records.
