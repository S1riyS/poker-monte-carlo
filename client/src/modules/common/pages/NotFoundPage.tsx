import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return <>{t("common.notFound")}</>;
};

export default NotFoundPage;
