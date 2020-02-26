import React, { useState } from "react";
import { GetRoles } from "../__generated__/types";
import { GetRoles as QUERY } from "../queries/role";
import { Query } from "@apollo/react-components";
import "../style/main.scss";

const x = id => -((id % 8 != 0 ? (id % 8) - 1 : 7) * 76);
const y = id => -(Math.floor((id - 1) / 8) * 38);

interface RoleProps {
  member: any;
  setMember: Function;
}

export const Role: React.SFC<RoleProps> = ({ member, setMember }) => {
  const [filterType, addFilter] = useState(
    new Set(["front", "center", "rear"])
  );
  return (
    <Query<GetRoles> query={QUERY}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <h1>ERROR</h1>;
        if (!data) return <div>no data</div>;

        const list = data.roles.filter(data => filterType.has(data.position));
        const doAddFilter = type => {
          const newSet = new Set(filterType);
          if (newSet.has(type)) {
            newSet.delete(type);
            addFilter(newSet);
          } else {
            newSet.add(type);
            addFilter(newSet);
          }
        };

        const doSetMember = type => {
          const newSet = new Set(member);
          if (newSet.has(type)) {
            newSet.delete(type);
            setMember(newSet);
          } else {
            if (newSet.size < 5) {
              newSet.add(type);
              setMember(newSet);
            }
          }
        };

        return (
          <div>
            <section className="checkbox-section">
              <label className="container">
                前
                <input
                  type="checkbox"
                  defaultChecked={filterType.has("front")}
                  onClick={() => doAddFilter("front")}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                中
                <input
                  type="checkbox"
                  defaultChecked={filterType.has("center")}
                  onClick={() => doAddFilter("center")}
                />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                後
                <input
                  type="checkbox"
                  defaultChecked={filterType.has("rear")}
                  onClick={() => doAddFilter("rear")}
                />
                <span className="checkmark"></span>
              </label>
            </section>
            {data && (
              <div>
                {list.map(
                  (data, index) =>
                    data.name && (
                      <span key={index}>
                        <div
                          className={`character-holder ${
                            member.has(data.id) ? "active" : null
                          }`}
                          onClick={() => doSetMember(data.id)}
                        >
                          <div
                            className="character-img"
                            style={{
                              backgroundPosition: `${x(data.id)}px ${y(
                                data.id
                              )}px`
                            }}
                          ></div>
                        </div>
                      </span>
                    )
                )}
              </div>
            )}
          </div>
        );
      }}
    </Query>
  );
};

export default Role;
