import { useState } from "react";
import { capitalizedString } from "../utils/stringUtil";

interface IProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

export const SkillBadgeList = ({ skills, setSkills }: IProps) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    const skill = newSkill.toLowerCase().trim();
    if (skill && !skills?.includes(skill)) {
      setSkills([...(skills ?? []), skill]);
      setNewSkill("");
    }
  };

  const updateSkills = (name: string) => {
    const newList = skills?.filter((eachSkill) => eachSkill !== name);
    setSkills(newList ?? []);
  };
  return (
    <div className="flex items-center">
      <div>
        {skills?.map((name) => (
          <button
            onClick={() => updateSkills(name)}
            className="btn btn-outline btn-accent btn-sm mr-2 mb-2"
            key={name}
          >
            {capitalizedString(name)}
            <span className="ml-1">&times;</span>
          </button>
        ))}
        {skills?.length < 10 && (
          <div className="flex mt-2">
            <input
              type="text"
              className="input input-bordered mr-2"
              placeholder="Add skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddSkill}
              disabled={
                !newSkill.trim() ||
                skills?.includes(newSkill.toLowerCase().trim())
              }
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
