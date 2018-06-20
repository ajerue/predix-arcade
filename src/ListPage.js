import React, { Component } from "react";
import "./ListPage.css";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";

const roms = {
  "Donkey_Kong.nes": "Donkey Kong",
  "Duck_Hunt.nes": "Duck Hunt",
  "The_Legend_of_Zelda.nes": "The Legend of Zelda",
  "Mega_Man.nes": "Mega Man",
  "Metroid.nes": "Metroid",
  "Pac-Man.nes": "Pac-Man",
  "Super_Mario_Bros.nes": "Super Mario Bros.",
  "Teenage_Mutant_Ninja_Turtles_II_-_The_Arcade_Game.nes": "Teenage Mutant Ninja Turtles II - The Arcade Game",
  "Tetris.nes": "Tetris"
};

class ListPage extends Component {
  render() {
    return (
      <div
        className="container ListPage my-4"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className="row justify-content-center">
          <div className="col-md-8">
            <header className="mb-4">
              <h1 className="mb-3">JSNES</h1>
              <p>A JavaScript NES emulator.</p>
              <p>
                By <a href="https://twitter.com/bfirsh">Ben Firshman</a>. Source
                on <a href="https://github.com/bfirsh/jsnes">GitHub</a>.
              </p>
            </header>
            <ListGroup className="mb-4">
              {Object.keys(roms).map(key => (
                <Link
                  key={key}
                  to={"/run/" + encodeURIComponent(key)}
                  className="list-group-item"
                >
                  {roms[key]}
                  <span className="float-right">&rsaquo;</span>
                </Link>
              ))}
            </ListGroup>
            <p>Or, drag and drop a ROM file onto the page.</p>
          </div>
        </div>
      </div>
    );
  }

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  handleDrop = e => {
    e.preventDefault();

    const file = e.dataTransfer.items
      ? e.dataTransfer.items[0].getAsFile()
      : e.dataTransfer.files[0];

    this.props.history.push({ pathname: "/run", state: { file } });
  };
}

export default ListPage;
