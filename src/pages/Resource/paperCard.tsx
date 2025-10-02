import React from "react";
import { Paper } from "../Resource/type/paperType";
import { Download } from "lucide-react";

interface Props {
  paper: Paper;
}

const PaperCard: React.FC<Props> = ({ paper }) => {
  const fileName = paper.paper_file.split("/").pop();
  const downloadUrl = `http://localhost:8000/storage/papers/files/${fileName}`;

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <img
        src={paper.paper_image}
        alt={paper.name}
        className="h-40 w-full object-cover rounded-md"
      />
      <h3 className="mt-2 font-semibold text-lg">{paper.name}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">
        {paper.description.replace(/<[^>]+>/g, "")}
      </p>

      {paper.downloadable === 1 && (
        <a
          href={downloadUrl}
          download={fileName}
          className="mt-3 px-4 flex items-center gap-2 justify-center py-2 bg-blue-600 text-white text-center text-sm rounded hover:bg-blue-700"
        >
          Learn More <Download size={16} />
        </a>
      )}
    </div>
  );
};

export default PaperCard;
