import SettingsSidebar from "@/components/dashboard/settings/settingsSidebar";
import { UpdateForm } from "@/components/forms/update-form";


const SettingsPage = () => {
  return (
    <div>
      <SettingsSidebar>
        <UpdateForm />
      </SettingsSidebar>
    </div>
  );
}
export default SettingsPage