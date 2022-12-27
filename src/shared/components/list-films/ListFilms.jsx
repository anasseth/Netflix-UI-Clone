import "./ListFilms.css";
import { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const ListFilms = ({ title, itens }) => {
  const [scrollX, setScrollX] = useState(0);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = itens.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }

    setScrollX(x);
  };

  return (
    <section className="list">
      <h2>{title}</h2>
      <button className="move-left" onClick={handleLeftArrow}>
        <MdNavigateBefore style={{ fontSize: 50 }} />
      </button>
      <button className="move-right" onClick={handleRightArrow}>
        <MdNavigateNext style={{ fontSize: 50 }} />
      </button>
      <div className="list-area">
        <div
          className="list-itens"
          style={{
            marginLeft: scrollX,
            width: itens.results.length * 150,
          }}
        >
          {itens.results.length > 0 &&
            itens.results.map((item, index) => (
              <div className="list-item" key={item.original_title ?? index}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title ?? index}
                />
                <p
                  style={{
                    color: "white",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  Watch for only 
                  <b style={{ color: "red" }}> $30</b>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export { ListFilms };
