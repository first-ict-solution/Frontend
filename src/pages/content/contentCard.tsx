import React from "react";
import type { Content } from "./type/type";
import { Link } from "react-router-dom";

interface Props {
  content: Content;
}

const ContentCard: React.FC<Props> = ({ content }) => {
  return (
    <div className="bg-white  shadow-lg p-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100">
        <img
          src={content.image?.url || "https://via.placeholder.com/50"}
          alt={content.name}
          className="w-8 h-8"
        />
      </div>

      <h3 className="font-semibold text-lg mb-2">{content.name}</h3>
      <p className="text-sm mb-4">{content.description}</p>

      <Link
        to={`/content/${content.slug}`}
        className="text-blue-600 text-sm underline"
      >
        Learn more
      </Link>
    </div>
  );
};

export default ContentCard;
