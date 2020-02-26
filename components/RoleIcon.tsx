
interface RoleIconProps {
    id: number;
  }
export const RoleIcon: React.SFC<RoleIconProps> = ({id}) => {
  const x = id => -((id % 8 != 0 ? (id % 8) - 1 : 7) * 76);
  const y = id => -(Math.floor((id - 1) / 8) * 38);
  return (
    <span>
      <div className={`character-holder`}>
        <div
          className="character-img"
          style={{
            backgroundPosition: `${x(id)}px ${y(id)}px`
          }}
        ></div>
      </div>
    </span>
  );
};
