import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { IProject } from '@/types/project/IProject';

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const progress = (project.currentFunding / project.fundingGoal) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {project.description}
        </p>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm font-medium">
          ${project.currentFunding.toLocaleString()} raised of $
          {project.fundingGoal.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Project</Button>
      </CardFooter>
    </Card>
  );
};
