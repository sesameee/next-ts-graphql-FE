import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { addPost } from "../__generated__/types";
import { addPost as QUERY } from "../queries/post";
import Role from "./Role";
import "../style/main.scss";

export const Post: React.SFC = () => {
  const [attack, setAttack] = useState(new Set());
  const [defense, setDefense] = useState(new Set());

  const [addPost, { error, data }] = useMutation<addPost>(QUERY, {
    variables: {
      attack: `|${Array.from(attack)
        .sort()
        .join("|")}|`,
      defense: `|${Array.from(defense)
        .sort()
        .join("|")}|`
    }
  });

  return (
    <div key="post">
      <h3>Add a Post</h3>
      {error ? <p>Oh no! {error.message}</p> : null}
      {data && data.addPost ? <p>Saved!{data.addPost.id}</p> : null}
      <button onClick={() => addPost()}>新增</button>

      <div>
        新增攻擊隊伍
        <span>
          {Array.from(attack).map((id,i) => (
            <RoleIcon id={Number(id)} key={i} />
          ))}
          <Role member={attack} setMember={setAttack} />
        </span>
      </div>
      <div>
        新增防禦隊伍
        <span>
          {Array.from(defense).map((id,i) => (
            <RoleIcon id={Number(id)} key={i} />
          ))}
          <Role member={defense} setMember={setDefense} />
        </span>
      </div>
      <div>
        <h3>Post List</h3>
        <PostList />
      </div>
    </div>
  );
};
import { GetPost } from "../__generated__/types";
import { getPost } from "../queries/post";
import { RoleIcon } from "./RoleIcon";

const PostList: React.SFC = () => {
  const doTeam = (team: string) => {
    return team.split("|").filter(id => id != "");
  };
  const { loading, error, data, refetch } = useQuery<GetPost>(getPost);

  if (loading) return <div>Loading</div>;
  if (error) return <h1>ERROR</h1>;
  if (!data) return <div>no data</div>;
  return (
    <div>
      <button onClick={() => refetch()}>Refetch!</button>
      {data && (
        <div>
          {data.getPost.map((item, index) => (
            <section className="post-section" key={index}>
              <div key={`a${index}`}>
                <div>攻擊</div>
                {doTeam(item.attack).map((id,i) => (
                  <RoleIcon id={Number(id)} key={`atk${i}`} />
                ))}
              </div>

              <div key={`d${index}`}>
                <div>防禦</div>
                {doTeam(item.defense).map((id,i) => (
                  <RoleIcon id={Number(id)} key={`dfs${i}`} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
