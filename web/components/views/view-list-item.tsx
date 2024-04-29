import React, { useState } from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LinkIcon, PencilIcon, TrashIcon } from "lucide-react";
// types
import { IProjectView } from "@plane/types";
// ui
import { CustomMenu, TOAST_TYPE, setToast } from "@plane/ui";
// components
import { FavoriteStar } from "@/components/core";
import { CreateUpdateProjectViewModal, DeleteProjectViewModal } from "@/components/views";
// constants
import { E_VIEWS, VIEW_FAVORITED, VIEW_UNFAVORITED } from "@/constants/event-tracker";
import { EUserProjectRoles } from "@/constants/project";
// helpers
import { calculateTotalFilters } from "@/helpers/filter.helper";
import { copyUrlToClipboard } from "@/helpers/string.helper";
// hooks
import { useProjectView, useUser, useEventTracker } from "@/hooks/store";

type Props = {
  view: IProjectView;
};

export const ProjectViewListItem: React.FC<Props> = observer((props) => {
  const { view } = props;
  // states
  const [createUpdateViewModal, setCreateUpdateViewModal] = useState(false);
  const [deleteViewModal, setDeleteViewModal] = useState(false);
  // router
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;
  // store hooks
  const {
    membership: { currentProjectRole },
  } = useUser();
  const { addViewToFavorites, removeViewFromFavorites } = useProjectView();
  const { captureEvent } = useEventTracker();

  const handleAddToFavorites = () => {
    if (!workspaceSlug || !projectId) return;

    addViewToFavorites(workspaceSlug.toString(), projectId.toString(), view.id).then(() => {
      captureEvent(VIEW_FAVORITED, {
        view_id: view.id,
        element: E_VIEWS,
        state: "SUCCESS",
      });
    });
  };

  const handleRemoveFromFavorites = () => {
    if (!workspaceSlug || !projectId) return;

    removeViewFromFavorites(workspaceSlug.toString(), projectId.toString(), view.id).then(() => {
      captureEvent(VIEW_UNFAVORITED, {
        view_id: view.id,
        element: E_VIEWS,
        state: "SUCCESS",
      });
    });
  };

  const handleCopyText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    copyUrlToClipboard(`${workspaceSlug}/projects/${projectId}/views/${view.id}`).then(() => {
      setToast({
        type: TOAST_TYPE.SUCCESS,
        title: "Link Copied!",
        message: "View link copied to clipboard.",
      });
    });
  };

  // @ts-expect-error key types are not compatible
  const totalFilters = calculateTotalFilters(view.filters ?? {});

  const isEditingAllowed = !!currentProjectRole && currentProjectRole >= EUserProjectRoles.MEMBER;

  return (
    <>
      {workspaceSlug && projectId && view && (
        <CreateUpdateProjectViewModal
          isOpen={createUpdateViewModal}
          onClose={() => setCreateUpdateViewModal(false)}
          workspaceSlug={workspaceSlug.toString()}
          projectId={projectId.toString()}
          data={view}
        />
      )}
      <DeleteProjectViewModal data={view} isOpen={deleteViewModal} onClose={() => setDeleteViewModal(false)} />
      <div className="group border-b border-custom-border-200 hover:bg-custom-background-90">
        <Link href={`/${workspaceSlug}/projects/${projectId}/views/${view.id}`}>
          <div className="relative flex h-[52px] w-full items-center justify-between rounded p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex flex-col overflow-hidden ">
                  <p className="truncate break-all text-sm font-medium  leading-4">{view.name}</p>
                  {view?.description && <p className="break-all text-xs text-custom-text-200">{view.description}</p>}
                </div>
              </div>
              <div className="ml-2 flex flex-shrink-0">
                <div className="flex items-center gap-4">
                  <p className="hidden rounded bg-custom-background-80 px-2 py-1 text-xs text-custom-text-200 group-hover:block">
                    {totalFilters} {totalFilters === 1 ? "filter" : "filters"}
                  </p>
                  {isEditingAllowed && (
                    <FavoriteStar
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (view.is_favorite) handleRemoveFromFavorites();
                        else handleAddToFavorites();
                      }}
                      selected={view.is_favorite}
                    />
                  )}

                  <CustomMenu ellipsis>
                    {isEditingAllowed && (
                      <>
                        <CustomMenu.MenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCreateUpdateViewModal(true);
                          }}
                        >
                          <span className="flex items-center justify-start gap-2">
                            <PencilIcon size={14} strokeWidth={2} />
                            <span>Edit View</span>
                          </span>
                        </CustomMenu.MenuItem>
                        <CustomMenu.MenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeleteViewModal(true);
                          }}
                        >
                          <span className="flex items-center justify-start gap-2">
                            <TrashIcon size={14} strokeWidth={2} />
                            <span>Delete View</span>
                          </span>
                        </CustomMenu.MenuItem>
                      </>
                    )}
                    <CustomMenu.MenuItem onClick={handleCopyText}>
                      <span className="flex items-center justify-start gap-2">
                        <LinkIcon className="h-3 w-3" />
                        <span>Copy view link</span>
                      </span>
                    </CustomMenu.MenuItem>
                  </CustomMenu>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
});
