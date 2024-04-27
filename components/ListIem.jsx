import React from "react";

function ListItems({ image, title, IconComponent, subtitle, onPress }) {
  return (
    <button onClick={onPress} className="flex items-center p-4 w-full">
      {IconComponent}
      {image && (
        <img src={image} alt="Profile" className="w-15 h-15 rounded-full" />
      )}
      <div className="ml-4 flex flex-col justify-center">
        <p className="text-lg font-medium">{title}</p>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>
    </button>
  );
}

export default ListItems;
