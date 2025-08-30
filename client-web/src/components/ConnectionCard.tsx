import type { IConnectionFrom } from "../models/connectionModel";

export const ConnectionCard = ({
  connectionFrom,
}: {
  connectionFrom: IConnectionFrom;
}) => {
  const { firstName, lastName, about, photoUrl, skills } = connectionFrom;
  return <div>{firstName}</div>;
};
