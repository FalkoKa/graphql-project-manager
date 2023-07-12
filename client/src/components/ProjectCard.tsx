export interface Project {
  id: string;
  name: string;
  status: 'Not Completed' | 'Completed' | 'In Progress';
}

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <>
      <div className="flex gap-2 items-center justify-between border-2 border-slate-200 rounded-md px-8 py-4">
        <div>
          <h5>{project.name}</h5>
          <p className="text-sm">
            <strong>Status: </strong>
            {project.status}
          </p>
        </div>
        <a
          className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
          href={`/projects/${project.id}`}
        >
          View
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
