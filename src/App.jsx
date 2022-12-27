import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { Header } from "./shared/components/header/Header";
import { FeaturedMovie } from "./shared/components/featured-movie/FeaturedMovie";
import { ListFilms } from "./shared/components/list-films/ListFilms";
import API from "./shared/services/api/api";
import { Rodape } from "./shared/components/rodape/Rodape";
import { Loading } from "./shared/components/loading/Loading";

const App = () => {
  const [listMusic, setListMusic] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  const loadAllFilms = async () => {
    const list = await API.getHomeList();
    setListMusic(list);

    const originals = list.filter((item) => item.slug === "originals");
    const randomFilm = Math.floor(
      Math.random() * --originals[0].itens.results.length
    );
    const chosen = originals[0].itens.results[randomFilm];
    const chosenInfo = await API.getMoveInfo(chosen.id, "tv");
    setFeaturedData(chosenInfo);
  };

  const scrollListener = () => {
    if (window.scrollY > 10) {
      setBlackHeader(true);
    } else {
      setBlackHeader(false);
    }
  };

  useEffect(() => {
    loadAllFilms();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="listas">
        {listMusic.map((item) => (
          <Fragment key={item.title}>
            <ListFilms title={item.title} itens={item.itens} />
          </Fragment>
        ))}
      </section>
      <Rodape />
      {listMusic.length <= 0 && <Loading />}
    </div>
  );
};

export { App };
