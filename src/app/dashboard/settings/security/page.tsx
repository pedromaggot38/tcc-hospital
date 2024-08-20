import { SettingsSecurity } from "@/components/dashboard/settings/settingsSecurity";
import SettingsSidebar from "@/components/dashboard/settings/settingsSidebar";


export default function SettingsPage() {
  return (
    <SettingsSidebar>
        <SettingsSecurity />
    </SettingsSidebar>
  );
}
