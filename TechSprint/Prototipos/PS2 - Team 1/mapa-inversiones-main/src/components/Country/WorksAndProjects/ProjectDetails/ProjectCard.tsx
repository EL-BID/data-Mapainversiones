import { FC } from "react";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";
import NextLink from "next/link";

interface ProjectCardProps {
  image: string;
  cost: number;
  title: string;
  id: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ image, cost, title, id }) => {
  return (
    <Card sx={{ maxWidth: "33%" }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6" color="primary">
          ${cost.toLocaleString()}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Link href={`/country/works-and-projects/${id}`} component={NextLink}>
          <Typography fontSize={14} fontWeight={500}>
            Ver Más
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
