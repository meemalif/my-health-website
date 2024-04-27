import React from "react";
import ListItems from "./ListIem";

function Card({
  Title,
  Subtitle,
  imageUrl,
  onPress,
  date,
  profile,
  profileTitle,
  profileSub,
  style,
  listPress,
  category,
}) {
  return (
    <div className={style + " rounded-xl bg-white overflow-hidden mb-5 shadow-lg relative"}>
      <button onClick={onPress} className="w-full flex flex-wrap">
        {profile && profileTitle && (
          <ListItems
            image={profile}
            title={profileTitle}
            subtitle={profileSub}
            onPress={listPress}
          />
        )}
        <div>
          <img src={imageUrl} alt="Event" className="w-full h-52 object-cover" />

          <div className="absolute top-1 left-1 bg-white p-1.5 rounded opacity-95 flex items-center justify-center">
            <p className="text-gray-500">{date?.split(" ")[0]}</p>
            <p className="text-secondary font-bold text-2xl">{date?.split(" ")[2]}</p>
            <p className="text-primary font-bold">{date?.split(" ")[1]}</p>
          </div>
        </div>
        <div className="p-2.5">
          <p className="text-2xl">{Title}</p>
          <p className="text-gray-500 mt-2.5">{Subtitle.substring(0, 90)}...</p>
        </div>
        <p className="text-royalPink mb-2.5 ml-5 mr-2.5">{category}</p>
      </button>
    </div>
  );
}

export default Card;
