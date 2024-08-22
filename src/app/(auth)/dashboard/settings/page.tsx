import { SettingsGeneral } from "@/components/dashboard/settings/settingsGeneral";
import SettingsSidebar from "@/components/dashboard/settings/settingsSidebar";


const SettingsPage = () => {
  return (
    <div>
      <SettingsSidebar>
        <SettingsGeneral />
    </SettingsSidebar>
    </div>
  );
}
export default SettingsPage