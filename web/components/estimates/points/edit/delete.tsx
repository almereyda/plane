import { FC, useState } from "react";
import { observer } from "mobx-react";
import { MoveRight, Trash2, X } from "lucide-react";
import { TEstimatePointsObject } from "@plane/types";
import { Spinner } from "@plane/ui";
// components
import { EstimatePointDropdown } from "@/components/estimates/points";
// hooks
import { useEstimate, useEstimatePoint } from "@/hooks/store";

type TEstimatePointDelete = {
  workspaceSlug: string;
  projectId: string;
  estimateId: string;
  estimatePointId: string;
  callback: () => void;
};

export const EstimatePointDelete: FC<TEstimatePointDelete> = observer((props) => {
  const { workspaceSlug, projectId, estimateId, estimatePointId, callback } = props;
  // hooks
  const { estimatePointIds, estimatePointById, deleteEstimatePoint } = useEstimate(estimateId);
  const { asJson: estimatePoint } = useEstimatePoint(estimateId, estimatePointId);
  // states
  const [loader, setLoader] = useState(false);
  const [estimateInputValue, setEstimateInputValue] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setEstimateInputValue("");
    callback();
  };

  const handleDelete = async () => {
    if (!workspaceSlug || !projectId || !projectId) return;
    if (estimateInputValue)
      try {
        setLoader(true);
        setError(undefined);
        await deleteEstimatePoint(
          workspaceSlug,
          projectId,
          estimatePointId,
          estimateInputValue === "none" ? undefined : estimateInputValue
        );
        setLoader(false);
        setError(undefined);
        handleClose();
      } catch {
        setLoader(false);
        setError("something went wrong. please try again later");
      }
    else setError("please select option");
  };

  // derived values
  const selectDropdownOptionIds = estimatePointIds?.filter((pointId) => pointId != estimatePointId) as string[];
  const selectDropdownOptions = (selectDropdownOptionIds || [])
    ?.map((pointId) => {
      const estimatePoint = estimatePointById(pointId);
      if (estimatePoint && estimatePoint?.id)
        return { id: estimatePoint.id, key: estimatePoint.key, value: estimatePoint.value };
    })
    .filter((estimatePoint) => estimatePoint != undefined) as TEstimatePointsObject[];

  return (
    <div className="relative flex items-center gap-2 text-base">
      <div className="flex-grow relative flex items-center gap-3">
        <div className="w-full border border-custom-border-200 rounded p-2.5 bg-custom-background-90">
          {estimatePoint?.value}
        </div>
        <div className="text-sm first-letter:relative flex justify-center items-center gap-2 whitespace-nowrap">
          Mark as <MoveRight size={14} />
        </div>
        <EstimatePointDropdown
          options={selectDropdownOptions}
          error={error}
          callback={(estimateId: string) => {
            setEstimateInputValue(estimateId);
            setError(undefined);
          }}
        />
      </div>
      {loader ? (
        <div className="w-6 h-6 flex-shrink-0 relative flex justify-center items-center rota">
          <Spinner className="w-4 h-4" />
        </div>
      ) : (
        <div
          className="rounded-sm w-6 h-6 flex-shrink-0 relative flex justify-center items-center hover:bg-custom-background-80 transition-colors cursor-pointer text-red-500"
          onClick={handleDelete}
        >
          <Trash2 size={14} />
        </div>
      )}
      <div
        className="rounded-sm w-6 h-6 flex-shrink-0 relative flex justify-center items-center hover:bg-custom-background-80 transition-colors cursor-pointer"
        onClick={handleClose}
      >
        <X size={14} className="text-custom-text-200" />
      </div>
    </div>
  );
});