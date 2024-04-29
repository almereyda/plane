"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { observer } from "mobx-react-lite";
import useSWR from "swr";
import { Loader, ToggleSwitch, setPromiseToast } from "@plane/ui";
// components
import { AuthenticationMethodCard, InstanceGithubConfigForm } from "components/authentication";
import { PageHeader } from "@/components/core";
// hooks
import { useInstance } from "@/hooks";
// helpers
import { resolveGeneralTheme } from "@/helpers/common.helper";
// icons
import githubLightModeImage from "@/public/logos/github-black.png";
import githubDarkModeImage from "@/public/logos/github-white.png";

const InstanceGithubAuthenticationPage = observer(() => {
  // store
  const { fetchInstanceConfigurations, formattedConfig, updateInstanceConfigurations } = useInstance();
  // state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // theme
  const { resolvedTheme } = useTheme();
  // config
  const enableGithubConfig = formattedConfig?.IS_GITHUB_ENABLED ?? "";

  useSWR("INSTANCE_CONFIGURATIONS", () => fetchInstanceConfigurations());

  const updateConfig = async (key: "IS_GITHUB_ENABLED", value: string) => {
    setIsSubmitting(true);

    const payload = {
      [key]: value,
    };

    const updateConfigPromise = updateInstanceConfigurations(payload);

    setPromiseToast(updateConfigPromise, {
      loading: "Saving Configuration...",
      success: {
        title: "Configuration saved",
        message: () => `Github authentication is now ${value ? "active" : "disabled"}.`,
      },
      error: {
        title: "Error",
        message: () => "Failed to save configuration",
      },
    });

    await updateConfigPromise
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
      });
  };
  return (
    <>
      <PageHeader title="Authentication - God Mode" />
      <div className="relative container mx-auto w-full h-full p-8 py-4 space-y-6 flex flex-col">
        <div className="border-b border-custom-border-100 pb-3 space-y-1 flex-shrink-0">
          <AuthenticationMethodCard
            name="Github"
            description="Allow members to login or sign up to plane with their Github accounts."
            icon={
              <Image
                src={resolveGeneralTheme(resolvedTheme) === "dark" ? githubDarkModeImage : githubLightModeImage}
                height={24}
                width={24}
                alt="GitHub Logo"
              />
            }
            config={
              <ToggleSwitch
                value={Boolean(parseInt(enableGithubConfig))}
                onChange={() => {
                  Boolean(parseInt(enableGithubConfig)) === true
                    ? updateConfig("IS_GITHUB_ENABLED", "0")
                    : updateConfig("IS_GITHUB_ENABLED", "1");
                }}
                size="sm"
                disabled={isSubmitting || !formattedConfig}
              />
            }
            disabled={isSubmitting || !formattedConfig}
            withBorder={false}
          />
        </div>
        <div className="flex-grow overflow-hidden overflow-y-auto">
          {formattedConfig ? (
            <InstanceGithubConfigForm config={formattedConfig} />
          ) : (
            <Loader className="space-y-8">
              <Loader.Item height="50px" width="25%" />
              <Loader.Item height="50px" />
              <Loader.Item height="50px" />
              <Loader.Item height="50px" />
              <Loader.Item height="50px" width="50%" />
            </Loader>
          )}
        </div>
      </div>
    </>
  );
});

export default InstanceGithubAuthenticationPage;