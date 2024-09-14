import SettingsSidebar from "@/components/dashboard/settings/settingsSidebar";
import { PasswordUpdateForm } from "@/components/forms/pass-update-form";


const SettingsSecurityPage = () => {
  return (
    <SettingsSidebar>
        <PasswordUpdateForm />
    </SettingsSidebar>
  );
}
export default SettingsSecurityPage