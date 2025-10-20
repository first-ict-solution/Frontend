import workingIcon from "@/assets/start.png";
import Project from "@/assets/project.png";
import Process from "@/assets/process.png";
import Deliver from "@/assets/deliver.png";

export default function WorkingProcess() {
  const steps = [
    {
      id: 1,
      title: "Select A Project",
      description: "We have the technology and IT expertise to develop.",
      icon: workingIcon,
      type: "image",
    },
    {
      id: 2,
      title: "Project Analysis",
      description: "We have the technology and IT expertise to develop.",
      icon: Project,
      type: "image",
    },
    {
      id: 3,
      title: "Start Process",
      description: "We have the technology and IT expertise to develop.",
      icon: Process,
      type: "image",
    },
    {
      id: 4,
      title: "Deliver Result",
      description: "We have the technology and IT expertise to develop.",
      icon: Deliver,
      type: "image",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-20">
        Working Process For <span className="text-blue-600">Technology</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative flex flex-col items-center text-center"
          >
            {/* Circle with icon */}
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-2 border-blue-500 mb-6">
              {step.type === "image" ? (
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-20 h-20 object-contain"
                />
              ) : (
                <span className="text-4xl">{step.icon}</span>
              )}

              {/* Step number inside circle edge */}
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md">
                {step.id}
              </span>
            </div>

            {/* Title + Description */}
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm max-w-[200px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
