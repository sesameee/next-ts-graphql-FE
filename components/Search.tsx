import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Search as GetSearch } from "../__generated__/types";
import { searchPost } from "../queries/post";
import { RoleIcon } from "./RoleIcon";
import Role from "./Role";
import { AlertDialog } from "./Dialog";

const doTeam = (team: string) => {
  return team.split("|").filter(id => id != "");
};
export const Search: React.SFC = () => {
  const [attack, setAttack] = useState(new Set());
  const [skip, setSkip] = useState(true);
  const { loading, error, data } = useQuery<GetSearch>(searchPost, {
    variables: {
      fields: "attack",
      rolesId: Array.from(attack)
    },
    skip
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSkip(true);
  }, [attack]);

  //   const [doSearch,{ loading, error, data }] = useLazyQuery<GetSearch>(searchPost, {
  //     variables: {
  //       fields: "attack",
  //       rolesId: Array.from(attack)
  //     }
  //   });

  return (
    <div key="post" className="search">
      <section className="section">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
          <img className="attack" src="/img/attack_nb.png" />
          <img className="shield" src="/img/shield_nb.png" />
        </label>
        <AlertDialog open={open} handleClose={handleClose} />
        <div className="selectFrame">
          <div className="selectSection">
            <div className="selectIcon">
              <img className="attack" src="/img/attack_nb.png" />
            </div>
            <div className="selectIcon">
              <img className="attack" src="/img/attack_nb.png" />
            </div>
            <div className="selectIcon">
              <img className="attack" src="/img/attack_nb.png" />
            </div>
            <div className="selectIcon">
              <img className="attack" src="/img/attack_nb.png" />
            </div>
            <div className="selectIcon">
              <img className="attack" src="/img/attack_nb.png" />
            </div>
          </div>
          <div className="searchBtn">
            {/* <img className="search" src="/img/search.png" /> */}
            <img className="add" src="/img/add.png" />
          </div>
        </div>
      </section>
      <h3>Search</h3>
      <div>
        搜尋攻擊隊伍
        <span>
          {Array.from(attack).map(id => (
            <RoleIcon id={Number(id)} />
          ))}
          <button onClick={() => setSkip(false)}>開始搜尋</button>
          {/* <button onClick={() => doSearch()}>開始搜尋</button> */}
          <Role member={attack} setMember={setAttack} />
        </span>
      </div>

      <div>
        <h3>Search List</h3>
        {data && (
          <div>
            {data.search.map((item, index) => (
              <section className="post-section" key={index}>
                <div>
                  <div>攻擊</div>
                  {doTeam(item.attack).map(id => (
                    <RoleIcon id={Number(id)} />
                  ))}
                </div>

                <div>
                  <div>防禦</div>
                  {doTeam(item.defense).map(id => (
                    <RoleIcon id={Number(id)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
