import React from "react";
import type { Content } from "@/types";
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
  return (
    <div className="flex flex-col overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
      <img
        src={content.content_image!}
        alt={content.name}
        className="object-cover w-full h-56"
      />

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center mb-2 space-x-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(content.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Admin
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {content.name}
        </h3>

        <p className="flex-1 mb-3 text-sm leading-7 text-gray-600 truncate">
          {truncateText(content.description || "", 10)}
        </p>

        <Link
          to={`/contents/${content.slug}`}
          className="mt-auto text-sm font-medium text-blue-600 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default ContentCard;
