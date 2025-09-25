import React from "react";
import type { Content } from "./type/type";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

interface Props {
  content: Content;
}

const truncateText = (html: string, wordLimit: number) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent || temp.innerText || "";

  const words = text.split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "…";
  }
  return text;
};

const ContentCard: React.FC<Props> = ({ content }) => {
  const truncatedDescription = truncateText(content.description || "", 10);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
      <img
        src={content.content_image!}
        alt={content.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center text-gray-500 text-sm space-x-4 mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(content.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Admin
          </span>
        </div>

      
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {content.name}
        </h3>

      
        <p className="text-gray-600 text-sm leading-7 mb-3 flex-1">
          {truncatedDescription}
        </p>

        <Link
          to={`/content/${content.slug}`}
          className="text-blue-600 font-medium text-sm hover:underline mt-auto"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default ContentCard;
