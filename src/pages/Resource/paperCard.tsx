import { Paper } from "@/types";
import { Download } from "lucide-react";

const PaperCard = ({ paper }: { paper: Paper }) => {
  const fileName = paper.paper_file.split("/").pop();
  const downloadUrl = `http://localhost:8000/storage/papers/files/${fileName}`;

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow">
      <img
        src={paper.paper_image}
        alt={paper.name}
        className="object-cover w-full h-40 rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{paper.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">
        {paper.description.replace(/<[^>]+>/g, "")}
      </p>

      {paper.downloadable === 1 && (
        <a
          href={downloadUrl}
          download={fileName}
          className="flex items-center justify-center gap-2 px-4 py-2 mt-3 text-sm text-center text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Learn More <Download size={16} />
        </a>
      )}
    </div>
  );
};

export default PaperCard;
