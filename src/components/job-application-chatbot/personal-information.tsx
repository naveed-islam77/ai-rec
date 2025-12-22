import { Edit2, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const PersonalInformations = ({
  isEditMode,
  setIsEditMode,
  editedData,
  handleUpdateField,
  setEditedData,
  handleSubmitApplication,
  isSubmitting,
}: any) => {
  const skills = [
    ...editedData?.skills?.other_skills,
    ...editedData?.skills?.languages,
  ];

  console.log("skills", skills);
  return (
    <div className="bg-white p-4 rounded border space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Personal Information</h3>
          {!isEditMode && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditMode(true)}
            >
              <Edit2 className="w-3 h-3 mr-1" />
              Edit
            </Button>
          )}
        </div>
        {isEditMode ? (
          <div className="space-y-2">
            <Input
              value={editedData?.name}
              onChange={(e) => handleUpdateField("", "name", e.target.value)}
              placeholder="Full Name"
            />
            <Input
              value={editedData?.email}
              onChange={(e) => handleUpdateField("", "email", e.target.value)}
              placeholder="Email"
            />
            <Input
              value={editedData?.phone}
              onChange={(e) => handleUpdateField("", "phone", e.target.value)}
              placeholder="Phone"
            />
            <Input
              value={editedData?.address}
              onChange={(e) =>
                handleUpdateField("", "location", e.target.value)
              }
              placeholder="Location"
            />
          </div>
        ) : (
          <div className="text-sm space-y-1 text-gray-700">
            <p>
              <strong>Name:</strong> {editedData?.name}
            </p>
            <p>
              <strong>Email:</strong> {editedData?.email}
            </p>
            <p>
              <strong>Phone:</strong> {editedData?.phone}
            </p>
            <p>
              <strong>Location:</strong> {editedData?.address}
            </p>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-2">Summary</h3>
        {isEditMode ? (
          <Textarea
            value={editedData?.profile_summary}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                summary: e.target.value,
              })
            }
            rows={3}
          />
        ) : (
          <p className="text-sm text-gray-700">{editedData?.profile_summary}</p>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill: string, idx: number) => (
            <Badge key={idx}>{skill}</Badge>
          ))}
        </div>
      </div>

      {isEditMode && (
        <Button
          size="sm"
          onClick={() => {
            setIsEditMode(false);
            toast.success("Changes saved!");
          }}
          className="w-full"
        >
          <Save className="w-3 h-3 mr-1" />
          Save Changes
        </Button>
      )}

      {!isEditMode && (
        <Button
          onClick={handleSubmitApplication}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      )}
    </div>
  );
};

export default PersonalInformations;
