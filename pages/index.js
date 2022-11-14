import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  //console.log(config.playlists);
  const mensagem = "Bem vindo!";
  const estilosDaHomePage = {
    //
  };
  let [valorFiltro, setValorFiltro] = React.useState("");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* PropDrilling */}
        <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
        <Header />
        <Timeline searchValue={valorFiltro} playlists={config.playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  .banner {
    margin-top: 50nppx;
    width: 100vw;
    height: 300px;
    object-fit: cover;
  }

  .user-info img {
    margin-top: 10px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: -20px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  margin-top: 56px;
  width: auto;
  height: 230px;
  background-image: url(${config.cover});
  background-size: cover;
  background-position: center;
`;
function Header() {
  return (
    <StyledHeader>
      {/* <img src={config.cover} className="banner"></img> */}
      <StyledBanner />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`}></img>
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  //console.log("dentro do componente,", props)
  const playlistNames = Object.keys(props.playlists);

  //map o tempo todo
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        //console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb}></img>
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
