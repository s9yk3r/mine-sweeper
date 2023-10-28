[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/s9yk3r/mine-sweeper">
    <img src="https://i.imgur.com/Y824jHa.png" alt="Logo" width="150" height="150">
  </a>

<h3 align="center">A complete mine sweeper game powered by VueJS</h3>

  <p align="center">
    I'm proud to present you a complete mine sweeper game!
    <br />
    <a href="https://github.com/s9yk3r/mine-sweeper"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/s9yk3r/mine-sweeper/issues">Report Bug</a>
    ·
    <a href="https://github.com/s9yk3r/mine-sweeper/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Main View][product-screenshot]

Who never played mine sweeper through the glorious eras of windows from Windows 3.1 to Windows 7?
This little project it's a tribute to that very game! Enjoy!

### Built With

* [Bootstrap](https://getbootstrap.com/)
* [VueJS](https://vuejs.org/)
* [Node.js](https://nodejs.org)
* [Font Awesome](https://fontawesome.com/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

[Node.js](https://nodejs.org)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/s9yk3r/mine-sweeper.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To simply run the application in a dev environment
   ```sh
   npm run serve
   ```
4. Or, build the application (just remember to follow the instructions in the vue.config.js file for the pathing)
   ```sh
   npm build
   ```
<!-- USAGE -->
## Usage

This mine sweeper it's almost the same of the original one. There are a couple of missing features yet, like the possibility
to change difficulty and have a timer, but for the rest it's a fully functional game!<br><br>
You can put some flags or question marks with the right mouse button on tiles that you think has bombs under it.
You can also save a game and load it later. For now, you can have only a single game saved into the memory; the saved game's data
will be stored in the browser's memory; plus,
if you win or lose the saved game, you'll not be able to reload it again (you heard my right, you cheaters!). Joke aside,
the score point's system it's simple as it appears: one point for every tile you click without exploding, plus
the numerical value presented on the tile. Those numbers will represents how many bombs are there near the tile; so, it
seemed fair to me to gave more points the more risky it was to click a tile.<br><br>
Last, but not least, when you win the game, you'll gain 5 more points for every flag that you positioned on
the tiles, as a bonus to defusing bombs. What are you waiting for? Have fun!

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/s9yk3r/mine-sweeper/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Alessandro Lombi - spyker@live.it

Project Link: [https://github.com/s9yk3r/mine-sweeper](https://github.com/s9yk3r/mine-sweeper)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/s9yk3r/mine-sweeper.svg?style=for-the-badge
[contributors-url]: https://github.com/s9yk3r/mine-sweeper/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/s9yk3r/mine-sweeper.svg?style=for-the-badge
[forks-url]: https://github.com/s9yk3r/mine-sweeper/network/members
[stars-shield]: https://img.shields.io/github/stars/s9yk3r/mine-sweeper.svg?style=for-the-badge
[stars-url]: https://github.com/s9yk3r/mine-sweeper/stargazers
[issues-shield]: https://img.shields.io/github/issues/s9yk3r/mine-sweeper.svg?style=for-the-badge
[issues-url]: https://github.com/s9yk3r/mine-sweeper/issues
[license-shield]: https://img.shields.io/github/license/s9yk3r/mine-sweeper.svg?style=for-the-badge
[license-url]: https://github.com/s9yk3r/mine-sweeper/blob/master/LICENSE.txt
[product-screenshot]: https://i.imgur.com/Cvy9wE0.png